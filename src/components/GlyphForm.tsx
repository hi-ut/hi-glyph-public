"use client";

import { formActionHandler } from "@/actions/form-action";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";

interface GlyphFromProps {
  type: "create" | "edit";
  name: string;
  related?: string;
  data?: string;
  publicAccess?: boolean;
  refImgUrls?: string[];
}

function GlyphForm({
  type,
  name,
  related,
  data,
  publicAccess,
  refImgUrls,
}: GlyphFromProps) {
  data = data?.replaceAll(/\$/g, "\n");
  const [glyphData, setGlyphData] = useState(data);
  const [isPublicAccess, setPublicAccess] = useState(publicAccess);

  useEffect(() => {
    setGlyphData(data);
  }, [data]);

  return (
    <div className="flex">
      <div className="p-2 m-4 w-full max-w-md">
        <form className="flex flex-col gap-4" action={formActionHandler}>
          <input type="hidden" name="type" value={type} />

          <Input
            type="text"
            label="字形名"
            labelPlacement="outside"
            name="glyphName"
            placeholder="字形名を入力してください"
            defaultValue={name}
            isReadOnly={type === "edit"}
          />

          <Input
            type="text"
            label="関連漢字"
            labelPlacement="outside"
            name="related"
            placeholder="関連漢字を入力してください"
            defaultValue={related}
          />

          <Textarea
            name="glyphData"
            id="glyphData"
            label="KAGEデータ"
            labelPlacement="outside"
            placeholder="KAGEデータを入力してください"
            value={glyphData}
            onChange={(e) => {
              setGlyphData(e.target.value);
            }}
          />

          <Switch name="publicAccess" id="publicAccess" isSelected={isPublicAccess} onValueChange={setPublicAccess}>
            公開
          </Switch>

          <Textarea
            name="refImgUrls"
            id="refImgUrls"
            label="参考画像URL"
            labelPlacement="outside"
            placeholder="複数の場合、改行で区切ってください"
            defaultValue={refImgUrls?.join("\n")}
          />

          <div className="flex justify-center gap-8">
            <Button color="primary" type="submit" className="w-24">
              {type === "create" ? "作成" : "更新"}
            </Button>
            <Button
              color="default"
              as={Link}
              href={`/glyphs/${name}`}
              className="w-24"
            >
              キャンセル
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GlyphForm;
