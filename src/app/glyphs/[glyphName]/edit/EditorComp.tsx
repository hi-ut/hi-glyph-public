"use client";
import GlyphForm from "@/components/GlyphForm";
import { useEffect, useState } from "react";
import {KageEditor} from "kage-editor-comp";

function EditorComp({
  name,
  related,
  data,
  publicAccess,
  refImgUrls,
}: {
  name: string;
  related: string;
  data: string;
  publicAccess?: boolean;
  refImgUrls: string[];
}) {
  const [glyphData, setGlyphData] = useState(data);

  function hanldSubmit(data: string) {
    setGlyphData(data);
  }

  useEffect(() => {
    localStorage.setItem("kage-editor-data", data);
  },[data]);

  return (
    <div>
      <div className="flex ">
        <GlyphForm
          type="edit"
          name={name}
          related={related}
          data={glyphData}
          publicAccess={publicAccess}
          refImgUrls={refImgUrls}
        />
        <KageEditor
          // host="http://localhost:3000/api"
          host="https://asia-northeast1-ku6goma.cloudfunctions.net/gwproxy"
          lang="ja"
          name={name}
          data={data}
          onSubmit={hanldSubmit}
        />
      </div>
    </div>
  );
}

export default EditorComp