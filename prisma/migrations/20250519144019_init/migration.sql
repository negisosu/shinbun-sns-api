/*
  Warnings:

  - A unique constraint covering the columns `[userId,newsContentId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NewsContent" ADD COLUMN     "bookmark" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "newsContentId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_newsContentId_key" ON "Favorite"("userId", "newsContentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_newsContentId_key" ON "Bookmark"("userId", "newsContentId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_newsContentId_fkey" FOREIGN KEY ("newsContentId") REFERENCES "NewsContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
