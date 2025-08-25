import express, { response } from "express";
import cors from "cors";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("API Working");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});