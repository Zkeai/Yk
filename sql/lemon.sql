/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50738
Source Host           : localhost:3306
Source Database       : lemon

Target Server Type    : MYSQL
Target Server Version : 50738
File Encoding         : 65001

Date: 2022-11-17 20:41:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userid` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '用户ID',
  `software` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '软件ID',
  `kami` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '卡密',
  `type` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '有效期',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `ip` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT 'ip地址',
  `machine` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '设备码',
  `online` int(11) DEFAULT '1' COMMENT '是否在线',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `validTime` datetime DEFAULT NULL COMMENT '有效期',
  `isDelete` int(11) NOT NULL DEFAULT '0' COMMENT '删除',
  PRIMARY KEY (`id`,`kami`),
  UNIQUE KEY `card_kami_uindex` (`kami`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of card
-- ----------------------------
INSERT INTO `card` VALUES ('1', 'lemon', 'LMyCcMnDifwkGUDsLqTXimolGDpWRSwRmcOaL', 'nullVyPvRxTkWXnzjWGSAjcPTtWCOXwxJmzGsKrP', '1', '0', null, null, '1', '2022-08-17 10:33:25', '2022-08-17 10:33:25', null, '0');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(111) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `content` varchar(520) CHARACTER SET utf8 DEFAULT NULL COMMENT '话术',
  `comGroup` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '话术分组',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `note` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `userid` varchar(256) DEFAULT NULL COMMENT '所属用户',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT NULL,
  `isDelete` int(1) DEFAULT '0',
  `keyWord` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '话术名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='话术';

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '你好\n你好啊\nhello', '术语分组', '0', '话术备注', 'lemon', '2022-08-12 11:58:09', '2022-08-12 12:04:12', '0', '话术1');
INSERT INTO `comments` VALUES ('2', '测试\n测试一下', '许条满共', '0', '话术2', 'lemon', '2022-08-13 15:32:36', null, '0', '话术2');
INSERT INTO `comments` VALUES ('3', 'hello\n你好啊', '小红书私信话术', '0', null, 'lemon', '2022-11-10 15:21:10', null, '0', '小红书私信');

-- ----------------------------
-- Table structure for com_group
-- ----------------------------
DROP TABLE IF EXISTS `com_group`;
CREATE TABLE `com_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `groupName` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '分组名',
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属用户',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `note` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='话术分组';

-- ----------------------------
-- Records of com_group
-- ----------------------------
INSERT INTO `com_group` VALUES ('1', '许条满共', 'lemon', '0', 'dolore deserunt', '2022-08-12 11:28:01', '2022-08-12 11:28:22', '0');
INSERT INTO `com_group` VALUES ('2', '术语分组', 'lemon', '0', '术语分组', '2022-08-12 11:29:47', '2022-08-12 11:29:47', '0');
INSERT INTO `com_group` VALUES ('3', '小红书私信话术', 'lemon', '0', '话术1', '2022-11-10 15:20:38', '2022-11-10 15:20:38', '0');

-- ----------------------------
-- Table structure for devices
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userid` varchar(256) NOT NULL COMMENT '所属用户',
  `uuid` int(11) DEFAULT NULL COMMENT 'websock 需要的后台uuid',
  `deviceModel` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '设备型号',
  `deviceGroup` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '设备分组',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '设备状态',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `isDelete` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除 0正常 1删除',
  `deviceName` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '设备昵称',
  `remark` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '编号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `devices_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of devices
-- ----------------------------
INSERT INTO `devices` VALUES ('1', 'lemon', '1993738334', '352746023870084', '测试分组', '1', '2022-06-27 14:14:12', '0', 'OnePlus', '雷电-1');

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属用户',
  `typeEmail` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '邮箱服务商',
  `fromEmail` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '发送的邮箱账号',
  `password` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '授权码',
  `title` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '邮件标题',
  `toEmail` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '接收邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='邮件配置';

-- ----------------------------
-- Records of email
-- ----------------------------
INSERT INTO `email` VALUES ('1', 'lemon', 'QQ', '95736614@qq.com', 'vrgqoozbmunzbicf', 'LeCloud云控通知', 'saorenzq@gmail.com');

-- ----------------------------
-- Table structure for historylog
-- ----------------------------
DROP TABLE IF EXISTS `historylog`;
CREATE TABLE `historylog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户',
  `ip` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '登录ip',
  `address` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '登录地址',
  `loginTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '登陆时间',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='登录历史';

-- ----------------------------
-- Records of historylog
-- ----------------------------

-- ----------------------------
-- Table structure for hot_update
-- ----------------------------
DROP TABLE IF EXISTS `hot_update`;
CREATE TABLE `hot_update` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(256) DEFAULT NULL,
  `version` varchar(256) DEFAULT NULL,
  `content` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='热更新';

-- ----------------------------
-- Records of hot_update
-- ----------------------------
INSERT INTO `hot_update` VALUES ('1', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/main.js', null, null);

-- ----------------------------
-- Table structure for kew_group
-- ----------------------------
DROP TABLE IF EXISTS `kew_group`;
CREATE TABLE `kew_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '分组名',
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属用户',
  `status` int(11) DEFAULT '0' COMMENT '0 正常 1 锁定',
  `note` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '0 正常 1删除',
  `num` int(11) DEFAULT '0' COMMENT '成员数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of kew_group
-- ----------------------------
INSERT INTO `kew_group` VALUES ('1', '词库1', 'lemon', '0', '词库', '2022-08-12 09:23:16', '2022-08-12 09:23:16', '0', '1');
INSERT INTO `kew_group` VALUES ('2', '术语分组', 'lemon', '0', '术语分组', '2022-08-12 11:26:52', '2022-08-12 11:26:52', '0', '0');

-- ----------------------------
-- Table structure for keyword
-- ----------------------------
DROP TABLE IF EXISTS `keyword`;
CREATE TABLE `keyword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyWord` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '关键词',
  `content` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '回答内容',
  `keyGroup` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '分组',
  `status` int(11) DEFAULT '0' COMMENT '0 正常 1 冻结',
  `note` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '0 正常 1删除',
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of keyword
-- ----------------------------
INSERT INTO `keyword` VALUES ('1', '你好', '你好啊', '词库1', '0', '你好', '2022-08-12 09:23:32', '2022-08-12 09:23:32', '0', 'lemon');

-- ----------------------------
-- Table structure for phone_group
-- ----------------------------
DROP TABLE IF EXISTS `phone_group`;
CREATE TABLE `phone_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '分组名字',
  `userid` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '所属用户',
  `status` int(11) DEFAULT '0' COMMENT '设备状态 0正常 1禁用',
  `note` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_group_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of phone_group
-- ----------------------------
INSERT INTO `phone_group` VALUES ('1', '测试分组', 'lemon', '0', '分组备注', '2022-07-12 19:29:55', '2022-07-12 19:29:55', '0');

-- ----------------------------
-- Table structure for scripts
-- ----------------------------
DROP TABLE IF EXISTS `scripts`;
CREATE TABLE `scripts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `scriptName` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '脚本名字',
  `userid` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '所属管理员',
  `scriptGroup` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '脚本分组',
  `type` int(11) COMMENT '脚本类型 0共享 1管理员 2管理员和代理',
  `url` varchar(1024) CHARACTER SET utf8 DEFAULT NULL COMMENT '脚本链接',
  `version` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '适配版本',
  `note` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '0正常 1删除',
  `status` int(11) DEFAULT '0' COMMENT '0正常  1锁定',
  `whiteList` varchar(255) DEFAULT NULL COMMENT '白名单',
  `courseUrl` varchar(255) DEFAULT NULL COMMENT '教程地址',
  UNIQUE KEY `scripts_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of scripts
-- ----------------------------
INSERT INTO `scripts` VALUES ('1', 'DY养号', 'lemon', '抖音组', '0', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E6%8A%96%E9%9F%B3%E5%85%BB%E5%8F%B7.js', '21.0.0', '养号任务', '2022-06-24 09:58:36', '0', '0', null, null);
INSERT INTO `scripts` VALUES ('2', 'ZH文章评论', 'lemon', '知乎组', '0', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E7%9F%A5%E4%B9%8E%E6%96%87%E7%AB%A0%E8%AF%84%E8%AE%BA.js', '1.0.0', '文章评论', '2022-06-27 12:57:34', '0', '0', null, 'www.baidu.com');
INSERT INTO `scripts` VALUES ('3', 'XHS私信', 'lemon', '小红书组', '0', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%A7%81%E4%BF%A1.js', '1.0', '私信', '2022-11-09 14:24:24', '0', '0', null, null);

-- ----------------------------
-- Table structure for software
-- ----------------------------
DROP TABLE IF EXISTS `software`;
CREATE TABLE `software` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '软件名',
  `userid` varchar(256) DEFAULT NULL COMMENT '用户账号',
  `version` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '版本号',
  `machine` int(11) DEFAULT NULL COMMENT '机器码',
  `status` int(11) DEFAULT '0' COMMENT '状态 0正常 1冻结',
  `notice` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '公告',
  `secret` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '软件秘钥',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `updateUrl` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '更新链接',
  `isDelete` int(11) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`id`,`secret`),
  UNIQUE KEY `software_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of software
-- ----------------------------
INSERT INTO `software` VALUES ('1', '测试', 'lemon', '1.0', '0', '0', '测试一下', 'LMyCcMnDifwkGUDsLqTXimolGDpWRSwRmcOaL', '2022-08-17 10:32:03', '2022-08-17 10:32:03', null, '0');

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `executionModel` varchar(256) CHARACTER SET utf8 NOT NULL COMMENT '执行模式 排队 定时',
  `scriptGroup` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '脚本分组',
  `scriptName` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '脚本名称',
  `devices` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '任务设备数组',
  `taskNote` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '任务备注',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `isDelete` int(11) DEFAULT '0' COMMENT '是否完成/删除',
  `sendTime` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '任务下发时间',
  `uuid` int(16) NOT NULL COMMENT 'uuid',
  `status` int(11) DEFAULT '0' COMMENT '0 待执行 1 执行中 2 成功 3 失败 4 超时 5锁定',
  `msg` varchar(1024) CHARACTER SET utf8 DEFAULT NULL COMMENT '需要返回给设备的参数',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tasks_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES ('7', '定时', '抖音组', 'DY养号', '352746023870084', null, '2022-11-11 13:06:54', '0', '2022-11-11 13:07:00', '1993738334', '0', '{\"type\":\"定时\",\"sendTime\":\"2022-11-11 13:07:00\",\"createTime\":\"2022-11-11 13:06:54\",\"scriptUrl\":\"https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E6%8A%96%E9%9F%B3%E5%85%BB%E5%8F%B7.js\",\"D_DZ\":5,\"D_Gk\":20,\"D_PlDz\":10,\"D_PlLy\":5,\"Dz\":\"\",\"HpMax\":3,\"HpMin\":1,\"LlDx\":\"推荐\",\"LlFs\":\"随机滑屏\",\"LlMax\":200,\"LlMin\":100,\"LlScMax\":30,\"LlScMin\":15,\"PlDz\":\"\",\"PlGk\":\"\",\"PlLy\":\"\",\"QdDdMax\":3,\"QdDdMin\":1,\"QjYcMax\":3,\"QjYcMin\":1,\"SxMax\":5,\"SxMin\":2}');
INSERT INTO `tasks` VALUES ('8', '定时', '抖音组', 'DY养号', '352746023870084', null, '2022-11-11 15:07:44', '0', '2022-11-11 15:08:07', '1993738334', '0', '{\"type\":\"定时\",\"sendTime\":\"2022-11-11 15:08:07\",\"createTime\":\"2022-11-11 15:07:44\",\"scriptUrl\":\"https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E6%8A%96%E9%9F%B3%E5%85%BB%E5%8F%B7.js\",\"D_DZ\":5,\"D_Gk\":20,\"D_PlDz\":10,\"D_PlLy\":5,\"Dz\":\"\",\"HpMax\":3,\"HpMin\":1,\"LlDx\":\"推荐\",\"LlFs\":\"随机滑屏\",\"LlMax\":200,\"LlMin\":100,\"LlScMax\":30,\"LlScMin\":15,\"PlDz\":\"\",\"PlGk\":\"\",\"PlLy\":\"\",\"QdDdMax\":3,\"QdDdMin\":1,\"QjYcMax\":3,\"QjYcMin\":1,\"SxMax\":5,\"SxMin\":2}');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL COMMENT '时长名称',
  `type` int(11) DEFAULT NULL COMMENT '时长天数',
  `userid` varchar(512) DEFAULT NULL COMMENT '时长id ',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` int(1) DEFAULT '0' COMMENT '是否删除 0-未删除 1-删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', '测试卡', '1', 'lemon', '2022-08-17 10:32:10', '2022-08-17 10:32:10', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户昵称',
  `userAccount` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '账号',
  `uuid` int(11) DEFAULT NULL COMMENT 'UUID',
  `gender` tinyint(4) DEFAULT NULL COMMENT '性别',
  `userPassword` varchar(512) NOT NULL COMMENT '密码',
  `phone` varchar(128) DEFAULT NULL COMMENT '手机号',
  `email` varchar(512) CHARACTER SET utf8 DEFAULT NULL COMMENT '邮箱',
  `userStatus` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0正常',
  `userRole` int(11) NOT NULL DEFAULT '0' COMMENT '0-普通用户 1-管理员 2-代理',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `avatarUrl` varchar(1024) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户头像',
  `validTime` datetime DEFAULT NULL COMMENT '过期时间',
  `superior` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '上级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', '柠檬', 'lemon', '1993738334', '0', '6dc74cd7727e1391c9602761ba8e04c3', '15257222873', '95736614@qq.com', '0', '1', '2022-05-16 20:06:50', '2022-06-23 17:50:12', '0', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/lemon.jpg', '2023-06-10 22:28:59', '');
INSERT INTO `user` VALUES ('9', '橘子', 'saoren', '1993738335', '0', '874a1220d0597d0f966339a1472c3e21', '19817725154', '35873886@qq.com', '0', '0', '2022-05-16 20:06:50', '2022-06-23 20:18:38', '0', 'https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/userCenterAvatar/20220607093839_叮当猫.png', null, '');
INSERT INTO `user` VALUES ('10', '代理', 'admin', '878415748', null, '6dc74cd7727e1391c9602761ba8e04c3', null, '23456984@qq.com', '0', '2', '2022-06-15 14:41:47', '2022-08-17 11:22:09', '0', 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/352/avatar.png', null, null);

-- ----------------------------
-- Table structure for web
-- ----------------------------
DROP TABLE IF EXISTS `web`;
CREATE TABLE `web` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `web_title` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站标题',
  `icon_url` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '网站icon',
  `le_url` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '安卓端直链',
  `api_url` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT 'api链接',
  `utils_url` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '工具夹链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='网站管理';

-- ----------------------------
-- Records of web
-- ----------------------------
INSERT INTO `web` VALUES ('1', '', '', 'https://i11.lanzoug.com/1117200089327971bb/2022/11/17/3991eeae6cfddaa43550a8273304a213.apk?st=SXwf_hyFctlFfVu9Q64foQ&e=1668690049&b=VGpaP1U2UjsCOAUmUGQAKlJmWnYGbA_c_c&fi=89327971&pid=39-172-25-190&up=2&mp=0&co=1', 'https://blog.lemox.club', '');
