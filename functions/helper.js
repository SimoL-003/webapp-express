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

export { formatHttpRes, formatData, createImgPath };
