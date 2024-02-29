import { Browser, chromium, ChromiumBrowserContext, Page } from "playwright";
import { isPresent, sleep } from "@/utils/utils";
import { checkLogIn } from "@/utils/afip-utils";
import { User } from "@/utils/types";
import moment from "moment";

let browser: Browser;
let context: ChromiumBrowserContext;

const userData = { id: "01", name: "pablo", credentials: { cuil: "12345678", key: "123456789" } };

export const automation = async () => {
  console.log("Bot Start..")

  browser = await chromium.launch({
    headless: false,
  });
  context = await browser.newContext();
  context.setDefaultTimeout(10 * 1000);
  const page = await context.newPage();
  const stats: any = {};

  await page.pause();

  try {
    stats.login = await iniciarSesionAfip(page, userData)
    if (stats.login.status === "OK") {
      console.log("Login OK")
    }

  } catch (err) {
    throw err
  }

  try {
    await context.close();
    await browser.close();
  } catch (err) {
    console.error(err)
  }

  return {
    timeStamp: moment().format("DD-MM-YYYY - HH:mm:ss"),
    ...stats,
  }
};


const iniciarSesionAfip = async (page: Page, users: User) => {
  try {
    await page.goto("https://auth.afip.gob.ar/contribuyente_/login.xhtml", {
      waitUntil: "load",
    });

    await page.locator(".form-control").first().type(users.credentials.cuil);
    await page.click("input[title='Siguiente']");

    const checkCuil = await checkLogIn(page);
    if (checkCuil) throw checkCuil;
    if (await isPresent(page, "#captcha")) throw "Captcha detectado.";

    await page.locator(".form-control").first().type(users.credentials.key);
    await page.click("input[title='Ingresar']");

    const checkKey = await checkLogIn(page);
    if (checkKey) throw checkKey;

    await page.locator(".logoAfip").first().isVisible();

    if (await isPresent(page, ".modal-dialog.modal-lg.modal-dialog")) {
      await page.getByRole("button", { name: "Cerrar" }).click();
      await sleep(500);
    }

    return { status: "OK" };
  } catch (e: any) {
    return { status: JSON.stringify(e) };
  }
};