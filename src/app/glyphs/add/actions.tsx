"use server";

import { authOptions } from "@/lib/auth-option";
import { createGlyph } from "@/lib/db/create-glyph";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function addGlyph(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const related = formData.get("related") as string;
  const publicAccessStr = formData.get("publicAccess") as string;
  const publicAccess = publicAccessStr === "on" ? true : false;
  let data = formData.get("glyphData") as string;
  const refImgUrls = formData.get("refImgUrls") as string;

  if (data) {
    data = data.trim().replaceAll(/\r\n/g, "$").replaceAll(/\n/g, "$");
  }

  let refImgUrlArr: string[] | undefined = undefined;
  if (refImgUrls) {
    refImgUrlArr = refImgUrls.trim().split(/\r\n|\n/);
  }

  const session = await getServerSession(authOptions)
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw new Error("ログインしてください");
  }
  

  await createGlyph({
    name,
    related,
    data,
    // TODO: creatorIdを設定する
    creatorId: userId,
    publicAccess,
    // TODO: refImgUrlsを設定する
    // refImgUrls: refImgUrlArr,
  });

  redirect(`/glyphs/${name}`);
}
