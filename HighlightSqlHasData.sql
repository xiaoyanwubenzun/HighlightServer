-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 伺服器作業系統:                      Win64
-- HeidiSQL 版本:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 傾印 highlight 的資料庫結構
CREATE DATABASE IF NOT EXISTS `highlight` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `highlight`;

-- 傾印  資料表 highlight.comment 結構
CREATE TABLE IF NOT EXISTS `comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `vid` int(11) NOT NULL COMMENT '评论的哪一个视频',
  `uid` int(11) NOT NULL COMMENT '谁评论的',
  `content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '评论内容',
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论发表时间',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0不展示，1展示',
  `checkresult` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '待审核' COMMENT '审核详情',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户评论';

-- 正在傾印表格  highlight.comment 的資料：1 rows
DELETE FROM `comment`;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`cid`, `vid`, `uid`, `content`, `createtime`, `status`, `checkresult`) VALUES
	(1, 1, 1, '测试', '2022-07-14 14:37:24', 1, '待审核');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 傾印  資料表 highlight.manager 結構
CREATE TABLE IF NOT EXISTS `manager` (
  `mid` int(5) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `managername` char(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '管理员账号',
  `passwd` char(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '管理员密码',
  `usertype` char(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '管理员' COMMENT '用户类型/超级管理员123456普通111111',
  `addtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加管理员时间',
  `loginnum` int(5) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `loginintime` datetime NOT NULL COMMENT '登入时间',
  `loginouttime` datetime NOT NULL COMMENT '登出时间',
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='管理员';

-- 正在傾印表格  highlight.manager 的資料：0 rows
DELETE FROM `manager`;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;

-- 傾印  資料表 highlight.user 結構
CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(5) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `passwd` char(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `userimg` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'http://localhost:8090/public/imgupload/defaultuserimg.jpg' COMMENT '用户头像地址',
  `usersign` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户个性签名',
  `tel` char(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '账号/手机号',
  `useremail` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户邮箱地址',
  `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '默认保密 0 1男 2女',
  `uage` int(3) NOT NULL DEFAULT '18' COMMENT '年龄',
  `consttell` tinyint(2) NOT NULL DEFAULT '1' COMMENT '星座 12星座12数字',
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `gamelike` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户喜欢的游戏',
  `mibao` char(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '没有密保',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态0不可用1可用',
  `checkresult` char(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '待审核' COMMENT '审核详情',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

-- 正在傾印表格  highlight.user 的資料：2 rows
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `username`, `passwd`, `userimg`, `usersign`, `tel`, `useremail`, `gender`, `uage`, `consttell`, `createtime`, `gamelike`, `mibao`, `status`, `checkresult`) VALUES
	(1, 'xiaoyanwu', '49b1abdc0bbbc25044111d34b4f29f79', 'http://localhost:8090/public/imgupload/defaultuserimg.jpg', '', '18780093087', '', 0, 18, 1, '2022-07-14 09:16:33', '', '没有密保', 1, '待审核'),
	(2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'http://localhost:8090/public/imgupload/defaultuserimg.jpg', '奥术大师多', '18780093088', '双方都公开的风格d', 1, 18, 3, '2022-07-14 09:22:26', '穿越火线', '没有密保', 1, '待审核');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 傾印  資料表 highlight.video 結構
CREATE TABLE IF NOT EXISTS `video` (
  `vid` int(11) NOT NULL AUTO_INCREMENT COMMENT '视频的id',
  `uid` int(11) NOT NULL COMMENT '谁上传的',
  `vtitle` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频标题',
  `vcontent` mediumtext CHARACTER SET utf8mb4 NOT NULL COMMENT '视频及文章内容',
  `vtext` text COLLATE utf8_unicode_ci NOT NULL COMMENT '纯文字内容',
  `videotype` char(4) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '英雄联盟，穿越火线，绝地求生',
  `fengmian` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'http://localhost:8090/public/imgupload/defaultvideofengmian.jpg' COMMENT '视频封面图片地址',
  `createtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '视频上传时间',
  `watchnum` int(11) NOT NULL DEFAULT '0' COMMENT '视频浏览次数',
  `likecount` int(11) NOT NULL DEFAULT '0' COMMENT '收到点赞次数',
  `commentcount` int(11) NOT NULL DEFAULT '0' COMMENT '收到评论条数',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0待审核，1审核通过，-1审核未通过',
  `checkresult` char(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '待审核' COMMENT '审核详情',
  PRIMARY KEY (`vid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户上传的精彩集锦';

-- 正在傾印表格  highlight.video 的資料：1 rows
DELETE FROM `video`;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`vid`, `uid`, `vtitle`, `vcontent`, `vtext`, `videotype`, `fengmian`, `createtime`, `watchnum`, `likecount`, `commentcount`, `status`, `checkresult`) VALUES
	(1, 1, '测试', '测试', '测试', '穿越火线', 'http://localhost:8090/public/imgupload/defaultvideofengmian.jpg', '2022-07-14 14:11:46', 1, 1, 1, 1, '待审核');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
