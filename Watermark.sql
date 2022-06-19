CREATE TABLE `Users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `defaultWatermark` varchar(1000),
  `logInMethod` ENUM ('facebook') NOT NULL,
  `profilePicture` varchar(1000),
  `registrationDate` date NOT NULL,
  `subscrption` date COMMENT 'This indicates the date until user can use the watermark',
  `email` varchar(256) NOT NULL
);

CREATE TABLE `RefreshTokens` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'adasdas',
  `browser` NVARCHAR(256),
  `country` NVARCHAR(256),
  `device` NVARCHAR(256) COMMENT 'For instance, Windows10 , Linux, etc...',
  `deviceVersion` NVARCHAR(256),
  `ip` NVARCHAR(256),
  `loginDate` date NOT NULL,
  `refreshToken` NVARCHAR(256) NOT NULL,
  `userId` INT NOT NULL
);

CREATE TABLE `Albums` (
  `id` varchar(256) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `creationDate` date NOT NULL,
  `customerId` int COMMENT 'Indicates the \'customer\' which was selled the pictures. This customer can be not registered on the system'
);

CREATE TABLE `AlbumsEvidence` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `goFileId` varchar(65000) NOT NULL,
  `albumsId` varchar(256) NOT NULL
);

CREATE TABLE `Media` (
  `id` varchar(256) NOT NULL,
  `albumsId` varchar(256) NOT NULL COMMENT 'From all the images uploaded, indicates the \'album\' which belongs',
  `uuid` varchar(256) NOT NULL COMMENT 'Indicates the id put on the picture for the waterkmar'
);

CREATE TABLE `Customers` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `user` int NOT NULL
);

CREATE TABLE `CustomerContact` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `contact` varchar(65000) NOT NULL COMMENT 'Value of the contact, can be a phone number, email, facebook link, etc. It\'s up of the user to decide the contact form of that customer',
  `customersId` int NOT NULL COMMENT 'Data which belongs that contact'
);

ALTER TABLE `RefreshTokens` COMMENT = 'This table it\'s necessary to create the login system. You can avoid 
* browser
* country
* device
* deviceVersion
* ip

That propertys are optional, but if you add them, the system will be able to show the user
the session that he have done. This can be helpful when the system detect a ip login different
from the usual and warn the user about that login info. ';

ALTER TABLE `RefreshTokens` ADD FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

ALTER TABLE `Albums` ADD FOREIGN KEY (`id`) REFERENCES `Media` (`albumsId`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `Albums` (`userId`);

ALTER TABLE `Customers` ADD FOREIGN KEY (`id`) REFERENCES `Albums` (`customerId`);

ALTER TABLE `Customers` ADD FOREIGN KEY (`id`) REFERENCES `CustomerContact` (`customersId`);

ALTER TABLE `Albums` ADD FOREIGN KEY (`id`) REFERENCES `AlbumsEvidence` (`id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `Customers` (`user`);
