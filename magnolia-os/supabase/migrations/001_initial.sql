-- Magnolia OS Initial Schema

-- Companies (Clients)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand_voice_path TEXT, -- Path to client-specific brand voice .md
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    company_id UUID REFERENCES companies(id),
    role TEXT NOT NULL, -- 'owner', 'operator', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects / Engagements
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    name TEXT NOT NULL,
    status TEXT NOT NULL, -- 'active', 'completed', 'audit'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow Runs (linked to Archon/Agent Zero sessions)
CREATE TABLE workflow_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    external_run_id TEXT, -- Archon run_id
    workflow_name TEXT NOT NULL,
    status TEXT NOT NULL,
    results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Cost Tracking (Critical Addition)
CREATE TABLE cost_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    project_id UUID REFERENCES projects(id),
    workflow_name TEXT,
    model TEXT NOT NULL,
    tokens_prompt INTEGER,
    tokens_completion INTEGER,
    cost_usd DECIMAL(12, 6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recovered Revenue Tracking
CREATE TABLE recovered_revenue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    project_id UUID REFERENCES projects(id),
    amount DECIMAL(12, 2) NOT NULL,
    source TEXT, -- 'no-show-recovery', 'rebooking', etc.
    verified_by_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

-- Approvals (from official MAGNOLIA-OS-PLAN)
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_run_id UUID REFERENCES workflow_runs(id),
    node_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
