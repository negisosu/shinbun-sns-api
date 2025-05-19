/*
  Warnings:

  - Made the column `body` on table `NewsContent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `NewsContent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NewsContent" ALTER COLUMN "body" SET NOT NULL,
ALTER COLUMN "body" SET DEFAULT '',
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageUrl" SET DEFAULT '';
