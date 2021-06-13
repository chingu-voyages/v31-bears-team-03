// @ts-nocheck
import axios from 'axios'
const baseUrl = 'https://www.thecolorapi.com/'

const getPalette = (color: string, mode: string, count: number) => {
    let response = axios.get(`${baseUrl}scheme?hex=${color}&mode=${mode}&count=${count}`)
    return response;
}


const getColorSlug = (colors, colorSlug) => {
    if (colorSlug?.length) {
      if (colors.length) {
        return colors
          .map((el) => el.color)
          .join("")
          .replaceAll("#", "-")
          .slice(1);
      }
      return colorSlug;
    } else {
      return "5EFC8D-7F270E-AE3512-DD4216-ED6139";
    }
  };

  const getColorsArrFromSlug = (colorSlug) => {
    const colorsArr = [];
    colorSlug.split("-").forEach((el) => colorsArr.push({ color: "#" + el }));
    return colorsArr;
  };

  const currentColors = (colors, colorSlug, colorsFromBackend) => {
    if (colorSlug?.length) {
      const slug = getColorSlug(colors, colorSlug);
      colors = getColorsArrFromSlug(slug);
    } else {
      colors = colorsFromBackend;
    }
    return colors;
  };

const colorService = {
    getPalette,
    getColorSlug,
    getColorsArrFromSlug,
    currentColors
}

export default colorService;