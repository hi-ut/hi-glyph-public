import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import React from "react";

function glyphsDropPage() {
  async function action() {
    "use server";
    try {
      await prisma.glyphData.deleteMany();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col">
      <div className="p-2 font-bold">Drop all glyphs data?</div>
      <div className="flex py-4 gap-4">
        <form action={action}>
          <button className="btn btn-error" type="submit">
            Yes
          </button>
        </form>
        <Link href={"/admin/glyphs"} className="btn btn-secondary">
          No
        </Link>
      </div>
    </div>
  );
}

export default glyphsDropPage;
