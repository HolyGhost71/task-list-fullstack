import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task";
import express from "express";
import cors from "cors";
const app = express();
const port = 3001;
import serverless from "serverless-http";

// Grabs the body of the requests as they come in
app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchtasks();
    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = await req.body;
    const response = await createTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating task: ${err}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const task = await req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating task: ${err}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting task: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
