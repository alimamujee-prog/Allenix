import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { archon } from './lib/archon/wrapper';

const app = new Hono();

app.use('/*', cors());

app.get('/', (c) => c.text('Magnolia OS API - Online'));

/**
 * Trigger a Revenue Recovery Audit
 */
app.post('/api/projects/:id/audit', async (c) => {
  const projectId = c.req.param('id');
  const body = await c.req.json();

  // In a real app, we'd fetch the company/project from the DB here
  // For the MVP/Canary, we use the provided data
  const companyName = body.companyName || 'Target Med Spa';

  const result = await archon.executeWorkflow({
    workflow: 'revenue-recovery-audit',
    input: {
      company_name: companyName,
      patient_data_json: JSON.stringify(body.patientData || [])
    },
    projectId,
    tenantId: 'allenix'
  });

  return c.json({
    success: true,
    runId: result.runId,
    status: result.status
  });
});

/**
 * Trigger a Patient Reactivation Campaign
 */
app.post('/api/projects/:id/reactivate', async (c) => {
  const projectId = c.req.param('id');
  const body = await c.req.json();

  const result = await archon.executeWorkflow({
    workflow: 'patient-reactivation',
    input: {
      company_name: body.companyName || 'Target Med Spa',
      patient_data_json: JSON.stringify(body.patientData || [])
    },
    projectId,
    tenantId: 'allenix'
  });

  return c.json({
    success: true,
    runId: result.runId,
    status: result.status
  });
});
/**
 * Approval Gate Endpoint
 */
app.post('/api/workflows/:runId/approve', async (c) => {
  const runId = c.req.param('runId');
  const { comment } = await c.req.json();

  const result = await archon.approveWorkflow(runId, comment);
  return c.json(result);
});

/**
 * Reject/Request Changes Endpoint
 */
app.post('/api/workflows/:runId/reject', async (c) => {
  const runId = c.req.param('runId');
  const { reason } = await c.req.json();

  const result = await archon.rejectWorkflow(runId, reason);
  return c.json(result);
});

/**
 * SSE Streaming for Workflow Progress
 */
app.get('/api/stream/:runId', async (c) => {
  const runId = c.req.param('runId');

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // Poll Archon for workflow status
      const pollInterval = setInterval(async () => {
        try {
          // In production, this would call Archon's streaming API
          // For now, send heartbeat
          const data = {
            type: 'heartbeat',
            status: 'running',
            message: `Workflow ${runId} is processing...`,
            timestamp: new Date().toISOString()
          };

          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
          clearInterval(pollInterval);
          controller.close();
        }
      }, 2000);

      // Cleanup on client disconnect
      c.req.raw.signal?.addEventListener('abort', () => {
        clearInterval(pollInterval);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
});

export default app;