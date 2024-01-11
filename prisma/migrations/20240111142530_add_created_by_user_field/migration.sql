/*
  Warnings:

  - Added the required column `createdByUsedId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "createdByUsedId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createdByUsedId_fkey" FOREIGN KEY ("createdByUsedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
