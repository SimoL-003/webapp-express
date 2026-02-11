import express from "express";
import moviesRouter from "./routers/movies.js";
import notFound from "./middlewares/notFound.js";
import handleError from "./middlewares/handleError.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.use("/api/movies", moviesRouter);

app.use(handleError);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
