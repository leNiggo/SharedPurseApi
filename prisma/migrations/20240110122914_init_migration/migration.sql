-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "amount" MONEY NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "createdById" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_unacceptedPayment" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_invited" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_id_key" ON "Group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_unacceptedPayment_AB_unique" ON "_unacceptedPayment"("A", "B");

-- CreateIndex
CREATE INDEX "_unacceptedPayment_B_index" ON "_unacceptedPayment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_invited_AB_unique" ON "_invited"("A", "B");

-- CreateIndex
CREATE INDEX "_invited_B_index" ON "_invited"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_unacceptedPayment" ADD CONSTRAINT "_unacceptedPayment_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_unacceptedPayment" ADD CONSTRAINT "_unacceptedPayment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_invited" ADD CONSTRAINT "_invited_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_invited" ADD CONSTRAINT "_invited_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
