/*
  Warnings:

  - You are about to drop the `Mojikyo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `GlyphData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GlyphData" ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "lastEditorId" TEXT;

-- DropTable
DROP TABLE "Mojikyo";

-- AddForeignKey
ALTER TABLE "GlyphData" ADD CONSTRAINT "GlyphData_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlyphData" ADD CONSTRAINT "GlyphData_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
