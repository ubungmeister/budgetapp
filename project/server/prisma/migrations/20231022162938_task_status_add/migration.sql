-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'ON_REVIEW', 'APPROVED', 'DECLINED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING';
