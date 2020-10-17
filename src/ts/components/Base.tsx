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
      {props.location.pathname === "/" && (
        <>
          <SideListHooker is={MEDIA_TYPES_ENUM.MOVIE} />
          <SideListHooker is={MEDIA_TYPES_ENUM.SERIE} />
          <CarouselHooker is={MEDIA_TYPES_ENUM.MOVIE} />
          <CarouselHooker is={MEDIA_TYPES_ENUM.SERIE} />
        </>
      )}
      {/\/browse\//.test(props.location.pathname) && (
        <>
          <BrowseHooker is={MEDIA_TYPES_ENUM.MOVIE} />
          <BrowseHooker is={MEDIA_TYPES_ENUM.SERIE} />
        </>
      )}
      {props.location.hostname === "editorial.rottentomatoes.com" && (
        <>
          <ArticleHooker is={MEDIA_TYPES_ENUM.MOVIE} />
          <ArticleHooker is={MEDIA_TYPES_ENUM.SERIE} />
        </>
      )}
    </>
  );
};

export default Base;
