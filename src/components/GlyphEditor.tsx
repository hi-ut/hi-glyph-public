"use client";

import GlyphForm from "@/components/GlyphForm";
import { KageEditor } from "kage-editor-comp";
import React, { useState } from "react";

type Props = {
  type: "create" | "edit";
  name?: string;
  related?: string;
  data?: string;
};

// TODO add switch for searching server(local or glyphwiki)

function GlyphEditor(props: Props) {
  const [name, setName] = useState(props.name);
  const [related, setRelated] = useState(props.related);
  const [data, setData] = useState(props.data);

  return (
    <div className="flex">
      <div>
        <GlyphForm
          type={props.type}
          name={name as string}
          related={related as string}
          data={data as string}
        />
      </div>
      <div>
        <KageEditor
          name={name}
          host="https://asia-northeast1-ku6goma.cloudfunctions.net/gwproxy"
          // host={`http://localhost:3000/api`}
          lang="ja"
          data={data}
          onSubmit={setData}
        />
      </div>
    </div>
  );
}

export default GlyphEditor;
