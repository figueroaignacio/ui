import { stepCountIs, ToolLoopAgent, type InferAgentUIMessage } from 'ai';
import { NACHUI_SYSTEM_PROMPT } from './prompts/system-prompt.js';
import { google, GOOGLE_MODELS } from './providers.js';
import { getComponentCodeTool } from './tools/get-component-code-tool.js';
import { getDocsTool } from './tools/get-docs-tool.js';

export const nachUIAgent = new ToolLoopAgent({
  model: google(GOOGLE_MODELS.gemini25Flash),
  instructions: NACHUI_SYSTEM_PROMPT,
  tools: {
    getDocs: getDocsTool,
    getComponentCode: getComponentCodeTool,
  },
  onFinish: ({ steps, usage }) => {
    console.log(`Agent finished in ${steps.length} steps. Total tokens: ${usage?.totalTokens}`);
  },
  stopWhen: stepCountIs(10),
});

export type NachUIAgentUIMessage = InferAgentUIMessage<typeof nachUIAgent>;
