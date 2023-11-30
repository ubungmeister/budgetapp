-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('PENDING', 'COMPLETED', 'CLOSED');

-- AlterTable
ALTER TABLE "SavingGoal" ADD COLUMN     "status" "GoalStatus" DEFAULT 'PENDING';
