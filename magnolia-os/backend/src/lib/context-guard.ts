import fs from 'fs/promises';
import path from 'path';

/**
 * Context Guard Service
 * Responsible for securely loading intelligence files from /brand_context
 * and preparing them for the agentic engine.
 */

const CONTEXT_ROOT = '/a0/usr/projects/_Allenix/magnolia-os/brand_context';

export const contextGuard = {
  /**
   * Loads context for a specific internal unit or client
   * e.g. loading 'allenix-media' or 'allenix-labs'
   */
  async loadContext(contextId: string): Promise<Record<string, string>> {
    const contextDir = path.join(CONTEXT_ROOT, contextId);
    const contextMap: Record<string, string> = {};

    try {
      const files = await fs.readdir(contextDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join(contextDir, file), 'utf-8');
          const key = path.basename(file, '.md').replace(/-/g, '_');
          contextMap[`context_${key}`] = content;
        }
      }
    } catch (err) {
      console.warn(`[ContextGuard] No specific context found for ${contextId}, falling back to defaults.`);
      // Load base defaults if practice-specific fails
      contextMap['context_voice'] = await fs.readFile(path.join(CONTEXT_ROOT, 'med-spa-voice.md'), 'utf-8');
    }

    return contextMap;
  }
};