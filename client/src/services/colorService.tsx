import axios from 'axios'
const baseUrl = 'https://www.thecolorapi.com/'

const getPalette = (color: string, mode: string, count: number) => {
    let response = axios.get(`${baseUrl}scheme?hex=${color}&mode=${mode}&count=${count}`)
    return response;
}

const colorService = {
    getPalette
}

export default colorService;