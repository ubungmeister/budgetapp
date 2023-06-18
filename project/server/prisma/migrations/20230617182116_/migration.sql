/*
  Warnings:

  - You are about to drop the column `end_date` on the `poketmoney` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `poketmoney` table. All the data in the column will be lost.
  - Added the required column `month` to the `PoketMoney` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poketmoney` DROP COLUMN `end_date`,
    DROP COLUMN `start_date`,
    ADD COLUMN `month` DATETIME(3) NOT NULL;
