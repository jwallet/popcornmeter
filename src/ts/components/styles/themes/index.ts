import { DefaultTheme } from "styled-components";

export type ThemeTypes = "light" | "dark";

export const lightTheme: DefaultTheme = {
  backgroundColor: "cornsilk",
  color: "#444",
};

export const darkTheme: DefaultTheme = {
  backgroundColor: "#444",
  color: "#fafafa",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
