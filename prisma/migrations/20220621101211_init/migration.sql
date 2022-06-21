-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `promotion_id` INTEGER NOT NULL,

    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Promotion_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(255) NOT NULL,
    `user` VARCHAR(255) NOT NULL,
    `student_id` INTEGER NOT NULL,

    UNIQUE INDEX `Instance_student_id_key`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Database` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(255) NOT NULL,
    `user` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `instance_id` INTEGER NOT NULL,

    UNIQUE INDEX `Database_instance_id_key`(`instance_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `questionId` INTEGER NOT NULL,
    `challenge_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `command_to_exec` VARCHAR(191) NOT NULL,
    `expected_output` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `challenge_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChallengeToPromotion` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ChallengeToPromotion_AB_unique`(`A`, `B`),
    INDEX `_ChallengeToPromotion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_promotion_id_fkey` FOREIGN KEY (`promotion_id`) REFERENCES `Promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instance` ADD CONSTRAINT `Instance_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Database` ADD CONSTRAINT `Database_instance_id_fkey` FOREIGN KEY (`instance_id`) REFERENCES `Instance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChallengeToPromotion` ADD CONSTRAINT `_ChallengeToPromotion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Challenge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChallengeToPromotion` ADD CONSTRAINT `_ChallengeToPromotion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `Promotion` (name) VALUES ('MT4 2021-2022');