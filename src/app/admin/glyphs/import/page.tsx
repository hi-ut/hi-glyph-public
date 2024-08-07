import React from "react";
import { UploadForm } from "./upload-form";
import path from "path";
import { readdir } from "fs/promises";
import { cwd } from "process";
import { statSync } from "fs";
import Link from "next/link";

async function getUploadedFiles() {
  const directoryPath = path.join(cwd(), "/public/uploads/imports");
  const fileNames:{name:string, date:string}[] = [];
  try {
    const files = await readdir(directoryPath, { withFileTypes: true });
    files.forEach(function (file) {
      const filePath = path.join(directoryPath, file.name);
      fileNames.push({
        name: file.name,
        date: statSync(filePath).mtime.toLocaleDateString(),
      });
    });
    console.log("fileNames", fileNames);
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
  return fileNames;
}

async function GlyphImportPage() {
  const files = await getUploadedFiles();
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2">
        <h2>Upload <span className="text-error">TSV</span> File:</h2>
        <p>Only work on self hosting server.</p>
        <p>Error with Vercel or Netlify.</p>
        <UploadForm />
      </div>
      <div className="divider"></div>
      <div>
        <p>Uploaded Files:</p>
        <table className="table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {files.map((file) => (
            <tr key={file.name}>
              <td><Link className="link link-hover" href={`/admin/glyphs/import/${file.name}`}>{file.name}</Link></td>
              <td>{file.date}</td>
            </tr>
          ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default GlyphImportPage;
