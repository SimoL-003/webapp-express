import express from "express";
import moviesRouter from "./routers/movies.js";
import notFound from "./middlewares/notFound.js";
import handleError from "./middlewares/handleError.js";

const app = express();
const port = 3000;

app.use("/api/movies", moviesRouter);

app.use(handleError);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
