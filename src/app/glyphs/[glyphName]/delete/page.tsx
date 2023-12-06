import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function glyphDeletePage({ params }: { params: { glyphName: string } }) {
  const name = params.glyphName;
  const glyph = await prisma.glyphData.findUnique({
    where: {
      name,
    },
  });

  const handleDelete = async () => {
    "use server";
    await prisma.glyphData.delete({
      where: {
        name,
      },
    });
    revalidatePath(`/glyphs`);
    redirect(`/glyphs`);
  }

  if (!glyph) {
    return <div>glyph not found</div>;
  }

  return (
    <>
      <h2>Delete {name}?</h2>
      <div>
        <form action={handleDelete}>
        <button className="btn btn-error" type="submit">Delete</button>

        </form>
      </div>
    </>
  );
}

export default glyphDeletePage;
