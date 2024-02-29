import moment from "moment";
import { Page } from "playwright";
import { User } from "./types";
import { hasContent, isPresent } from "./utils";

export const clickBotonAgregar = async (page: Page, modal: string) => {
  await page.locator(`${modal} >> xpath=..`).locator("text=Agregar").click();
};
export const clickBotonGuardar = async (page: Page) => {
  await page.locator("#btn_guardar").click();
};

export const clickVolverMenu = async (page: Page) => {
  await page.locator("#btn_volver_menu").click();
};
export const checkLogIn = async (page: Page) => {
  const sel = "[id='F1:msg']";
  try {
    const text = await hasContent(page, sel);
    if ((await isPresent(page, sel)) && text) {
      return text;
    }
  } catch (err) {
    return "Error de logIn";
  }
};

export const valorTipoFactura = (tipo: string) => {
  tipo = tipo
    .normalize("NFD")
    .replace(/[\u0300-\u036f -/()|]/g, "")
    .toLowerCase();
  switch (tipo) {
    case "facturab":
      return 6;
    case "notadedebitob":
      return 7;
    case "notadecreditob":
      return 8;
    case "recibob":
      return 9;
    case "notadeventaalcontadob":
      return 10;
    case "facturac":
      return 11;
    case "notadedebitoc":
      return 12;
    case "notadecreditoc":
      return 13;
    case "documentoaduanero":
      return 14;
    case "reciboc":
      return 15;
    case "notadeventaalcontadoc":
      return 16;
    case "otrocomprobantebrg1415":
      return 40;
    case "otrocomprobantecrg1415":
      return 41;
    case "tiquefacturab":
      return 82;
    case "otroscomprobantesdocumentosexceptuados":
      return 88;
    default:
      throw "Error al seleccionar el tipo de factura.";
  }
};

export const formatNumeroFactura = (numero: string, ext?: string) => {
  if (!numero?.length) {
    throw "Error formateando numero de factura";
  }
  const format = [];

  if (!ext) {
    format[0] = numero.split("-")[0]?.trim();
    format[1] = numero.split("-")[1]?.trim();
    return format;
  }

  // Numero de comprobante se divide en dos inputs numericos:
  format[0] = (Number(numero.split("-")[0]) + 11).toString().padStart(5, "0");
  format[1] = (Number(numero.split("-")[1]) + 1).toString().padStart(8, "0");
  return format;
};

export const agregarNumeroFactura = async (
  page: Page,
  value: number,
  numero: string,
  ext?: string
) => {
  if (value === 88) {
    await page.locator("#cmpNumeroAlternativo").first().type(numero);
  } else {
    const nFactura = formatNumeroFactura(numero, ext);

    if (!nFactura) {
      throw Error;
    }

    await page
      .locator("#cmpPuntoVenta")
      .first()
      .type(nFactura[0] || "");
    await page
      .locator("#cmpNumero")
      .first()
      .type(nFactura[1] || "");
  }
};

export const getRowFromTable = async (page: Page, tabla: string) => {
  const $tabla = page.locator(`${tabla} >> tbody >> tr`);
  return $tabla.nth((await $tabla.count()) - 1).locator("td");
};

export const takeScreenshot = async (user: User, page?: Page) => {
  const folder = moment().format("DDMMYYYY");
  const fileName = `${user.credentials.cuil + "-" + moment().format("HHmmss")}`;
  const filePath = `./public/screenshots/${folder}/${fileName}.png`;

  if (page) {
    await page.screenshot({
      path: `${filePath}`,
      fullPage: true,
    });
  }

  /*
  const buffer = await page.screenshot();
  return buffer;
  */

  return { folder: folder, fileName: fileName };
};
