/*
  Warnings:

  - Added the required column `info` to the `Commodity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Commodity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Commodity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Commodity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commodity" ADD COLUMN     "info" VARCHAR(255) NOT NULL,
ADD COLUMN     "price" VARCHAR(255) NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
