
import { Ollama } from "@langchain/ollama";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";

import { v4 as uuidv4 } from "uuid";


// Define the function that calls the model



const init = async () => {


 const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", 
  model: "qwen3:8b", 
});

const config = { configurable: { thread_id: uuidv4() } };

const input = [
  {
    role: "user",
    content: "我是马里莫",
  },
];



const callModel = async (state) => {
  const response = await ollamaModel.invoke(state.messages);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);


  // Add memory
const memory = new MemorySaver();

const app = workflow.compile({ checkpointer: memory });

const output = await app.invoke({ messages: input }, config);
console.log(output.messages[output.messages.length - 1]);


const input2 = [
  {
    role: "user",
    content: "我的名字是什么",
  },
];
const output2 = await app.invoke({ messages: input2 }, config);
console.log(output2.messages[output2.messages.length - 1]);


const config2 = { configurable: { thread_id: uuidv4() } };

const input3 = [
  {
    role: "user",
    content: "我的名字是什么",
  },
];
const output3 = await app.invoke({ messages: input3 }, config2);
console.log(output3.messages[output3.messages.length - 1]);


const output4 = await app.invoke({ messages: input2 }, config);
console.log(output4.messages[output4.messages.length - 1]);


};

init();