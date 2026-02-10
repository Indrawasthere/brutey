import { getPlaiceholder } from "plaiceholder";
import fs from "fs";

const getBase64 = async (imagePath: string) => {
  const file = fs.readFileSync(`./public${imagePath}`);
  const { base64 } = await getPlaiceholder(file);
  return base64;
};

getBase64("/avatar.png").then(console.log);
