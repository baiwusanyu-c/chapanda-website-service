-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: chapanda-website-database
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `franchise`
--

DROP TABLE IF EXISTS `franchise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `franchise` (
  `id` varchar(36) NOT NULL COMMENT '主键id',
  `order` int NOT NULL COMMENT '顺序',
  `title` varchar(50) NOT NULL COMMENT '加盟步骤标题',
  `titleEn` varchar(50) NOT NULL COMMENT '加盟步骤英文标题',
  `detail` varchar(500) NOT NULL COMMENT '加盟步骤详情',
  `detailEn` varchar(500) NOT NULL COMMENT '加盟步骤英文详情',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `franchise`
--

LOCK TABLES `franchise` WRITE;
/*!40000 ALTER TABLE `franchise` DISABLE KEYS */;
INSERT INTO `franchise` VALUES ('51826784-0a68-4e4b-903a-2fcf876a1d83',4,'店铺审核','Store evaluation','总部审核客户提报的商铺，审核时间3-5个工作日','The headquarters reviews the stores submitted by customers, and the audit time is 3-5 working days','2025-05-16 08:25:51.258245','2025-05-16 08:31:26.607995'),('6ebf927f-ef2d-42c7-bd36-405871a5bc2c',8,'装修验收、首批备货','Decoration acceptance ＆ First stock','店铺验收合格后,采购第一批原材料','After the store acceptance, purchase the first batch of raw materials','2025-05-16 08:27:46.486227','2025-05-16 08:31:26.653355'),('82da1bdf-7828-473a-87b8-8e556c7195b3',9,'开业筹备','Opening Preparation','办理双证时给予指导，策划新店开业营销方案','Provide guidance during the application process for dual certificates and plan the marketing strategy for the new store\'s opening','2025-05-16 08:28:27.369907','2025-05-16 08:28:27.369907'),('90e47d08-0611-464f-807f-bbc622197911',2,'资质审核','Qualification evaluation','总部审核客户提交的加盟申请表，预约时间面试，7个工作日','The headquarters reviews the application form submitted by the customer, and makes an appointment for an interview, 7 working days','2025-05-16 08:24:59.065979','2025-05-16 08:31:26.703355'),('95b2ba37-717c-4fb4-8963-8c44564e25cf',5,'签订合同','Contract signing','店铺通过审核，签订《加盟合同》','the store passed the audit and signed the franchise Contract.','2025-05-16 08:26:19.886198','2025-05-16 08:31:26.753345'),('b404634a-cb2a-4c05-bae3-62e2da59e0a8',6,'店铺装修、人员培训','Decoration ＆Training','10个工作日内提供装修方案,同时进行为期25天培训','provide decoration plan within 10 working days, and carry out training for 25 days','2025-05-16 08:26:46.768096','2025-05-16 08:31:26.803358'),('b4ee17a5-9cf8-4971-9172-57ee6b5b61bb',3,'签订意向合同','Signing the intent contract','通过资质审核，签订意向加盟合同','Signing a contract of intent to join after passing the qualification review','2025-05-16 08:25:25.313341','2025-05-16 08:31:26.863595'),('e3a5c015-fbb6-49af-bf29-5d731a6a3b65',1,'加盟申请','Submit an application','线上填写《茬白稻-加盟申请表》，审核结果2个工作日','Fill in the \"pandaTea - Franchise Application Form\" online, review the results within 2 working days','2025-05-16 08:24:33.450324','2025-05-16 08:31:26.913284'),('ef084af5-469a-40ab-b55a-596fa7eb79e3',7,'设备采购','Equipment purchase','提供完整的设备采购方案，20个工作日','Provide complete equipment purchase plan, 20 working days','2025-05-16 08:27:20.959691','2025-05-16 08:31:26.963491'),('f0240c9a-7649-4c65-890a-46fc352c37b4',10,'后期辅导','Post coaching','提供店面管理指导、新品培训等','Provide store management guidance, new product training, etc','2025-05-16 08:28:48.218194','2025-05-16 08:28:48.218194');
/*!40000 ALTER TABLE `franchise` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16 16:51:29
