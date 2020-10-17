import React from "react";
import { MEDIA_TYPES_ENUM } from "../types/media";
import CarouselHooker from "./carousel/CarouselHooker";
import SideListHooker from "./side-list/SideListHooker";
import BrowseHooker from "./browse/BrowseHooker";
import ArticleHooker from "./article/ArticleHooker";

interface IProps {
  location: { pathname: string; hostname: string };
}

const Base = (props: IProps) => {
  if (!/rottentomatoes.com/.test(props.location.hostname)) return null;
  return (
    <>
      {[MEDIA_TYPES_ENUM.MOVIE, MEDIA_TYPES_ENUM.SERIE].map((media) => (
        <>
          {props.location.pathname === "/" && (
            <>
              <SideListHooker is={media} />
              <CarouselHooker is={media} />
            </>
          )}
          {/\/browse\//.test(props.location.pathname) && (
            <BrowseHooker is={media} />
          )}
          {props.location.hostname === "editorial.rottentomatoes.com" && (
            <ArticleHooker is={media} />
          )}
        </>
      ))}
    </>
  );
};

export default Base;
