import { authOptions } from "@/lib/auth-option";
import { prisma } from "@/lib/db/prisma";
import { readFile } from "fs/promises";
import { getServerSession } from "next-auth";
import path from "path";
import React from "react";

async function getFileContent(fileName: string) {
  // read file by file name
  const filePath = path.join(
    process.cwd(),
    "/public/uploads/imports",
    fileName
  );
  let content = "";
  try {
    content = await readFile(filePath, "utf8");
  } catch (err) {
    console.log("Unable to read file: " + err);
  }
  // return first 100 lines
  return content;
}

async function UploadedFilePage({ params }: { params: { fileName: string } }) {
  const content = await getFileContent(params.fileName);
  const contentHeader = content.split("\n").slice(0, 100).join("\n");

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw new Error("Please sign in");
  }

  async function importContent() {
    "use server";
    const lines = contentHeader.split("\n");
    // skip header
    lines.shift();
    // lines.map(async (line) => {
    //   const [glyph, name, description] = line.split("\t");
    // });
    try {
      const createMany = await prisma.glyphData.createMany({
        data: lines.map((line) => {
          const [name, related, data] = line.split("\t");
          return {
            name,
            related,
            data,
            publicAccess: true,
            createdBy: { connect: { id: userId } },
          };
        }),
        // not working with sqlite
        // skipDuplicates: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2>UploadedFilePage</h2>
      <p>File Name: {params.fileName}</p>
      <form action={importContent}>
        <input className="btn btn-primary" type="submit" value={"Import"} />
         
      </form>
      <div className="divider"></div>
      <div>
        <pre>{content}</pre>
      </div>
    </div>
  );
}

export default UploadedFilePage;
