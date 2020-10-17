import React from "react";

export const useRateFetcher = (
  fetch: (link: string) => void,
  link: string,
  nextUpdate?: Date,
  forceUpdate: boolean = false
) => {
  React.useEffect(() => {
    if (forceUpdate || nextUpdate === undefined || nextUpdate < new Date()) {
      fetch(link);
    }
  }, []);
};
