'use client';

import React, { useState } from 'react';
import { ApprovalGate } from '../../components/ApprovalGate';

export default function MagnoliaDashboard() {
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const launchWorkflow = async (type: 'audit' | 'reactivate') => {
    setIsRunning(true);
    const endpoint = type === 'audit' ? 'audit' : 'reactivate';
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/demo/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: "Bellezza Med Spa",
          patientData: [
            { id: 101, name: "Sarah J.", lastTreatment: "Neurotoxin", lastVisit: "2025-08-12" },
            { id: 102, name: "Mike D.", lastTreatment: "Dermal Filler", lastVisit: "2025-09-05" }
          ]
        })
      });
      const data = await res.json();
      setActiveRunId(data.runId);
    } catch (err) {
      console.error(`Failed to start ${type}`, err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-8 bg-stone-50 min-h-screen text-stone-900 font-sans">
      <header className="mb-16 flex justify-between items-end border-b border-stone-200 pb-12">
        <div>
          <p className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Allenix Agentic OS</p>
          <h1 className="text-6xl font-serif font-black tracking-tighter italic">Magnolia</h1>
          <p className="text-stone-400 mt-2 font-display text-lg tracking-tight">Orchestrating Acquire, Activate, & Ascend.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => launchWorkflow('audit')}
            disabled={isRunning}
            className="bg-stone-900 text-white px-10 py-5 rounded-full font-bold hover:bg-stone-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isRunning ? "AI Investigating..." : "⚡ Run ROI Audit"}
          </button>
          <button 
            onClick={() => launchWorkflow('reactivate')}
            disabled={isRunning}
            className="bg-accent text-white px-10 py-5 rounded-full font-bold hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isRunning ? "Syncing Database..." : "🚀 Reactivate Patients"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Total Recovered Card */}
        <article className="p-10 bg-white border border-stone-200 rounded-[2rem] shadow-sm transform hover:scale-[1.02] transition-transform">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-8">Total Recovered Revenue</h2>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-serif italic font-bold text-accent">$12,480.00</p>
            <span className="text-xs text-stone-400 font-mono">+12% vs LY</span>
          </div>
          <div className="h-1.5 w-full bg-stone-100 mt-8 overflow-hidden rounded-full">
            <div className="h-full bg-accent w-[68%]"></div>
          </div>
        </article>

        {/* Open Leaks Card */}
        <article className="p-10 bg-white border border-stone-200 rounded-[2rem] shadow-sm">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-8">Identified Money Leaks</h2>
          <p className="text-5xl font-serif italic font-bold text-rose-500">$42,100</p>
          <p className="text-xs text-stone-500 mt-4 leading-relaxed italic">High-priority rebooking opportunities & no-show recovery potential.</p>
        </article>

        {/* Agent Verification Card */}
        <article className="p-10 bg-white border border-stone-200 rounded-[2rem] shadow-sm bg-stone-900 border-none text-white">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 mb-8">Agentic Quality Assurance</h2>
          <p className="text-5xl font-serif italic font-bold text-accent">99.2%</p>
          <p className="text-xs text-stone-400 mt-4">Verified across 142 AI runs for citations, brand voice, and factual truth.</p>
        </article>
      </div>

      {/* Interaction Layer */}
      {activeRunId && (
        <ApprovalGate 
          runId={activeRunId} 
          onComplete={() => setActiveRunId(null)} 
        />
      )}

      <section className="mt-24">
        <div className="flex justify-between items-center mb-10 pb-4">
          <h3 className="text-2xl font-serif italic">Magnolia Execution Loops</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest">Systems Online</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="p-8 bg-white border border-stone-100 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-6">
               <div className="w-3 h-3 rounded-full bg-accent"></div>
               <div>
                 <p className="font-bold text-lg tracking-tight">No-Show Prevention Engine</p>
                 <p className="text-sm text-stone-400">Actively monitoring Zenoti scheduling for same-day cancellations...</p>
               </div>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-mono text-stone-300 block mb-1 uppercase tracking-tighter">Last Action</span>
               <p className="text-xs font-medium text-stone-500">Recovered $450.00 (2h ago)</p>
            </div>
          </div>
          
          <div className="p-8 bg-stone-50 border border-stone-100 rounded-2xl flex justify-between items-center opacity-70">
            <div className="flex items-center gap-6">
               <div className="w-3 h-3 rounded-full bg-stone-300"></div>
               <div>
                 <p className="font-bold text-lg tracking-tight px-9">Dormant Patient Loop</p>
                 <p className="text-sm text-stone-400 px-9">Waiting for 90-day retention review.</p>
               </div>
            </div>
            <span className="text-[10px] font-mono text-stone-400 italic">Cycle Complete</span>
          </div>
        </div>
      </section>
    </div>
  );
}
