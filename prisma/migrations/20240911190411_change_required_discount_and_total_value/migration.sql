/*
  Warnings:

  - Made the column `discount` on table `Orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalValue` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "totalValue" SET NOT NULL;
