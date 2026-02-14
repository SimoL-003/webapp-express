import { DateTime } from "luxon";

function formatHttpRes(resData) {
  if (Array.isArray(resData)) {
    return {
      data: resData,
      meta: {
        totalItems: resData.length,
      },
    };
  } else
    return {
      data: resData,
    };
}

function formatData(jsdate) {
  return DateTime.fromJSDate(jsdate).toLocaleString();
}

function createImgPath(imgName) {
  const imgPath = `${process.env.SERVER_URL}/images/${imgName}`;
  return imgPath;
}

// Funzione per rendere maiuscole le iniziali di ogni parola
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Funzione per rendere maiuscola solo la prima parola
function capitalizeFirstWord(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  formatHttpRes,
  formatData,
  createImgPath,
  capitalizeWords,
  capitalizeFirstWord,
};
