import GlyphForm from "@/components/GlyphForm";
import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";

async function glyphCreatePage({ params }: { params: { glyphName: string } }) {
  const glyphName = params.glyphName;

  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>please sign in</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <GlyphForm type="create" name={glyphName} />
      {/* TODO: add editor here */}
    </div>
  );
}

export default glyphCreatePage;
