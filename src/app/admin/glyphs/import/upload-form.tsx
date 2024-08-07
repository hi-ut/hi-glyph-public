"use client";

import { uploadFile } from "./upload-action";


export function UploadForm() {
  return (
    <form action={uploadFile} className="flex gap-2">
      <input className="file-input file-input-bordered w-full max-w-xs" type="file" name="file" />
      <button className="btn btn-primary" type="submit">upload</button>
    </form>
  );
}