-- CreateEnum
CREATE TYPE "Glyph_reference_image_type" AS ENUM ('MOJIKYO', 'UNICODE', 'OTHERS');

-- CreateEnum
CREATE TYPE "User_role" AS ENUM ('USER', 'ADVANCED_USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "role" "User_role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlyphData" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "related" TEXT,
    "data" TEXT,
    "publicAccess" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GlyphData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mojikyo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "unicode" TEXT,
    "character" TEXT,

    CONSTRAINT "Mojikyo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlyphReferenceImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "type" "Glyph_reference_image_type" NOT NULL DEFAULT 'OTHERS',
    "remarks" TEXT,
    "glyphId" INTEGER NOT NULL,

    CONSTRAINT "GlyphReferenceImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GlyphData_name_key" ON "GlyphData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mojikyo_name_key" ON "Mojikyo"("name");

-- CreateIndex
CREATE INDEX "GlyphReferenceImage_glyphId_idx" ON "GlyphReferenceImage"("glyphId");

-- AddForeignKey
ALTER TABLE "GlyphReferenceImage" ADD CONSTRAINT "GlyphReferenceImage_glyphId_fkey" FOREIGN KEY ("glyphId") REFERENCES "GlyphData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
