import { authOptions } from "@/lib/auth-option";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function glyphDeletePage({ params }: { params: { glyphName: string } }) {
  const glyphName = params.glyphName;
  const glyphData = await prisma.glyphData.findUnique({
    where: {
      name: glyphName,
    },
  });

  const handleDelete = async () => {
    "use server";
    await prisma.glyphData.delete({
      where: {
        name: glyphName,
      },
    });
    revalidatePath(`/glyphs`);
    redirect(`/glyphs`);
  }

  if (!glyphData) {
    return <div>glyph not found</div>;
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/glyphs/${glyphName}`);
  }

  if (session?.user?.id !== glyphData.creatorId && session?.user?.role !== "ADMIN") {
    redirect(`/glyphs/${glyphName}`);
  }

  return (
    <>
      <h2>Delete {glyphName}?</h2>
      <div>
        <form action={handleDelete}>
        <button className="btn btn-error" type="submit">Delete</button>

        </form>
      </div>
    </>
  );
}

export default glyphDeletePage;
