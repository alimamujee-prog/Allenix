import { contextGuard } from '../context-guard';

/**
 * Magnolia Archon Wrapper (Context Guard Edition)
 * 
 * This bridge loads intelligence files and injects them as variables
 * so the Agent stays aligned with the required mission (Internal or Client).
 */

interface WorkflowParams {
  workflow: string;
  input: Record<string, any>;
  projectId: string;
  tenantId?: string; // Allenix unit (labs, media, capital) or future client id
}

export const archon = {
  /**
   * Triggers a workflow execution with Context Guard injection
   */
  async executeWorkflow(params: WorkflowParams) {
    const archonUrl = process.env.ARCHON_URL || 'http://localhost:3090';
    const tenantId = params.tenantId || 'allenix';

    // 1. Load the 'Soul' for this tenant using Context Guard
    const intelligence = await contextGuard.loadContext(tenantId);

    // 2. Merge user input with intelligence variables
    const enrichedInput = {
      ...params.input,
      ...intelligence
    };

    console.log(`[Magnolia] Launching ${params.workflow} with ${tenantId} intelligence.`);

    // 3. Call Archon API
    const response = await fetch(`${archonUrl}/api/workflows/${params.workflow}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: `mag-${tenantId}-${Date.now()}`,
        message: `Run ${params.workflow} with enriched context.`,
        // Pass variables that Archon's nodes can use as {{context_voice}}, etc.
        variables: enrichedInput
      }),
    });

    const data = await response.json() as { runId?: string; error?: string };

    if (!response.ok) {
      throw new Error(`Archon execution failed: ${data.error || 'Unknown error'}`);
    }

    return {
      runId: data.runId || `run-${Date.now()}`,
      status: 'running'
    };
  },

  async approveWorkflow(runId: string, comment: string) {
    const archonUrl = process.env.ARCHON_URL || 'http://localhost:3090';
    const response = await fetch(`${archonUrl}/api/workflows/runs/${runId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    return await response.json();
  },

  async rejectWorkflow(runId: string, reason: string) {
    const archonUrl = process.env.ARCHON_URL || 'http://localhost:3090';
    const response = await fetch(`${archonUrl}/api/workflows/runs/${runId}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    return await response.json();
  }
};