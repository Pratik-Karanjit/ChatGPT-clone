import express, { json } from "express";
import { port } from "./src/config/constant.js";
import userRouter from "./src/Routes/userRouter.js";
import cors from "cors"
import connectDb from "./src/connectdb/connectdb.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";



let app = express();

app.use(json());

app.use(bodyParser.json());
app.use(cors())
app.use("/users", userRouter);

connectDb();

app.use(express.static("./public"));

const configuration = new Configuration({
  organization: "org-BMjtvahkQJSu9GeXb4vnVcZO",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  // gpt 3.5 turbo as model 

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a EbereGPT. You can help with graphic design tasks",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
