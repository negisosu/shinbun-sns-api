/*
  Warnings:

  - A unique constraint covering the columns `[newsContentId,commentIndex]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commentIndex` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentIndex" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_newsContentId_commentIndex_key" ON "Comment"("newsContentId", "commentIndex");
