import data from './words.json';

export const  generate=()=>{
    return data[Math.floor( Math.random() * data.length)]
}