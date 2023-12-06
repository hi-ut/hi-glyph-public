"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddGlyphForm from "./form";
import { KageEditor } from "kage-editor-comp";

function GlyphAddPage() {
  const searchParams = useSearchParams();
  const name = searchParams?.get("name") as string;
  const related = searchParams?.get("related") as string;
  const [data, setData] = useState(searchParams?.get("data") as string);

  useEffect(() => {
    localStorage.setItem("kage-editor-data", data);
  }, [data]);

  return (
    <div className="flex">
      <AddGlyphForm type="create" name={name} related={related} data={data} />
      <KageEditor
        name={name}
        host="https://asia-northeast1-ku6goma.cloudfunctions.net/gwproxy"
        // host={`http://localhost:3000/api`}
        lang="ja"
        data={data}
        onSubmit={setData}
      />
    </div>
  );
}

export default GlyphAddPage;
