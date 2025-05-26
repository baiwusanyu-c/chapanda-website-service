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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` varchar(36) NOT NULL COMMENT '主键id',
  `detail` varchar(500) NOT NULL COMMENT '新闻详情',
  `link` varchar(500) NOT NULL COMMENT '新闻链接',
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '新闻日期',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `detailEn` varchar(500) NOT NULL COMMENT '新闻英文详情',
  `title` varchar(200) NOT NULL COMMENT '新闻标题',
  `titleEn` varchar(200) NOT NULL COMMENT '新闻英文标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES ('207840ac-870d-4cbe-968a-7d77aaeda9fc','台风「海燕」过境后，蓝天救援队在福建沿海开展灾后清理工作，累计清理道路障碍物80余吨。','https://github.com/relief-news/002','2022-07-29 22:45:32.120000','2025-05-16 08:07:51.177286','2025-05-16 08:07:51.177286','After Typhoon Haiyan, Blue Sky Rescue Team cleared over 80 tons of debris from coastal roads in Fujian province.','福建沿海台风灾后重建进行时','Post-Typhoon Reconstruction in Fujian Coast'),('221030d0-71a1-454c-87b5-89422458bcf5','中国扶贫基金会向云南旱区捐赠50台净水设备，解决3万村民饮用水安全问题。','https://github.com/relief-news/004','2021-09-19 01:30:09.234000','2025-05-16 08:07:38.187610','2025-05-16 08:07:38.187610','50 water purification systems donated by China Poverty Alleviation Foundation provide safe drinking water for 30,000 villagers in Yunnan drought area.','云南旱区饮水安全工程实施','Drinking Water Project in Yunnan Drought Region'),('27e8f4a1-d27e-4750-a4e3-ea5620e20aed','中国志愿者协会组织心理援助团队进驻泸定地震灾区，开展创伤后心理疏导工作。','https://github.com/relief-news/009','2023-09-07 18:33:48.712000','2025-05-16 08:07:07.781795','2025-05-16 08:07:07.781795','Post-trauma counseling teams from China Volunteer Association deployed in Luding earthquake zone.','泸定地震心理援助项目启动','Psychological Aid Project in Luding Quake Area'),('470b5a9c-9295-4f77-8533-e8a2377b0256','武汉医疗志愿者团队携带5吨急救药品奔赴河南洪涝灾区，开展巡回诊疗服务。','https://github.com/relief-news/006','2023-08-05 04:15:38.901000','2025-05-16 08:07:25.471248','2025-05-16 08:07:25.471248','Wuhan medical volunteers with 5 tons of emergency medicines initiated mobile clinics in Henan flood-stricken areas.','河南洪涝灾区医疗支援行动','Medical Aid for Henan Flood Victims'),('50232127-7388-4817-8478-0cabee81a9bf','近日，四川省凉山州发生山体滑坡，红十字会联合当地志愿者连夜转移受灾群众，已搭建临时安置点12处。','https://github.com/relief-news/001','2023-03-14 17:23:17.451000','2025-05-16 08:07:56.261755','2025-05-16 08:07:56.261755','Recent landslides in Liangshan, Sichuan prompted Red Cross and local volunteers to evacuate affected residents overnight, establishing 12 temporary shelters.','凉山山体滑坡紧急救援行动启动','Emergency Rescue Launched for Liangshan Landslide'),('aaf7b5a7-b741-4599-b3c1-5a3bb014a005','青海玉树雪灾救援通道打通，首批30吨饲草料已运抵受灾牧区，保障牲畜越冬。','https://github.com/relief-news/005','2020-12-22 19:07:43.678000','2025-05-16 08:07:32.677447','2025-05-16 08:07:32.677447','30 tons of forage delivered to Yushu herding areas in Qinghai after snow disaster relief通道打通 cleared.','青海玉树雪灾饲草紧急输送','Emergency Forage Delivery to Yushu Snow Disaster Zone'),('e1a27654-195b-4d6f-884d-b8355c89d1e5','广西洪灾地区启用无人机巡查系统，实时监测地质灾害隐患点，保障救援人员安全。','https://github.com/relief-news/008','2024-04-12 21:27:16.345000','2025-05-16 08:07:13.930082','2025-05-16 08:07:13.930082','Drone surveillance system deployed in Guangxi flood areas for real-time geological hazard monitoring.','广西洪灾无人机监测系统启用','Drone Monitoring Activated in Guangxi Floods'),('f7499049-0dfa-4974-9750-b718eaa49155','内蒙古沙尘暴灾害应急响应启动，发放10万只防护口罩及2000套护目镜至受影响牧区。','https://github.com/relief-news/010','2021-05-21 08:00:00.000000','2025-05-16 08:06:57.160832','2025-05-16 08:06:57.160832','100,000 masks and 2,000 goggles distributed to Inner Mongolia herders affected by sandstorms.','内蒙古沙尘暴防护物资发放','Protective Gear Distributed for Inner Mongolia Sandstorms'),('f8aaee09-ef62-4195-8c11-b45c33d85142','甘肃地震灾区首批越冬物资抵达，包含2000件羽绒服及300顶保暖帐篷，保障群众温暖过冬。','https://github.com/relief-news/003','2024-01-05 14:12:55.789000','2025-05-16 08:07:44.377453','2025-05-16 08:07:44.377453','First batch of winter supplies including 2000 down jackets and 300 insulated tents arrived in Gansu earthquake zone.','甘肃地震灾区越冬物资紧急调运','Winter Supplies Deployed to Gansu Quake Zone');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-26 11:12:08
