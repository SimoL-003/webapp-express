import { capitalizeFirstWord, capitalizeWords } from "../functions/helper.js";

function reviewData(req, res, next) {
  let { name, text, vote } = req.body;

  name = capitalizeWords(name.trim());
  text = capitalizeFirstWord(text.trim());

  req.body = { name, text, vote };
  next();
}

function movieData(req, res, next) {
  let { title, director, abstract } = req.body;

  title = capitalizeWords(title.trim());
  director = capitalizeWords(director.trim());
  abstract = capitalizeFirstWord(abstract.trim());

  req.body = { title, director, abstract };
  next();
}

export default { reviewData, movieData };
