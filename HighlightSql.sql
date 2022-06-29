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

-- 正在傾印表格  hightlight.comment 的資料：2 rows
DELETE FROM `comment`;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`cid`, `vid`, `uid`, `content`, `createtime`, `status`, `checkresult`) VALUES
	(65, 30, 49, '数据库添加评论', '2022-06-14 10:41:54', 1, '审核通过'),
	(66, 30, 49, '数据库添加评论', '2022-06-14 11:09:33', 1, '待审核');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 正在傾印表格  hightlight.manager 的資料：0 rows
DELETE FROM `manager`;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;

-- 正在傾印表格  hightlight.user 的資料：2 rows
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `username`, `passwd`, `userimg`, `usersign`, `tel`, `useremail`, `gender`, `uage`, `consttell`, `createtime`, `gamelike`, `mibao`, `status`, `checkresult`) VALUES
	(48, 'xiaoyanwu', '49b1abdc0bbbc25044111d34b4f29f79', 'http://localhost:8090/public/imgupload/defaultuserimg.jpg', '这个人很懒，啥也没写', '18780093087', '1769122103@qq.com', 0, 18, 1, '2022-06-14 09:24:12', '', '没有密保', 1, '待审核'),
	(49, 'xiaowenkai', '49b1abdc0bbbc25044111d34b4f29f79', 'http://localhost:8090/public/imgupload/defaultuserimg.jpg', '这个人很懒，啥也没写', '18780093085', '1769122103@qq.com', 0, 18, 1, '2022-06-14 10:50:21', '', '没有密保', 1, '待审核');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 正在傾印表格  hightlight.video 的資料：1 rows
DELETE FROM `video`;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`vid`, `uid`, `vtitle`, `vcontent`, `vtext`, `videotype`, `fengmian`, `createtime`, `watchnum`, `likecount`, `status`, `checkresult`) VALUES
	(30, 48, '视频标题', '测试内容', '純文字內容', '视频类型', 'http://localhost:8090/public/imgupload/defaultvideofengmian.jpg', '2022-06-13 16:49:56', 12, 10, 1, '审核通过');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
