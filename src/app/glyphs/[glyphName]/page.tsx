import { GlyphSvg } from "@/components/GlyphSvg";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { host } from "@/lib/constants";


async function glyphItemPage({ params }: { params: { glyphName: string } }) {
  const glyphName = params.glyphName;
  const advancedRoles = ["ADMIN", "ADVANCED_USER"];
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role;
  const canAccess = userRole!==undefined && advancedRoles.includes(userRole);

  const glyphData = await prisma.glyphData.findUnique({
    where: {
      name: glyphName,
      publicAccess:canAccess?undefined:true,
    },
  });

  if (!glyphData) {
    return (
      <div>
        <h3>Glyph not found.</h3>
        <div className="flex gap-4">
          <Button as={Link} size="sm" variant="flat" href={`/glyphs/`}>リストに戻る</Button>
          <Button as={Link} size="sm" variant="flat" color="primary" href={`/glyphs/${glyphName}/create`}>作成</Button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex items-center h-96 space-x-4">
      <div>
        <div>
          <GlyphSvg
            name={glyphName}
            data={glyphData.data}
            width={200}
            height={200}
          />
        </div>

        <h2 className="py-2 text-xl">字形名：{glyphName}</h2>
        <h2 className="py-2 text-xl">関連漢字：{glyphData.related}</h2>
        <h2 className="py-2 text-xl">公開状況：{glyphData.publicAccess?"公開":"非公開"}</h2>

        <div className="flex gap-4">
          <Button as={Link} size="sm" variant="flat" color="primary" href={`/glyphs/${glyphName}/edit`}>
            編集
          </Button>
          <Button as={Link} size="sm" variant="flat" color="danger" href={`/glyphs/${glyphName}/delete`}>
            削除
          </Button>
          <Button as={Link} size="sm" variant="flat" color="default" href={`/glyphs/`}>
            リストに戻る
          </Button>
        </div>
      </div>

    </div>
  );
}

export default glyphItemPage;
