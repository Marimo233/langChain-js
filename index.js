
import { Ollama } from "@langchain/ollama";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";

import { ChatPromptTemplate } from "@langchain/core/prompts";

import { v4 as uuidv4 } from "uuid";


// Define the function that calls the model

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation({
    default: "中文",
  }),
});

const init = async () => {


 const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", 
  model: "qwen3:8b", 
});

// const config = { configurable: { thread_id: uuidv4() } };


// const promptTemplate = ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     "用你最好的能力作为海盗回复消息，海盗的语言必须是中文",
//   ],
//   ["placeholder", "{messages}"],
// ]);

const promptTemplate2 = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
  ],
  ["placeholder", "{messages}"],
]);

// const input = [
//   {
//     role: "user",
//     content: "我是马里莫",
//   },
// ];



// const callModel = async (state) => {
//   const response = await ollamaModel.invoke(state.messages);
//   return { messages: response };
// };

// const callModel2 = async (state) => {
//   const prompt = await promptTemplate.invoke(state);
//   const response = await ollamaModel.invoke(prompt);
//   return { messages: [response] };
// };


const callModel3 = async (state) => {
  const prompt = await promptTemplate2.invoke(state);
  const response = await ollamaModel.invoke(prompt);
  return { messages: [response] };
};

// Define a new graph
// const workflow = new StateGraph(MessagesAnnotation)
//   // Define the node and edge
//   .addNode("model", callModel)
//   .addEdge(START, "model")
//   .addEdge("model", END);


  // const workflow2 = new StateGraph(MessagesAnnotation)
  // .addNode("model", callModel2)
  // .addEdge(START, "model")
  // .addEdge("model", END);
const workflow3 = new StateGraph(GraphAnnotation)
  .addNode("model", callModel3)
  .addEdge(START, "model")
  .addEdge("model", END);

//   // Add memory
// const memory = new MemorySaver();

// const app = workflow.compile({ checkpointer: memory });

// const app2 = workflow2.compile({ checkpointer: new MemorySaver() });
const app3 = workflow3.compile({ checkpointer: new MemorySaver() });

// const output = await app.invoke({ messages: input }, config);
// console.log(output.messages[output.messages.length - 1]);


// const input2 = [
//   {
//     role: "user",
//     content: "我的名字是什么",
//   },
// ];
// const output2 = await app.invoke({ messages: input2 }, config);
// console.log(output2.messages[output2.messages.length - 1]);


// const config2 = { configurable: { thread_id: uuidv4() } };

// const config3 = { configurable: { thread_id: uuidv4() } };

// const input3 = [
//   {
//     role: "user",
//     content: "我的名字是什么",
//   },
// ];
// const output3 = await app.invoke({ messages: input3 }, config2);
// console.log(output3.messages[output3.messages.length - 1]);

// const input4 = [
//   {
//     role: "user",
//     content: "Hi! 我是 marimo",
//   },
// ];
// const output4 = await app2.invoke({ messages: input4 }, config3);
// console.log(output4.messages[output4.messages.length - 1]);

// const input5 = [
//   {
//     role: "user",
//     content: "我的名字是什么",
//   },
// ];
// const output6 = await app2.invoke({ messages: input5 }, config3);
// console.log(output6.messages[output6.messages.length - 1]);

const config4 = { configurable: { thread_id: uuidv4() } };
const input6 = {
  messages: [
    {
      role: "user",
      content: "Hi im bob",
    },
  ],
  language: "Japanese",
};
const output7 = await app3.invoke(input6, config4);
console.log(output7.messages[output7.messages.length - 1]);

};

init();