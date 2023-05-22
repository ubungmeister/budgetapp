/*
  Warnings:

  - You are about to drop the column `familyId` on the `user` table. All the data in the column will be lost.
  - Added the required column `familyID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_familyId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `familyId`,
    ADD COLUMN `familyID` VARCHAR(191) NOT NULL;
