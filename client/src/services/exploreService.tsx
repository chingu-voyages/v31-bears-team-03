//@ts-nocheck
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import colorService from './colorService';
const baseUrl = 'http://localhost:4000';

const getPalettes = async () => {
  const response = await axios.get(`${baseUrl}/palettes/`);
  return response;
};

const addPalette = async (paletteObject) => {
  const newObject = {
    colorPaletteID: colorService.getColorSlug(paletteObject),
    likes: 0,
    colors: paletteObject,
  };
  try {
    const response = await axios.put(
      `${baseUrl}/user/palettes/add`,
      newObject,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const deletePalette = async (paletteObject) => {
  try {
    const newObject = {
      colorPaletteID: colorService.getColorSlug(paletteObject.colors),
      likes: 0,
      colors: paletteObject,
    };
    const response = await axios.put(
      `${baseUrl}/user/palettes/remove`,
      newObject,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const exploreService = {
  getPalettes,
  addPalette,
  deletePalette,
};

export default exploreService;
