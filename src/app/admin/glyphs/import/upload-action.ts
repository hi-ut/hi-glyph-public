"use server";

import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (file && file.size > 0) {
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const filePath = resolve(
      process.cwd(),
      "./public/uploads/imports",
      `${crypto.randomUUID()}.${file.name.split(".").pop()}`,
    );
    // await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    await fs.writeFile(filePath, buffer);
  }
  revalidatePath("/admin/glyphs/import");
}