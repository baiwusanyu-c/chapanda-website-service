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
-- Table structure for table `operation_center`
--

DROP TABLE IF EXISTS `operation_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation_center` (
  `id` varchar(36) NOT NULL COMMENT '主键id',
  `name` varchar(50) NOT NULL COMMENT '营运中心名称',
  `address` varchar(200) NOT NULL COMMENT '营运中心地址',
  `type` varchar(50) NOT NULL COMMENT '营运中心类别',
  `website` varchar(50) DEFAULT NULL COMMENT '营运中心网站',
  `supervisionPhone` varchar(50) DEFAULT NULL COMMENT '监督电话',
  `email` varchar(50) DEFAULT NULL COMMENT '营运中心邮箱',
  `networkSecurity` varchar(50) DEFAULT NULL COMMENT '营运中心技术支持',
  `franchiseHotline` varchar(50) DEFAULT NULL COMMENT '招商热线',
  `customerServiceHotline` varchar(50) DEFAULT NULL COMMENT '客户服务热线',
  `reportingMobile` varchar(50) DEFAULT NULL COMMENT '举报电话',
  `weChat` varchar(50) DEFAULT NULL COMMENT '微信',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `nameEn` varchar(50) NOT NULL COMMENT '营运中心英文名称',
  `addressEn` varchar(200) NOT NULL COMMENT '营运中心英文地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation_center`
--

LOCK TABLES `operation_center` WRITE;
/*!40000 ALTER TABLE `operation_center` DISABLE KEYS */;
INSERT INTO `operation_center` VALUES ('06b8e0ae-f008-4aaf-b167-23da5c3f25af','湖北营运中心','武汉市武昌区烟霞路万达尊B座1108','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:09.209068','2025-05-16 08:16:09.209068','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('0970c5e6-6976-4f5d-b9fb-1db21f7b206c','山东营运中心','济南市历下区经十路10690号A栋建邦数字中心5层','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:41.013429','2025-05-16 08:17:41.013429','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('0d470078-7422-42cd-bd0c-4c8d4f3c3a23','江西营运中心','江西省南昌市红谷滩新区汉港凯旋22楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:49.766631','2025-05-16 08:17:49.766631','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('1b95bbbf-4d93-4128-ae42-196041ba90b2','福建营运中心','福州市台江区曙光路118号宇洋中央金座23楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:15.398497','2025-05-16 08:16:15.398497','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('307615e9-6858-4af3-bd24-1ffb0c1f0fe0','江苏营运中心','南京市雨花台区安德门大街34号2号楼311-326室','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:18.247785','2025-05-16 08:17:18.247785','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('414abc9b-e36e-45b3-9757-03430cb57480','广西营运中心','南宁市青秀区民族大道136-1号华润大厦A座2408','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:59.499527','2025-05-16 08:17:59.499527','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('4b00cf65-c701-4b7c-8cba-5f704aa5a82e','四川营运中心','成都市武侯区名都路777号嘉尔金融科技中心','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:15:55.462725','2025-05-16 08:15:55.462725','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('6065569e-c324-4f8c-905c-3786c40d74f9','北京营运中心','北京市大兴区西红门兴创国际C座703-707','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:28.535051','2025-05-16 08:17:28.535051','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('6879d2e2-a214-4d4f-b1b9-b03d15268fa7','成都总部','成都市武侯区名都路777号嘉尔金融科技中心','1','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:15:18.519614','2025-05-16 08:15:18.519614','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('75d0e989-799e-4287-a826-3ff2bcd0eae1','浙江营运中心','杭州市萧山区奥体万科中心B座15楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:02.669145','2025-05-16 08:16:02.669145','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('7c67c385-3fc5-40fb-925f-25c8d92563e6','广东营运中心','广东省广州市花城大道18号建滔广场26楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:28.702560','2025-05-16 08:16:28.702560','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('96ca0868-3c48-4dbf-835f-7327b0d878b3','河南营运中心','郑州市郑东新区金水东路80号2号楼3单元21层','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:17:11.534920','2025-05-16 08:17:11.534920','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('b3a95f88-51ba-400f-afe8-35215f7a9480','重庆营运中心','重庆市渝中区解放碑平安国际金融中心17楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:58.341472','2025-05-16 08:16:58.341472','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('b42a7108-5d65-4628-a764-3803dff36db7','湖南营运中心','湖南省长沙市开福区万达广场c3-3308','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:47.790663','2025-05-16 08:16:47.790663','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('b5313c70-cafe-49d5-8fee-22c156615e59','上海营运中心','上海市普陀区武宁路501号鸿运大厦4楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:16:22.089505','2025-05-16 08:16:22.089505','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('b65b3df5-e11a-44e5-943a-0e527d751951','安徽营运中心','合肥市庐阳区三孝口街道金寨路德必庐州wehome','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:18:16.612268','2025-05-16 08:18:16.612268','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('dda6da74-0c27-421b-ba82-a66e26d04dad','陕西营运中心','西安市未央区凤城八路西北国金中心E座11楼','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:18:31.689122','2025-05-16 08:18:31.689122','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu'),('ee825aaa-dd57-4881-ba98-3bf0f2b7b965','云南营运中心','昆明市盘龙区东风东路建业商业中心A座20楼2011号','2','www.pandaTea.com','(028)65786362','baiwusanyu@xxxx.com','security@xxxx.com','4000-515-32568','4000-287-7401','1850287xxxx','黑暗茬白稻','2025-05-16 08:18:24.423970','2025-05-16 08:18:24.423970','Chengdu headquarters','Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu');
/*!40000 ALTER TABLE `operation_center` ENABLE KEYS */;
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
