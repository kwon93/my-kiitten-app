-- AlterTable
ALTER TABLE "members" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "my_pet_info" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "species" VARCHAR(20) NOT NULL,
    "breed" VARCHAR(20),
    "birthDate" TIMESTAMP(3),
    "weight" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "my_pet_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "my_pet_info_memberId_deletedAt_idx" ON "my_pet_info"("memberId", "deletedAt");

-- CreateIndex
CREATE INDEX "members_deleted_at_idx" ON "members"("deleted_at");

-- AddForeignKey
ALTER TABLE "my_pet_info" ADD CONSTRAINT "my_pet_info_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
