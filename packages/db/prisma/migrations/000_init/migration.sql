-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Question" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "stem" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "explanationDeep" TEXT,
    "lawUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Choice" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReviewLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "ef" DOUBLE PRECISION NOT NULL,
    "interval" INTEGER NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserStat" (
    "userId" TEXT NOT NULL,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "todaySolved" INTEGER NOT NULL DEFAULT 0,
    "correctRate" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "UserStat_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "public"."Choice" ADD CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

