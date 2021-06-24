//@ts-nocheck
import axios from "axios";
import chroma from "chroma-js";
import { v4 as uuidv4 } from "uuid";

const baseUrl = "https://www.thecolorapi.com/";

type Colors = { id: string; color: string; lock: boolean }[];

const getPalette = (color: string, mode: string, count: number) => {
  let response = axios.get(
    `${baseUrl}scheme?hex=${color}&mode=${mode}&count=${count}`
  );
  return response;
};

const generatePalette = async (colorMode: string) => {
  const first = chroma.random().hex().substring(1);
  const response = await getPalette(first, colorMode, 5);
  const returnedArray = response.data.colors;
  const newArray = [];
  for (let i = 0; i < returnedArray.length; i++) {
    newArray.push({ id: uuidv4(), color: returnedArray[i].hex.value, lock: false });
  }
  return newArray;
};

const getColorSlug = (colors: Colors) => {
  return colors
    .map((el) => el.color)
    .join("")
    .replaceAll("#", "-")
    .slice(1);
};

const getColorsArrFromSlug = (colorSlug: string) => {
  const colorsArr: Colors = [];
  colorSlug
    .split("-")
    .forEach((el) => colorsArr.push({ id: uuidv4(), color: "#" + el }));
  return colorsArr;
};

const colorService = {
  getPalette,
  generatePalette,
  getColorsArrFromSlug,
  getColorSlug,
};

export default colorService;
