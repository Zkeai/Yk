/*
Navicat MySQL Data Transfer

Source Server         : 硕天云控
Source Server Version : 50650
Source Host           : 106.15.126.44:3306
Source Database       : lemon

Target Server Type    : MYSQL
Target Server Version : 50650
File Encoding         : 65001

Date: 2022-11-13 16:11:26
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of devices
-- ----------------------------
INSERT INTO `devices` VALUES ('1', 'lemon', '1993738334', '352746023870084', '测试分组', '1', '2022-06-27 14:14:12', '0', 'OnePlus', '雷电-1');
INSERT INTO `devices` VALUES ('2', 'lemon', '1993738334', '866021030649635', null, '1', '2022-11-13 15:55:16', '0', 'OPPO', '手机-1');

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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1 COMMENT='登录历史';

-- ----------------------------
-- Records of historylog
-- ----------------------------
INSERT INTO `historylog` VALUES ('1', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 13:50:22', '0');
INSERT INTO `historylog` VALUES ('2', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 13:59:07', '0');
INSERT INTO `historylog` VALUES ('3', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 13:59:31', '0');
INSERT INTO `historylog` VALUES ('4', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 13:59:46', '0');
INSERT INTO `historylog` VALUES ('5', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 13:59:54', '0');
INSERT INTO `historylog` VALUES ('6', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:07', '0');
INSERT INTO `historylog` VALUES ('7', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:17', '0');
INSERT INTO `historylog` VALUES ('8', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:22', '0');
INSERT INTO `historylog` VALUES ('9', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:27', '0');
INSERT INTO `historylog` VALUES ('10', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:35', '0');
INSERT INTO `historylog` VALUES ('11', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:45', '0');
INSERT INTO `historylog` VALUES ('12', 'lemon', '39.174.24.122', '中国 浙江省含杭州市上城区', '2022-08-29 14:00:54', '0');
INSERT INTO `historylog` VALUES ('13', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 11:23:28', '0');
INSERT INTO `historylog` VALUES ('14', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 12:32:01', '0');
INSERT INTO `historylog` VALUES ('15', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 12:59:48', '0');
INSERT INTO `historylog` VALUES ('16', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 13:08:44', '0');
INSERT INTO `historylog` VALUES ('17', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 14:19:18', '0');
INSERT INTO `historylog` VALUES ('18', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:05:02', '0');
INSERT INTO `historylog` VALUES ('19', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:47:23', '0');
INSERT INTO `historylog` VALUES ('20', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:49:55', '0');
INSERT INTO `historylog` VALUES ('21', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:51:07', '0');
INSERT INTO `historylog` VALUES ('22', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:55:11', '0');
INSERT INTO `historylog` VALUES ('23', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:56:33', '0');
INSERT INTO `historylog` VALUES ('24', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:57:34', '0');
INSERT INTO `historylog` VALUES ('25', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 15:59:57', '0');
INSERT INTO `historylog` VALUES ('26', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:00:21', '0');
INSERT INTO `historylog` VALUES ('27', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:02:13', '0');
INSERT INTO `historylog` VALUES ('28', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:03:19', '0');
INSERT INTO `historylog` VALUES ('29', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:04:03', '0');
INSERT INTO `historylog` VALUES ('30', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:05:34', '0');
INSERT INTO `historylog` VALUES ('31', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:07:22', '0');
INSERT INTO `historylog` VALUES ('32', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:11:04', '0');
INSERT INTO `historylog` VALUES ('33', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:17:00', '0');
INSERT INTO `historylog` VALUES ('34', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:31:34', '0');
INSERT INTO `historylog` VALUES ('35', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:33:01', '0');
INSERT INTO `historylog` VALUES ('36', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:33:40', '0');
INSERT INTO `historylog` VALUES ('37', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 16:42:25', '0');
INSERT INTO `historylog` VALUES ('38', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 17:06:54', '0');
INSERT INTO `historylog` VALUES ('39', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 17:42:16', '0');
INSERT INTO `historylog` VALUES ('40', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 17:44:39', '0');
INSERT INTO `historylog` VALUES ('41', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 17:45:57', '0');
INSERT INTO `historylog` VALUES ('42', 'lemon', '39.172.24.45', '中国 浙江省湖州市安吉县', '2022-09-14 17:51:18', '0');
INSERT INTO `historylog` VALUES ('43', 'lemon', '39.172.25.73', '中国 浙江省湖州市安吉县', '2022-10-04 12:28:42', '0');
INSERT INTO `historylog` VALUES ('44', 'lemon', '39.172.24.110', '中国 浙江省湖州市安吉县', '2022-11-07 11:59:00', '0');
INSERT INTO `historylog` VALUES ('45', 'lemon', '39.172.24.110', '中国 浙江省湖州市安吉县', '2022-11-07 13:50:05', '0');
INSERT INTO `historylog` VALUES ('46', 'lemon', '39.172.24.110', '中国 浙江省湖州市安吉县', '2022-11-07 21:05:18', '0');
INSERT INTO `historylog` VALUES ('47', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-09 14:21:00', '0');
INSERT INTO `historylog` VALUES ('48', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-10 14:54:40', '0');
INSERT INTO `historylog` VALUES ('49', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-10 18:47:33', '0');
INSERT INTO `historylog` VALUES ('50', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-10 19:48:27', '0');
INSERT INTO `historylog` VALUES ('51', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 12:44:46', '0');
INSERT INTO `historylog` VALUES ('52', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 12:58:48', '0');
INSERT INTO `historylog` VALUES ('53', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:13:24', '0');
INSERT INTO `historylog` VALUES ('54', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:14:49', '0');
INSERT INTO `historylog` VALUES ('55', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:15:27', '0');
INSERT INTO `historylog` VALUES ('56', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:17:04', '0');
INSERT INTO `historylog` VALUES ('57', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:21:11', '0');
INSERT INTO `historylog` VALUES ('58', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:25:38', '0');
INSERT INTO `historylog` VALUES ('59', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:28:59', '0');
INSERT INTO `historylog` VALUES ('60', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:37:19', '0');
INSERT INTO `historylog` VALUES ('61', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:38:39', '0');
INSERT INTO `historylog` VALUES ('62', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:41:11', '0');
INSERT INTO `historylog` VALUES ('63', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:44:07', '0');
INSERT INTO `historylog` VALUES ('64', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:46:21', '0');
INSERT INTO `historylog` VALUES ('65', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:55:01', '0');
INSERT INTO `historylog` VALUES ('66', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 13:58:52', '0');
INSERT INTO `historylog` VALUES ('67', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:26:03', '0');
INSERT INTO `historylog` VALUES ('68', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:27:13', '0');
INSERT INTO `historylog` VALUES ('69', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:41:18', '0');
INSERT INTO `historylog` VALUES ('70', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:42:09', '0');
INSERT INTO `historylog` VALUES ('71', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:44:34', '0');
INSERT INTO `historylog` VALUES ('72', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:54:36', '0');
INSERT INTO `historylog` VALUES ('73', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 14:58:47', '0');
INSERT INTO `historylog` VALUES ('74', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:02:23', '0');
INSERT INTO `historylog` VALUES ('75', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:04:18', '0');
INSERT INTO `historylog` VALUES ('76', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:06:20', '0');
INSERT INTO `historylog` VALUES ('77', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:06:44', '0');
INSERT INTO `historylog` VALUES ('78', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:07:12', '0');
INSERT INTO `historylog` VALUES ('79', 'lemon', '39.172.24.246', '中国 浙江省湖州市安吉县', '2022-11-11 15:24:28', '0');
INSERT INTO `historylog` VALUES ('80', 'lemon', '39.172.25.31', '中国 浙江省湖州市安吉县', '2022-11-12 14:01:42', '0');
INSERT INTO `historylog` VALUES ('81', 'lemon', '39.172.25.31', '中国 浙江省湖州市安吉县', '2022-11-12 14:03:52', '0');
INSERT INTO `historylog` VALUES ('82', 'lemon', '39.172.25.31', '中国 浙江省湖州市安吉县', '2022-11-12 14:12:51', '0');
INSERT INTO `historylog` VALUES ('83', 'lemon', '39.172.25.31', '中国 浙江省湖州市安吉县', '2022-11-12 14:13:34', '0');
INSERT INTO `historylog` VALUES ('84', 'lemon', '39.172.25.31', '中国 浙江省湖州市安吉县', '2022-11-12 14:14:16', '0');
INSERT INTO `historylog` VALUES ('85', 'lemon', '39.172.25.190', '中国 浙江省湖州市安吉县', '2022-11-13 13:49:06', '0');
INSERT INTO `historylog` VALUES ('86', 'admin', '39.172.25.190', '中国 浙江省湖州市安吉县', '2022-11-13 13:49:31', '0');
INSERT INTO `historylog` VALUES ('87', 'lemon', '39.172.25.190', '中国 浙江省湖州市安吉县', '2022-11-13 13:49:49', '0');
INSERT INTO `historylog` VALUES ('88', 'lemon', '39.172.25.190', '中国 浙江省湖州市安吉县', '2022-11-13 14:26:40', '0');
INSERT INTO `historylog` VALUES ('89', 'lemon', '39.172.25.190', '中国 浙江省湖州市安吉县', '2022-11-13 15:41:07', '0');

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
  `type` int(11) DEFAULT NULL COMMENT '脚本类型 0共享 1管理员 2管理员和代理',
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO `tasks` VALUES ('1', '定时', '小红书组', 'XHS私信', '866021030649635', '测试加密', '2022-11-13 15:59:31', '0', '2022-11-13 16:00:06', '1993738334', '2', '{\"type\":\"定时\",\"sendTime\":\"2022-11-13 16:00:06\",\"createTime\":\"2022-11-13 15:59:31\",\"scriptUrl\":\"https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/script/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%A7%81%E4%BF%A1.js\",\"T_ID\":\"5a329d1f11be107404b3ab28\",\"commentArea\":\"hello\\n你好啊\"}');

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
