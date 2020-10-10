import Axios, { AxiosResponse } from "axios";
import _get from "lodash.get";

const domParser = new DOMParser();

export const getMovieAudienceRate = async (linkPart: string) => {
  try {
    const response: AxiosResponse = await Axios.get(
      `https://www.rottentomatoes.com${linkPart}`
    );

    const document = domParser.parseFromString(response.data, "text/html");
    const percentageHtml = document.querySelector(
      ".audience-score .mop-ratings-wrap__percentage"
    );

    const percentageText = _get(percentageHtml, "innerHTML", "").trim();

    if (percentageText && percentageText.includes("%")) {
      return Number(percentageText.split("%")[0]);
    }
  } catch (error) {
    console.error(linkPart, error);
  }

  return undefined;
};
