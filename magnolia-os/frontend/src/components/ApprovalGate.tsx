import React from 'react';
import { useWorkflow } from '../lib/use-workflow';

interface ApprovalGateProps {
  runId: string;
  onComplete: () => void;
}

export const ApprovalGate: React.FC<ApprovalGateProps> = ({ runId, onComplete }) => {
  const { workflow, approve, reject, loading } = useWorkflow(runId);

  if (!workflow || !workflow.isAwaitingApproval) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200">
        <header className="bg-stone-900 text-white p-6">
          <h2 className="text-xl font-serif italic">Magnolia Intelligence Review</h2>
          <p className="text-stone-400 text-xs font-mono uppercase mt-1 tracking-widest">Human-in-the-Loop Verification</p>
        </header>

        <div className="p-8">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-tighter mb-4">AI Investigation Findings</h3>
          <div className="prose prose-stone prose-sm max-h-96 overflow-y-auto mb-8 pr-4">
            {workflow.latestOutput || "Analyzing data and preparing recommendations..."}
          </div>

          <div className="flex gap-4">
            <button
              disabled={loading}
              onClick={() => approve("Looks excellent. Proceed with outreach.")}
              className="flex-1 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "✓ Approve & Execute"}
            </button>
            <button
              disabled={loading}
              onClick={() => reject("I'd like to refine the messaging before sending.")}
              className="px-8 py-4 bg-white border border-stone-200 text-stone-600 font-medium rounded-lg hover:bg-stone-50 transition-all active:scale-95 disabled:opacity-50"
            >
              Request Changes
            </button>
          </div>
        </div>

        <footer className="bg-stone-50 p-4 text-center border-t border-stone-100">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest">
            Magnolia OS Agentic Engine · {runId}
          </p>
        </footer>
      </div>
    </div>
  );
};