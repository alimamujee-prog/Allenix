'use client';

import { useState } from 'react';

const TENANTS = [
  { id: 'labs', name: 'Labs', description: 'Agentic growth services' },
  { id: 'media', name: 'Media', description: 'Brand and audience engine' },
  { id: 'capital', name: 'Capital', description: 'Acquisition arm' },
];

const WORKFLOWS = [
  { id: 'allenix-content-engine', name: 'Allenix Content Engine', description: 'Convert prospect calls into social content' },
  { id: 'allenix-strategy-sync', name: 'Allenix Strategy Sync', description: 'Synthesize internal company strategy' },
  { id: 'allenix-audience-engine', name: 'Allenix Audience Engine', description: 'Identify market vulnerabilities' },
  { id: 'allenix-deal-closer', name: 'Deal Closer', description: 'Draft discovery proposals from call notes' },
  { id: 'revenue-recovery-audit', name: 'Revenue Recovery Audit', description: 'Analyze patient data for revenue leaks' },
  { id: 'patient-reactivation', name: 'Patient Reactivation', description: 'Identify dormant patients and draft outreach' },
  { id: 'simple-roi-check', name: 'Simple ROI Check', description: 'Calculate ROI with validation' },
];

const ARCHON_UI_URL = process.env.NEXT_PUBLIC_ARCHON_UI_URL || 'http://localhost:3090';

export default function Home() {
  const [selectedTenant, setSelectedTenant] = useState(TENANTS[0]);

  return (
    <div className="min-h-screen bg-[var(--col-bg)] text-[var(--col-text-2)]">
      {/* Header */}
      <header className="border-b border-[var(--col-border)]">
        <div className="max-w-[1100px] mx-auto px-[5%] py-6 flex justify-between items-center">
          <div>
            <p className="text-[var(--col-accent)] font-mono text-[11px] uppercase tracking-[0.2em] mb-2">
              Allenix Internal
            </p>
            <h1 className="font-display text-3xl font-black tracking-tight text-[var(--col-text-1)]">
              Magnolia OS
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--col-accent)] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--col-text-3)]">
              Systems Online
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1100px] mx-auto px-[5%] py-16">
        {/* Hero Section */}
        <section className="mb-16">
          <p className="text-[var(--col-accent)] font-mono text-[13px] uppercase tracking-[0.15em] mb-4">
            Agentic Workflow Platform
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[var(--col-text-1)] mb-6 max-w-2xl leading-[1.1]">
            Orchestrating Acquire, Activate, & Ascend
          </h2>
          <p className="text-lg text-[var(--col-text-2)] max-w-xl leading-relaxed">
            Internal workflow execution engine for Allenix operations. Context Guard
            injects brand intelligence into every AI-powered workflow.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tenant Selector */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--col-surface)] border border-[var(--col-border)] rounded-lg p-6">
              <h3 className="font-display text-xl font-bold text-[var(--col-text-1)] mb-2">
                Select Tenant
              </h3>
              <p className="text-sm text-[var(--col-text-3)] mb-6">
                Choose the Allenix unit for this workflow session
              </p>

              <div className="space-y-2">
                {TENANTS.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => setSelectedTenant(tenant)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                      selectedTenant.id === tenant.id
                        ? 'bg-[var(--col-accent-bg)] border border-[var(--col-accent-dim)] text-[var(--col-accent)]'
                        : 'bg-[var(--col-surface-2)] border border-[var(--col-border)] hover:border-[var(--col-border-2)]'
                    }`}
                  >
                    <div className="font-mono text-sm font-medium">{tenant.name}</div>
                    <div className="text-xs mt-1 opacity-70">{tenant.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workflows List */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--col-surface)] border border-[var(--col-border)] rounded-lg p-6">
              <h3 className="font-display text-xl font-bold text-[var(--col-text-1)] mb-2">
                Available Workflows
              </h3>
              <p className="text-sm text-[var(--col-text-3)] mb-6">
                AI-powered workflows with Context Guard brand intelligence
              </p>

              <div className="space-y-3">
                {WORKFLOWS.map((workflow, index) => (
                  <div
                    key={workflow.id}
                    className="flex items-start gap-4 p-4 rounded-md bg-[var(--col-surface-2)] border border-[var(--col-border)]"
                  >
                    <span className="font-mono text-xs text-[var(--col-text-3)] mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-[var(--col-text-1)]">{workflow.name}</div>
                      <div className="text-sm text-[var(--col-text-3)] mt-1">{workflow.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Launch Button */}
        <section className="mt-12 text-center">
          <a
            href={ARCHON_UI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shiny"
          >
            Launch Workflow Console → Archon
          </a>
          <p className="text-xs text-[var(--col-text-3)] mt-4 font-mono">
            Opens Archon UI in a new tab • Selected: {selectedTenant.name}
          </p>
        </section>

        {/* Architecture Note */}
        <section className="mt-20 pt-12 border-t border-[var(--col-border)]">
          <div className="flex items-start gap-4">
            <div className="section-divider shrink-0"></div>
            <div>
              <h4 className="font-display text-lg font-bold text-[var(--col-text-1)] mb-2">
                Context Guard Architecture
              </h4>
              <p className="text-sm text-[var(--col-text-2)] max-w-2xl leading-relaxed">
                Intelligence lives in <code className="text-[var(--col-accent)]">/brand_context</code> as .md files.
                The backend loads the &quot;Soul&quot; for each tenant and injects it as variables into Archon workflows.
                This prevents prompt leaking and ensures brand-consistent AI output.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--col-border)] mt-20">
        <div className="max-w-[1100px] mx-auto px-[5%] py-8">
          <p className="text-xs font-mono text-[var(--col-text-3)]">
            Magnolia OS • Internal Allenix Use Only • Houston, TX
          </p>
        </div>
      </footer>
    </div>
  );
}
