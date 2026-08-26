import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const prisma = new PrismaClient();
const SOURCE_DIR = "D:\\google downloads\\Aliza";
const UPLOADS_DIR = join(process.cwd(), "public", "uploads");

// productName -> ordered list of source jpeg filenames
const mapping = {
  "Crochet Rose Bag": ["1.jpeg", "same as 1.jpeg"],
  "Cherry Bag Charm Keychain": ["2.jpeg"],
  "Sunflower Bag Charm Keychain": ["3.jpeg"],
  "Whale Keychain": ["4.jpeg"],
  "Penguin Keychain": ["5.jpeg", "same as 5.jpeg"],
  "Graduation Keychain": ["6.jpeg"],
  "Custom Name Keychain": ["7.jpeg"],
  "Dark Hero-Inspired Keychain": ["8.jpeg"],
  "Web-Slinger-Inspired Keychain": ["9.jpeg"],
};

async function main() {
  await mkdir(UPLOADS_DIR, { recursive: true });

  for (const [productName, files] of Object.entries(mapping)) {
    const product = await prisma.product.findFirst({ where: { name: productName } });
    if (!product) {
      console.warn(`Skipping "${productName}" — no matching product found.`);
      continue;
    }

    const urls = [];
    for (const filename of files) {
      const ext = filename.split(".").pop();
      const destName = `${randomUUID()}.${ext}`;
      await copyFile(join(SOURCE_DIR, filename), join(UPLOADS_DIR, destName));
      urls.push(`/uploads/${destName}`);
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { images: JSON.stringify(urls) },
    });
    console.log(`${productName}: ${urls.length} photo(s) imported.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
