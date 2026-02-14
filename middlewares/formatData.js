import { capitalizeFirstWord, capitalizeWords } from "../functions/helper.js";

function formatData(req, res, next) {
  let { name, text, vote } = req.body;

  name = capitalizeWords(name.trim());
  text = capitalizeFirstWord(text.trim());

  req.body = { name, text, vote };
  next();
}

export default formatData;
