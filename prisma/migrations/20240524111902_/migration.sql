/*
  Warnings:

  - You are about to drop the column `timestamp` on the `CardVisit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CardVisit" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
