import { useState, useEffect } from 'react';

export interface WorkflowStatus {
  runId: string;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed';
  latestOutput: string;
  isAwaitingApproval: boolean;
  approvalPrompt?: string;
}

export function useWorkflow(runId: string) {
  const [workflow, setWorkflow] = useState<WorkflowStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!runId) return;

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/stream/${runId}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      setWorkflow((prev) => ({
        ...prev,
        runId,
        status: data.status || 'running',
        latestOutput: data.message || prev?.latestOutput || '',
        isAwaitingApproval: data.type === 'conversation_lock' && data.locked === true,
        approvalPrompt: data.type === 'approval_requested' ? data.prompt : prev?.approvalPrompt,
      }));
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [runId]);

  const approve = async (comment: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workflows/${runId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });
      return await res.json();
    } finally {
      setLoading(false);
    }
  };

  const reject = async (reason: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workflows/${runId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      return await res.json();
    } finally {
      setLoading(false);
    }
  };

  return { workflow, approve, reject, loading };
}
