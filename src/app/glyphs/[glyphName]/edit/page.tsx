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
    include: {
      refereneceImages: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!glyphData) {
    redirect(`/glyphs/${glyphName}/create`);
  }

  const refImgUrls = glyphData.refereneceImages.map((img) => img.url);

  console.log({ glyphData });

  return (
    <EditorComp
      name={glyphData.name as string}
      related={glyphData.related as string}
      data={glyphData.data as string}
      publicAccess={glyphData.publicAccess}
      refImgUrls={refImgUrls}
    />
  );
}

export default glyphModifyPage;
