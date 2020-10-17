import Axios, { AxiosResponse } from "axios";
import _get from "lodash.get";

const domParser = new DOMParser();

const getRatePercentageFromDOM = (document: Document) => {
  const domSelection = document.querySelector(
    ".audience-score .mop-ratings-wrap__percentage"
  );

  const text = _get(domSelection, "innerHTML", "").trim();

  if (text && text.includes("%")) {
    return Number(text.split("%")[0]);
  }
  return null;
};

const getRateCountFromDOM = (document: Document) => {
  const domSelection = document.querySelector(
    ".audience-score strong.mop-ratings-wrap__text--small"
  );

  const text = _get(domSelection, "innerHTML", "").replace(/\D/g, "");

  if (text) {
    return Number(text);
  }
  return null;
};

export const getAudienceRateData = async (linkPart: string) => {
  try {
    console.log(`[POPCORN METER] https://www.rottentomatoes.com${linkPart}`);
    const response: AxiosResponse = await Axios.get(
      `https://www.rottentomatoes.com${linkPart}`
    );

    const document = domParser.parseFromString(response.data, "text/html");

    const ratePercentage = getRatePercentageFromDOM(document);
    const rateCount = getRateCountFromDOM(document);

    if (ratePercentage !== null && Number.isInteger(ratePercentage)) {
      return {
        ratePercentage,
        rateCount:
          rateCount !== null && Number.isInteger(rateCount) ? rateCount : null,
      };
    }
  } catch (error) {
    console.error(`[POPCORN METER]`, linkPart, error);
    return undefined;
  }

  return { ratePercentage: null, rateCount: 0 };
};
