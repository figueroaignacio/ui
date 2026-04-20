import { stepCountIs, ToolLoopAgent } from 'ai';
import { MATEUI_SYSTEM_PROMPT } from './prompts/system-prompt.js';
import { google, GOOGLE_MODELS } from './providers.js';
import { getComponentCodeTool } from './tools/get-component-code-tool.js';
import { getDocsTool } from './tools/get-docs-tool.js';

export const mateUIAgent = new ToolLoopAgent({
  model: google(GOOGLE_MODELS.gemini25Flash),
  instructions: MATEUI_SYSTEM_PROMPT,
  tools: {
    getDocs: getDocsTool,
    getComponentCode: getComponentCodeTool,
  },
  stopWhen: stepCountIs(10),
});
