/*
 Navicat Premium Dump SQL

 Source Server         : chpanda
 Source Server Type    : MySQL
 Source Server Version : 90200 (9.2.0)
 Source Host           : localhost:3306
 Source Schema         : chapanda-website-database

 Target Server Type    : MySQL
 Target Server Version : 90200 (9.2.0)
 File Encoding         : 65001

 Date: 19/05/2025 22:54:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for operation_center
-- ----------------------------
DROP TABLE IF EXISTS `operation_center`;
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

-- ----------------------------
-- Records of operation_center
-- ----------------------------
BEGIN;
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('06b8e0ae-f008-4aaf-b167-23da5c3f25af', '湖北营运中心', '武汉市武昌区烟霞路万达尊B座1108', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:09.209068', '2025-05-19 14:46:06.954238', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('0970c5e6-6976-4f5d-b9fb-1db21f7b206c', '山东营运中心', '济南市历下区经十路10690号A栋建邦数字中心5层', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:41.013429', '2025-05-19 14:46:09.007243', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('0d470078-7422-42cd-bd0c-4c8d4f3c3a23', '江西营运中心', '江西省南昌市红谷滩新区汉港凯旋22楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:49.766631', '2025-05-19 14:46:10.832681', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('1b95bbbf-4d93-4128-ae42-196041ba90b2', '福建营运中心', '福州市台江区曙光路118号宇洋中央金座23楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:15.398497', '2025-05-19 14:46:12.783670', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('307615e9-6858-4af3-bd24-1ffb0c1f0fe0', '江苏营运中心', '南京市雨花台区安德门大街34号2号楼311-326室', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:18.247785', '2025-05-19 14:46:14.657140', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('414abc9b-e36e-45b3-9757-03430cb57480', '广西营运中心', '南宁市青秀区民族大道136-1号华润大厦A座2408', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:59.499527', '2025-05-19 14:46:16.254742', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('4b00cf65-c701-4b7c-8cba-5f704aa5a82e', '四川营运中心', '成都市武侯区名都路777号嘉尔金融科技中心', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:15:55.462725', '2025-05-19 14:46:17.750406', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('6065569e-c324-4f8c-905c-3786c40d74f9', '北京营运中心', '北京市大兴区西红门兴创国际C座703-707', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:28.535051', '2025-05-19 14:46:19.482017', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('6879d2e2-a214-4d4f-b1b9-b03d15268fa7', '成都总部', '成都市武侯区名都路777号嘉尔金融科技中心', '1', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:15:18.519614', '2025-05-19 14:52:15.767313', 'Headquarters', 'Jiaer Financial Technology Center, No. 777, Mingdu Road, Wuhou District, Chengdu');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('75d0e989-799e-4287-a826-3ff2bcd0eae1', '浙江营运中心', '杭州市萧山区奥体万科中心B座15楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:02.669145', '2025-05-19 14:46:23.709619', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('7c67c385-3fc5-40fb-925f-25c8d92563e6', '广东营运中心', '广东省广州市花城大道18号建滔广场26楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:28.702560', '2025-05-19 14:46:25.692085', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('96ca0868-3c48-4dbf-835f-7327b0d878b3', '河南营运中心', '郑州市郑东新区金水东路80号2号楼3单元21层', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:17:11.534920', '2025-05-19 14:46:27.589762', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('b3a95f88-51ba-400f-afe8-35215f7a9480', '重庆营运中心', '重庆市渝中区解放碑平安国际金融中心17楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:58.341472', '2025-05-19 14:46:51.740558', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('b42a7108-5d65-4628-a764-3803dff36db7', '湖南营运中心', '湖南省长沙市开福区万达广场c3-3308', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:47.790663', '2025-05-19 14:46:53.872700', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('b5313c70-cafe-49d5-8fee-22c156615e59', '上海营运中心', '上海市普陀区武宁路501号鸿运大厦4楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:16:22.089505', '2025-05-19 14:46:53.878932', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('b65b3df5-e11a-44e5-943a-0e527d751951', '安徽营运中心', '合肥市庐阳区三孝口街道金寨路德必庐州wehome', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:18:16.612268', '2025-05-19 14:46:53.883008', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('dda6da74-0c27-421b-ba82-a66e26d04dad', '陕西营运中心', '西安市未央区凤城八路西北国金中心E座11楼', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:18:31.689122', '2025-05-19 14:46:53.885319', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
INSERT INTO `operation_center` (`id`, `name`, `address`, `type`, `website`, `supervisionPhone`, `email`, `networkSecurity`, `franchiseHotline`, `customerServiceHotline`, `reportingMobile`, `weChat`, `createTime`, `updateTime`, `nameEn`, `addressEn`) VALUES ('ee825aaa-dd57-4881-ba98-3bf0f2b7b965', '云南营运中心', '昆明市盘龙区东风东路建业商业中心A座20楼2011号', '2', 'www.pandaTea.com', '(028)65786362', 'baiwusanyu@xxxx.com', 'security@xxxx.com', '4000-515-32568', '4000-287-7401', '1850287xxxx', '黑暗茬白稻', '2025-05-16 08:18:24.423970', '2025-05-19 14:46:53.887219', 'Chengdu headquarters', '4th Floor, Hongyun Building, 501 Wuning Road, Putuo District, Shanghai');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
