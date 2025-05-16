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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` varchar(36) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '菜单名称',
  `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
  `path` varchar(100) NOT NULL COMMENT '菜单路径',
  `parentId` varchar(255) DEFAULT NULL COMMENT '父级菜单id',
  `order` int NOT NULL DEFAULT '0' COMMENT '排序权重',
  `level` int NOT NULL DEFAULT '0' COMMENT '层级',
  `nameEn` varchar(50) NOT NULL COMMENT '菜单名称(英文)',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `FK_23ac1b81a7bfb85b14e86bd23a5` (`parentId`),
  CONSTRAINT `FK_23ac1b81a7bfb85b14e86bd23a5` FOREIGN KEY (`parentId`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES ('00bc5196-309e-11f0-93cf-72575ba93407','产品展示','icon','/product',NULL,3,1,'Menu','2025-05-14 08:32:42.379901','2025-05-14 08:32:42.379901'),('09b78546-309f-11f0-93cf-72575ba93407','投资费用','icon','/franchise#3','32cb4a6f-309e-11f0-93cf-72575ba93407',2,2,'Fee','2025-05-14 08:40:06.944803','2025-05-14 08:40:06.944803'),('0f7e52c6-309e-11f0-93cf-72575ba93407','新闻动态','icon','/news',NULL,4,1,'Media','2025-05-14 08:33:07.139990','2025-05-14 08:33:07.139990'),('1c1b4bc0-309e-11f0-93cf-72575ba93407','门店分布','icon','/shop',NULL,5,1,'stores','2025-05-14 08:33:28.301267','2025-05-14 08:33:28.301267'),('25b188ba-309f-11f0-93cf-72575ba93407','加盟申请','icon','/franchise#4','32cb4a6f-309e-11f0-93cf-72575ba93407',3,2,'Aplication','2025-05-14 08:40:53.881603','2025-05-14 08:40:53.881603'),('32cb4a6f-309e-11f0-93cf-72575ba93407','招商加盟','icon','/franchise',NULL,6,1,'Franchise','2025-05-14 08:34:06.364355','2025-05-14 08:34:06.364355'),('4f6ac226-309e-11f0-93cf-72575ba93407','投资者关系','icon','/investor',NULL,7,1,'Investor Relations','2025-05-14 08:34:54.385555','2025-05-14 08:34:54.385555'),('5d8b0bb8-309e-11f0-93cf-72575ba93407','联系我们','icon','/contact',NULL,8,1,'Contact','2025-05-14 08:35:18.085324','2025-05-14 08:35:18.085324'),('5f75c000-309f-11f0-93cf-72575ba93407','投关首页','icon','/investor#4','4f6ac226-309e-11f0-93cf-72575ba93407',1,2,'IR Home','2025-05-14 08:42:30.798344','2025-05-14 08:42:30.798344'),('712fed28-309f-11f0-93cf-72575ba93407','招股文件','icon','/investor/listing-docs','4f6ac226-309e-11f0-93cf-72575ba93407',2,2,'Listing Documents','2025-05-14 08:43:00.539784','2025-05-14 08:43:00.539784'),('7f22b970-309f-11f0-93cf-72575ba93407','业绩报告','icon','/investor/financial-reports','4f6ac226-309e-11f0-93cf-72575ba93407',3,2,'Financial Reports','2025-05-14 08:43:23.940724','2025-05-14 08:43:23.940724'),('921073ca-309f-11f0-93cf-72575ba93407','公告及通函','icon','/investor/announcements-notices','4f6ac226-309e-11f0-93cf-72575ba93407',4,2,'Announcements & Notices','2025-05-14 08:43:55.697598','2025-05-14 08:43:55.697598'),('93f7a6c7-309e-11f0-93cf-72575ba93407','形象展示','icon','/about#1','e4d47f7a-309d-11f0-93cf-72575ba93407',1,2,'Image Display','2025-05-14 08:36:49.393843','2025-05-14 08:36:49.393843'),('a1ca1602-309f-11f0-93cf-72575ba93407','企业管治','icon','/investor/corporate-governance','4f6ac226-309e-11f0-93cf-72575ba93407',5,2,'Corporate Governance','2025-05-14 08:44:22.080057','2025-05-14 08:44:22.080057'),('a982f4c6-309e-11f0-93cf-72575ba93407','品牌介绍','icon','/about#2','e4d47f7a-309d-11f0-93cf-72575ba93407',2,2,'Brand Introduction','2025-05-14 08:37:25.538945','2025-05-14 08:37:25.538945'),('aed9c786-309d-11f0-93cf-72575ba93407','网站首页','icon','/home',NULL,1,1,'Home','2025-05-14 08:30:24.999752','2025-05-14 08:30:24.999752'),('b63f0bcb-309e-11f0-93cf-72575ba93407','荣誉篇章','icon','/about#3','e4d47f7a-309d-11f0-93cf-72575ba93407',3,2,'Honor Chapter','2025-05-14 08:37:46.904285','2025-05-14 08:37:46.904285'),('cb6b13a4-309e-11f0-93cf-72575ba93407','加盟优势','icon','/franchise#1','e4d47f7a-309d-11f0-93cf-72575ba93407',4,2,'advantage','2025-05-14 08:38:22.425652','2025-05-14 08:38:22.425652'),('e4d47f7a-309d-11f0-93cf-72575ba93407','关于我们','icon','/about',NULL,2,1,'About us','2025-05-14 08:31:55.562299','2025-05-14 08:31:55.562299'),('fd72c2d4-309e-11f0-93cf-72575ba93407','加盟流程','icon','/franchise#2','32cb4a6f-309e-11f0-93cf-72575ba93407',1,2,'Process','2025-05-14 08:39:46.361425','2025-05-14 08:39:46.361425');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
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
