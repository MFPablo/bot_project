import { automation } from "@/services/scrapper";
import { logWriter } from "@/utils/utils";

const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
      await scrapper()
    res.status(200).json({ message: "OK" });
  }
}

export default handler;


const scrapper = async () => {
  const scrapper = await automation();
  logWriter(scrapper)
}