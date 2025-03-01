/*
  Warnings:

  - Added the required column `toUserName` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "toUserName" TEXT NOT NULL;
