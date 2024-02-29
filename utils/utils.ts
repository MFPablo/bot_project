import { Page } from "playwright";
import fs from "fs";
import path from "path";
import moment from "moment";

export const isPresent = async (page: Page, sel: string) => {
  try {
    if ((await page.locator(sel).count()) > 0) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export const hasContent = async (page: Page, sel: string) => {
  try {
    const comp = (
      await page.locator(sel).first().innerText({ timeout: 2000 })
    ).trim();
    if (comp !== "" && comp !== undefined) {
      return comp;
    }
  } catch (e) {
    return e;
  }
};

export const sleep = async (ms: number) => {
  await new Promise(async (resolve) => setTimeout(resolve, ms));
};

export const clearInput = async (page: Page, selector: string) => {
  const $locator = page.locator(selector);
  await $locator.fill("");
  return $locator;
};

export const esUnMes = (mes: string, num?: boolean) => {
  mes = mes
    .normalize("NFD")
    .replace(/[\u0300-\u036f -/()|]/g, "")
    .toLowerCase();
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  if (num) {
    return meses.indexOf(mes) + 1;
  }

  return meses.includes(mes);
};

export const deleteScreenshotFolder = async (path: string) => {
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
};

export const logWriter = (obj: any) => {
  const logPath = path.resolve(process.cwd(), "logs");
  const filePath = logPath + `/${moment().format("YYYYMMDD")}.log`;
  const data = JSON.stringify(obj) + ",,";

  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  fs.writeFileSync(filePath, data, {
    flag: "a+",
    encoding: "utf8",
  });
};