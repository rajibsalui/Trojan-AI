// runAgentWorkflow.ts

import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { createFile, readFile, updateFile, openInEditor } from "./tools";

// 1. Initialize your LLM
const llm = new ChatOpenAI({
  openAIApiKey: process.env.AGENTIC_API_KEY,
  modelName: "gpt-4o",
  temperature: 0,
});

// 2. Wrap your raw functions as LangChain tools
const CreateFileTool = tool(
  async ({ relativePath, content = '' }) => {
    const result = await createFile(relativePath, content);
    return `File created at: ${result.fsPath}`;
  },
  {
    name: "create_file",
    description: "Create a new workspace file",
    schema: z.object({
      relativePath: z.string().describe("The relative path for the new file"),
      content: z.string().optional().describe("The content for the new file"),
    }),
  }
);

const ReadFileTool = tool(
  async ({ uri }) => {
    const result = await readFile(uri);
    return result;
  },
  {
    name: "read_file",
    description: "Read file contents",
    schema: z.object({
      uri: z.any().describe("The URI of the file to read"),
    }),
  }
);

const UpdateFileTool = tool(
  async ({ uri, newContent }) => {
    await updateFile(uri, newContent);
    return `File updated: ${uri.fsPath}`;
  },
  {
    name: "update_file",
    description: "Overwrite file contents",
    schema: z.object({
      uri: z.any().describe("The URI of the file to update"),
      newContent: z.string().describe("The new content for the file"),
    }),
  }
);

const OpenInEditorTool = tool(
  async ({ uri }) => {
    await openInEditor(uri);
    return `File opened in editor: ${uri.fsPath}`;
  },
  {
    name: "open_in_editor",
    description: "Open file in editor",
    schema: z.object({
      uri: z.any().describe("The URI of the file to open"),
    }),
  }
);

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
  // you can also pass a custom message_formatter here if needed
});

// 5. Hook up the AgentExecutor and expose your workflow
export async function runAgentWorkflow(input: string): Promise<void> {
  const executor = new AgentExecutor({ agent, tools });
  // run takes an object matching the prompt variables; here { input }
  await executor.invoke({ input });
}
