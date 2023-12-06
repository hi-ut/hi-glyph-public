import GlyphForm from "@/components/GlyphForm";

function glyphCreatePage({ params }: { params: { glyphName: string } }) {
  const glyphName = params.glyphName;

  return (
    <div className="flex flex-col sm:flex-row">
      <GlyphForm type="create" name={glyphName} />
      {/* TODO: add editor here */}
    </div>
  );
}

export default glyphCreatePage;
