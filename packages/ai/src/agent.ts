import { stepCountIs, ToolLoopAgent } from 'ai';
import { NACHUI_SYSTEM_PROMPT } from './prompts/system-prompt';
import { google, GOOGLE_MODELS } from './providers';
import { getComponentCodeTool } from './tools/get-component-code-tool';
import { getDocsTool } from './tools/get-docs-tool';

export const nachUIAgent = new ToolLoopAgent({
  model: google(GOOGLE_MODELS.gemini25Flash),
  instructions: NACHUI_SYSTEM_PROMPT,
  tools: {
    getDocs: getDocsTool,
    getComponentCode: getComponentCodeTool,
  },
  stopWhen: stepCountIs(10),
});
