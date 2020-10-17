import { MEDIA_TYPE, MEDIA_TYPES_URL_PART_ENUM } from "./types/media";

export const createDomAnchor = (anchorId: string) => {
  const anchor = document.createElement("div");
  anchor.id = anchorId;
  document.body.insertBefore(anchor, document.body.childNodes[0]);
};

export const waitElement = async (query: string, timeout: number = -1) => {
  let timeoutLeft = timeout * 500;
  while (!document.querySelector(query) && (timeout < 0 || timeoutLeft > 0)) {
    timeoutLeft -= 500;
    await new Promise((r) => setTimeout(r, 500));
  }
  return document.querySelector(query);
};

export const parseElementHref = (el: Element, is: MEDIA_TYPE) => {
  const href = el.getAttribute("href") || "";
  return href.substr(href.indexOf(MEDIA_TYPES_URL_PART_ENUM[is]));
};
