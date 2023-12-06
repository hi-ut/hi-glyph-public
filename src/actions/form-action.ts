"use server";

import { authOptions } from "@/lib/auth-option";
import { createGlyph } from "@/lib/db/create-glyph";
import { updateGlyph } from "@/lib/db/update-glyph";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function formActionHandler(formData: FormData) {
  const name = formData.get("glyphName") as string;
  const related = formData.get("related") as string;
  const actionType = formData.get("type") as string;
  const refImgUrls = formData.get("refImgUrls") as string;
  const publicAccess = formData.get("publicAccess")===null ? false : true;
  let data = formData.get("glyphData") as string;

  const session = await getServerSession(authOptions);
  const creatorId = session?.user?.id;

  let refImgurlsArr: string[] | undefined = undefined;
  if (refImgUrls) {
    refImgurlsArr = refImgUrls.trim().split(/\r\n|\n/);
  }

  if (data) {
    data = data.trim().replaceAll(/\r\n/g, "$").replaceAll(/\n/g, "$");
  }

  if (actionType === "create") {
    await createGlyph({ name, related, data,publicAccess, creatorId, refImgUrls: refImgurlsArr });
  }

  if (actionType === "edit") {
    console.log({refImgurlsArr})
    await updateGlyph({ name, related, data, publicAccess, refImgUrls: refImgurlsArr });
    revalidatePath(`/glyphs/${name}`);
  }

  redirect(`/glyphs/${name}`);
}
