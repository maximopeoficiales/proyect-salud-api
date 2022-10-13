import { Element } from "cheerio";

export const getDataCheerioByArray = (dataArray: Element[]): string[] => {
  return dataArray.map(e => {
    const dataElement = (e.children[0] as any)
    return dataElement ? dataElement.data : "";
  });
}