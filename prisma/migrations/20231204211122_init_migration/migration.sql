-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "amount" MONEY NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,
    "requiredByUserId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentRelation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "paymentId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRelation_id_key" ON "PaymentRelation"("id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_requiredByUserId_fkey" FOREIGN KEY ("requiredByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRelation" ADD CONSTRAINT "PaymentRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRelation" ADD CONSTRAINT "PaymentRelation_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
