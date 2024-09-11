/*
  Warnings:

  - You are about to drop the column `ordersId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_ordersId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ordersId";

-- CreateTable
CREATE TABLE "_OrderProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderProducts_AB_unique" ON "_OrderProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderProducts_B_index" ON "_OrderProducts"("B");

-- AddForeignKey
ALTER TABLE "_OrderProducts" ADD CONSTRAINT "_OrderProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderProducts" ADD CONSTRAINT "_OrderProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
