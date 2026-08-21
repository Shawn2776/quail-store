/*
  Warnings:

  - You are about to drop the column `hatchRate` on the `QaEntry` table. All the data in the column will be lost.
  - You are about to drop the column `mortality` on the `QaEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QaEntry" DROP COLUMN "hatchRate",
DROP COLUMN "mortality",
ADD COLUMN     "chicksDied" INTEGER,
ADD COLUMN     "eggsHatched" INTEGER,
ADD COLUMN     "eggsSet" INTEGER;
