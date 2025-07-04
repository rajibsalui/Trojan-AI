// runAgentWorkflow.ts

import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DynamicTool } from "@langchain/core/tools";


import { createFile, readFile, updateFile, openInEditor } from "./tools";

// 1. Initialize your LLM
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.AGENTIC_API_KEY,
  model: "gemini-2.0-flash",
});

// 2. Wrap your raw functions as LangChain tools
const CreateFileTool = new DynamicTool({
  name: "create_file",
  description: "Create a new workspace file with relativePath and optional content",
  func: async (input: string) => {
    const { relativePath, content = '' } = JSON.parse(input);
    const result = await createFile(relativePath, content);
    return `File created at: ${result.fsPath}`;
  },
});

const ReadFileTool = new DynamicTool({
  name: "read_file",
  description: "Read file contents from a URI",
  func: async (input: string) => {
    const { uri } = JSON.parse(input);
    const result = await readFile(uri);
    return result;
  },
});

const UpdateFileTool = new DynamicTool({
  name: "update_file",
  description: "Overwrite file contents with uri and newContent",
  func: async (input: string) => {
    const { uri, newContent } = JSON.parse(input);
    await updateFile(uri, newContent);
    return `File updated: ${uri.fsPath}`;
  },
});

const OpenInEditorTool = new DynamicTool({
  name: "open_in_editor",
  description: "Open file in editor with uri",
  func: async (input: string) => {
    const { uri } = JSON.parse(input);
    await openInEditor(uri);
    return `File opened in editor: ${uri.fsPath}`;
  },
});

const tools = [
  CreateFileTool,
  ReadFileTool,
  UpdateFileTool,
  OpenInEditorTool,
];

// 3. Build a simple prompt template
const prompt = ChatPromptTemplate.fromTemplate(
  `You are an AI pair‐programmer. Perform the following user request by calling tools as needed:

{input}`
);

// 4. Create the tool‐calling agent
const agent = createToolCallingAgent({
  llm,
  tools,
  prompt,
});

// 5. Hook up the AgentExecutor and expose your workflow
export async function runAgentWorkflow(input: string): Promise<void> {
  const executor = new AgentExecutor({ agent, tools });
  // run takes an object matching the prompt variables; here { input }
  await executor.invoke({ input });
}
