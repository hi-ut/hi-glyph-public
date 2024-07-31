"use client";

import { uploadFile } from "./upload-action";


export function UploadForm() {
  return (
    <form action={uploadFile}>
      <input type="file" name="file" />
      <button className="btn btn-primary" type="submit">upload</button>
    </form>
  );
}