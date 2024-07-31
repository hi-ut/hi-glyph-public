import { prisma } from "@/lib/db/prisma";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
// import EditorComp from "./EditorComp";

const EditorComp = dynamic(() => import("./EditorComp"), { ssr: false });

async function glyphModifyPage({ params }: { params: { glyphName: string } }) {
  const glyphName = params.glyphName;

  const glyphData = await prisma.glyphData.findUnique({
    where: {
      name: glyphName,
    },
  });

  if (!glyphData) {
    redirect(`/glyphs/${glyphName}/create`);
  }


  console.log({ glyphData });

  return (
    <EditorComp
      name={glyphData.name as string}
      related={glyphData.related as string}
      data={glyphData.data as string}
      publicAccess={glyphData.publicAccess}
    />
  );
}

export default glyphModifyPage;
