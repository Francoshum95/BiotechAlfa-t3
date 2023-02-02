-- CreateTable
CREATE TABLE "drug" (
    "drug_id" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ(0),

    CONSTRAINT "drug_pkey" PRIMARY KEY ("drug_id")
);

-- CreateTable
CREATE TABLE "drug_indicaiton_drug" (
    "drug_indication_drug_id" SERIAL NOT NULL,
    "drug_id" SERIAL NOT NULL,
    "drug_indication_id" SERIAL NOT NULL,
    "drug_phase_id" SERIAL NOT NULL,

    CONSTRAINT "drug_indicaiton_drug_pkey" PRIMARY KEY ("drug_indication_drug_id")
);

-- CreateTable
CREATE TABLE "drug_indication" (
    "drug_indication_id" SERIAL NOT NULL,
    "indication" VARCHAR(255) NOT NULL,

    CONSTRAINT "drug_indication_pkey" PRIMARY KEY ("drug_indication_id")
);

-- CreateTable
CREATE TABLE "drug_mechanism" (
    "drug_mechanism_id" SERIAL NOT NULL,
    "mechanism" VARCHAR(255) NOT NULL,

    CONSTRAINT "drug_mechanism_pkey" PRIMARY KEY ("drug_mechanism_id")
);

-- CreateTable
CREATE TABLE "drug_mechanism_drug" (
    "drug_mechanism_drug_id" SERIAL NOT NULL,
    "drug_id" SERIAL NOT NULL,
    "drug_mechanism_id" SERIAL NOT NULL,

    CONSTRAINT "drug_mechanism_drug_pkey" PRIMARY KEY ("drug_mechanism_drug_id")
);

-- CreateTable
CREATE TABLE "drug_name" (
    "drug_name_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "drug_name_pkey" PRIMARY KEY ("drug_name_id")
);

-- CreateTable
CREATE TABLE "drug_name_drug" (
    "drug_name_drug_id" SERIAL NOT NULL,
    "drug_id" SERIAL NOT NULL,
    "drug_name_id" SERIAL NOT NULL,

    CONSTRAINT "drug_name_drug_pkey" PRIMARY KEY ("drug_name_drug_id")
);

-- CreateTable
CREATE TABLE "drug_news" (
    "drug_news_id" SERIAL NOT NULL,
    "news" TEXT NOT NULL,
    "date" VARCHAR(20) NOT NULL,
    "drug_id" SERIAL NOT NULL,

    CONSTRAINT "drug_news_pkey" PRIMARY KEY ("drug_news_id")
);

-- CreateTable
CREATE TABLE "drug_phase" (
    "drug_phase_id" SERIAL NOT NULL,
    "phase" VARCHAR(255) NOT NULL,

    CONSTRAINT "drug_phase_pkey" PRIMARY KEY ("drug_phase_id")
);

-- CreateTable
CREATE TABLE "drug_type" (
    "drug_type_id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    CONSTRAINT "drug_type_pkey" PRIMARY KEY ("drug_type_id")
);

-- CreateTable
CREATE TABLE "drug_type_drug" (
    "drug_type_drug_id" SERIAL NOT NULL,
    "drug_id" SERIAL NOT NULL,
    "drug_type_id" SERIAL NOT NULL,

    CONSTRAINT "drug_ type_drug_pkey" PRIMARY KEY ("drug_type_drug_id")
);

-- CreateTable
CREATE TABLE "equity" (
    "equity_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ticker" VARCHAR(7),
    "equity_info_id" SERIAL NOT NULL,

    CONSTRAINT "equity_pkey" PRIMARY KEY ("equity_id")
);

-- CreateTable
CREATE TABLE "equity_drug" (
    "eqiuty_drug_id" SERIAL NOT NULL,
    "equity_id" SERIAL NOT NULL,
    "drug_id" SERIAL NOT NULL,

    CONSTRAINT "equity_drug_pkey" PRIMARY KEY ("eqiuty_drug_id")
);

-- CreateTable
CREATE TABLE "equity_info" (
    "equity_info_id" SERIAL NOT NULL,
    "website" TEXT,
    "business" TEXT,

    CONSTRAINT "equity_info_pkey" PRIMARY KEY ("equity_info_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMPTZ(0) NOT NULL,
    "update_at" TIMESTAMPTZ(0) NOT NULL,
    "is_verifly" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "watch_list" (
    "watch_list_id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "equity_id" SERIAL NOT NULL,

    CONSTRAINT "watch_list_pkey" PRIMARY KEY ("watch_list_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drug_indication_indication_key" ON "drug_indication"("indication");

-- CreateIndex
CREATE UNIQUE INDEX "drug_mechanism_mechanism_key" ON "drug_mechanism"("mechanism");

-- CreateIndex
CREATE UNIQUE INDEX "drug_name_name_key" ON "drug_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "drug_phase_phase_key" ON "drug_phase"("phase");

-- CreateIndex
CREATE UNIQUE INDEX "drug_type_type_key" ON "drug_type"("type");

-- AddForeignKey
ALTER TABLE "drug_indicaiton_drug" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_indicaiton_drug" ADD CONSTRAINT "drug_indicaiton_id" FOREIGN KEY ("drug_indication_id") REFERENCES "drug_indication"("drug_indication_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_indicaiton_drug" ADD CONSTRAINT "drug_phase_id" FOREIGN KEY ("drug_phase_id") REFERENCES "drug_phase"("drug_phase_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_mechanism_drug" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_mechanism_drug" ADD CONSTRAINT "drug_mechanism_id" FOREIGN KEY ("drug_mechanism_id") REFERENCES "drug_mechanism"("drug_mechanism_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_name_drug" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_name_drug" ADD CONSTRAINT "drug_name_id" FOREIGN KEY ("drug_name_id") REFERENCES "drug_name"("drug_name_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_news" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_type_drug" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drug_type_drug" ADD CONSTRAINT "drug_type_id" FOREIGN KEY ("drug_type_id") REFERENCES "drug_type"("drug_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equity" ADD CONSTRAINT "equity_info_id" FOREIGN KEY ("equity_info_id") REFERENCES "equity_info"("equity_info_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equity_drug" ADD CONSTRAINT "drug_id" FOREIGN KEY ("drug_id") REFERENCES "drug"("drug_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equity_drug" ADD CONSTRAINT "equity_id" FOREIGN KEY ("equity_id") REFERENCES "equity"("equity_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watch_list" ADD CONSTRAINT "equity_id" FOREIGN KEY ("equity_id") REFERENCES "equity"("equity_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watch_list" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
