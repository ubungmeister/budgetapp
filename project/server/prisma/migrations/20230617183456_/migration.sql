/*
  Warnings:

  - You are about to drop the `poketmoney` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `poketmoney` DROP FOREIGN KEY `PoketMoney_userId_fkey`;

-- DropTable
DROP TABLE `poketmoney`;

-- CreateTable
CREATE TABLE `PocketMoney` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `month` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PocketMoney` ADD CONSTRAINT `PocketMoney_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
