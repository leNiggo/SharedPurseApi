/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `Saldo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Saldo_userId_groupId_key" ON "Saldo"("userId", "groupId");
