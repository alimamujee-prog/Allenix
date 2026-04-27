import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), '../magnolia.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS workflow_runs (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    workflow_name TEXT NOT NULL,
    status TEXT NOT NULL,
    input_json TEXT,
    output_json TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    completed_at TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );

  CREATE TABLE IF NOT EXISTS cost_events (
    id TEXT PRIMARY KEY,
    workflow_run_id TEXT,
    tokens_used INTEGER NOT NULL,
    cost_usd REAL NOT NULL,
    model TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_run_id) REFERENCES workflow_runs(id)
  );

  CREATE TABLE IF NOT EXISTS approvals (
    id TEXT PRIMARY KEY,
    workflow_run_id TEXT NOT NULL,
    status TEXT NOT NULL,
    comment TEXT,
    reason TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_run_id) REFERENCES workflow_runs(id)
  );

  CREATE TABLE IF NOT EXISTS recovered_revenue (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    amount REAL NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );
`);

export default db;
