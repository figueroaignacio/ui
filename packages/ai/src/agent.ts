import { stepCountIs, ToolLoopAgent } from 'ai';
import { NACHUI_SYSTEM_PROMPT } from './prompts/system-prompt';
import { groq, GROQ_MODELS } from './providers';
import { getComponentCodeTool } from './tools/get-component-code-tool';
import { getDocsTool } from './tools/get-docs-tool';

/*

(•_•)
<)   )╯  if works {
 /   \     dontTouchIt();
         } 

*/

// Ladies and gentlemen, I introduce you... the damn NachUI agent.
export const nachUIAgent = new ToolLoopAgent({
  model: groq(GROQ_MODELS.llama318b),
  instructions: NACHUI_SYSTEM_PROMPT,
  tools: {
    getDocs: getDocsTool,
    getComponentCode: getComponentCodeTool,
  },
  stopWhen: stepCountIs(10),
});
