-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(15) NULL,
    `address` TEXT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderdetail` (
    `orderdetail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `product_id` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,

    INDEX `order_id`(`order_id`),
    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`orderdetail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NULL,
    `order_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `order_status` ENUM('processing', 'completed', 'cancelled') NULL DEFAULT 'processing',

    INDEX `customer_id`(`customer_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NULL,
    `payment_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `payment_status` ENUM('pending', 'completed', 'failed') NULL DEFAULT 'pending',
    `amount` DECIMAL(10, 2) NOT NULL,

    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `stock_quantity` INTEGER NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orderdetail` ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderdetail` ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
