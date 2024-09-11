/*
  Warnings:

  - You are about to alter the column `discount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `totalValue` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalValue" DROP NOT NULL,
ALTER COLUMN "totalValue" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ordersId" TEXT;

-- DropTable
DROP TABLE "OrderProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
