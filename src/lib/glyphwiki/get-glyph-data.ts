export async function getGlyphDataByName(name: string) {
  const response = await fetch(`https://glyphwiki.org/api/glyph?name=${name}`);
  const json = await response.json();
  const { related, data } = json;
  return { name, related, data };
}
