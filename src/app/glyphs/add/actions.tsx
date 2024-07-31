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

  if (data) {
    data = data.trim().replaceAll(/\r\n/g, "$").replaceAll(/\n/g, "$");
  }

  const session = await getServerSession(authOptions)
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw new Error("ログインしてください");
  }

  console.log({ name, related, data, publicAccess, userId });
  

  // await createGlyph({
  //   name,
  //   related,
  //   data,
  //   // TODO: creatorIdを設定する
  //   creatorId: userId,
  //   publicAccess,
  //   // TODO: refImgUrlsを設定する
  //   // refImgUrls: refImgUrlArr,
  // });

  // redirect(`/glyphs/${name}`);
}
