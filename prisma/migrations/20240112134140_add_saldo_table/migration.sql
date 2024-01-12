-- CreateTable
CREATE TABLE "Saldo" (
    "id" UUID NOT NULL,
    "saldo" MONEY NOT NULL,
    "userId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Saldo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saldo_id_key" ON "Saldo"("id");

-- AddForeignKey
ALTER TABLE "Saldo" ADD CONSTRAINT "Saldo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saldo" ADD CONSTRAINT "Saldo_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
