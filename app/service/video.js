"use strict";
const Service = require("egg").Service;

class VideoService extends Service {
	async search(obj) {
		let result = { data: {}, code: 200, message: "搜索成功" };
		let total = 10;
		obj.keyword = obj.keyword ? obj.keyword : "";
		// 计数，分组，排序
		let sql = `SELECT v.*,u.username, COUNT(c.vid) cnum FROM video v LEFT JOIN comment c ON c.vid = v.vid LEFT JOIN user u ON u.uid=v.uid WHERE v.STATUS=1 
		AND (vtitle LIKE '%${obj.keyword}%' OR vtext LIKE '%${obj.keyword}%' OR username LIKE '%${obj.keyword}%' OR videotype LIKE '%${obj.keyword}%')
		GROUP BY v.vid ORDER BY ${obj.keyword ? "watchnum" : "createtime"} DESC LIMIT ${(obj.pagenum - 1) * total},${total}`;
		// console.log(obj.pagenum, total);
		// 总记录数
		// let sql2 = `SELECT COUNT(*) totalnum FROM video WHERE STATUS=1 AND (vtitle LIKE "%${obj.keyword}%" OR vtext LIKE "%${obj.keyword}%")`;
		let sql2 = `SELECT v.*,u.username, COUNT(c.vid) cnum FROM video v LEFT JOIN comment c ON c.vid = v.vid LEFT JOIN user u ON u.uid=v.uid WHERE v.STATUS=1 
		AND (vtitle LIKE '%${obj.keyword}%' OR vtext LIKE '%${obj.keyword}%' OR username LIKE '%${obj.keyword}%' OR videotype LIKE '%${obj.keyword}%')
		GROUP BY v.vid ORDER BY ${obj.keyword ? "watchnum" : "createtime"} DESC`;
		// 初始页面
		// let sql3 = `SELECT v.*,u.username, COUNT(c.vid) cnum FROM video v LEFT JOIN comment c ON c.vid = v.vid LEFT JOIN user u ON u.uid = v.uid WHERE v.STATUS=1
		// and u.status=1
		// GROUP BY v.vid ORDER BY createtime DESC LIMIT ${(obj.pagenum - 1) * total},${total}`;
		try {
			const data = await this.app.mysql.query(sql);
			let totalNum = await this.app.mysql.query(sql2);
			result.data.data_list = data;
			result.data.total = totalNum.length;
		} catch (e) {
			result.code = 0;
			result.message = `查询失败,${e}`;
		}
		return result;
	}
	async getUserHighLight(obj) {
		let result = { data: {}, code: 200, message: "搜索成功" };
		let total = 10;
		obj.keyword = obj.keyword ? obj.keyword : "";
		// 计数，分组，排序
		let sql = `SELECT v.*,u.username, COUNT(c.vid) cnum FROM video v LEFT JOIN comment c ON c.vid = v.vid LEFT JOIN user u ON u.uid=v.uid WHERE v.STATUS=1 
		AND (vtitle LIKE '%${obj.keyword}%' OR vtext LIKE '%${obj.keyword}%' OR username LIKE '%${obj.keyword}%' OR videotype LIKE '%${obj.keyword}%')
		AND v.uid=?
		GROUP BY v.vid ORDER BY ${obj.keyword ? "watchnum" : "createtime"} DESC LIMIT ${(obj.pagenum - 1) * total},${total}`;
		// 总记录数
		let sql2 = `SELECT COUNT(*) totalnum FROM video v WHERE STATUS=1 AND (v.vtitle LIKE '%${obj.keyword}%' OR v.vtext LIKE '%${obj.keyword}%') AND v.uid=?`;
		// 初始页面
		// let sql3 = `SELECT v.*,u.username, COUNT(c.vid) cnum FROM video v LEFT JOIN comment c ON c.vid = v.vid LEFT JOIN user u ON u.uid = v.uid WHERE v.STATUS=1
		// and u.status=1
		// GROUP BY v.vid ORDER BY createtime DESC LIMIT ${(obj.pagenum - 1) * total},${total}`;
		try {
			const data = await this.app.mysql.query(sql, [obj.uid]);
			let totalNum = await this.app.mysql.query(sql2, [obj.uid]);
			result.message = "查询成功";
			result.data.videoList = data;
			result.data.total = totalNum[0].totalnum;
		} catch (e) {
			result.code = 0;
			result.message = `查询失败${e}`;
		}
		// const data = await this.app.mysql.query(sql, [obj.uid]);
		// let totalNum = await this.app.mysql.query(sql2, [obj.uid]);
		// if (data.length === 0) {
		// 	result.code = 0;
		// 	result.message = "没有搜索到内容";
		// } else {
		// 	result.message = "搜索成功";
		// 	result.data.videoList = data;
		// 	result.data.total = totalNum[0].totalnum;
		// 	// result = { code: 1, Msg: "搜索成功", video: data, length: totalNum[0].totalnum };
		// }
		return result;
	}
	async getBestVideo() {
		// let result = { code: 1, Msg: "获取成功" };
		let result = { data: {}, code: 200, message: "获取成功" };
		let sql = `SELECT v.*,u.username,u.userimg,COUNT(c.vid) cnum,commentsum.sums FROM video v 
		LEFT JOIN comment c ON c.vid = v.vid 
		LEFT JOIN user u ON u.uid = v.uid 
		INNER JOIN (SELECT vi.vid, likecount + watchnum + COUNT(ci.cid) sums FROM video vi
		LEFT JOIN comment ci ON ci.vid = vi.vid 
		GROUP BY vi.vid
		ORDER BY sums DESC
		LIMIT 1
		) commentsum ON v.vid = commentsum.vid
		WHERE v.STATUS=1 and u.status=1 and v.vid
		GROUP BY v.vid`;
		try {
			const data = await this.app.mysql.query(sql);
			result.data.hottest_video = data[0];
		} catch (e) {
			result.code = 0;
			result.message = `获取失败,${e}`;
		}
		return result;
	}
	async getVideoInfo(obj) {
		// let result = { code: 1, Msg: "获取视频信息成功" };
		let result = { data: {}, code: 200, message: "获取视频信息成功" };
		let vidSql = "SELECT uid,vtitle,vcontent,vtext,videotype,fengmian,createtime,watchnum,likecount FROM video v WHERE v.vid=? AND v.`status`=1";
		let uidSql = "SELECT t1.*,t2.* FROM (SELECT uid,usersign,userimg,username,gender,uage,consttell,gamelike FROM user u WHERE u.uid=? AND u.`status`=1) as t1,(SELECT COUNT(v.uid) sumvideo, SUM(v.likecount) sumlikecount,SUM(v.watchnum) sumwatchnum FROM video v WHERE v.uid=? AND v.`status`=1) as t2";
		let commentDataSql = "SELECT c.cid,c.uid,c.content,c.createtime,u.username,u.userimg FROM `comment` c LEFT JOIN `user` u ON u.uid=c.uid WHERE c.vid=? AND c.`status`=1 ORDER BY c.createtime DESC";
		const vData = await this.app.mysql.query(vidSql, [obj.vid]);
		if (vData.length !== 0) {
			// result = { code: 1, Msg: "获取视频信息成功", video: vData[0] };
			result.message = "获取视频信息成功";
			result.data.video = vData[0];
		} else {
			// result = { code: 0, Msg: "获取视频信息失败" };
			result.code = 0;
			result.message = "获取视频信息失败";
			// return result;
		}
		const uData = await this.app.mysql.query(uidSql, [vData[0].uid, vData[0].uid]);
		if (uData.length !== 0) {
			// result = { code: 1, Msg: "获取视频、作者信息成功", video: vData[0], user: uData[0] };
			result.message = "获取视频、作者信息成功";
			result.data.user = uData[0];
			result.data.video = vData[0];
		} else {
			// result = { code: 0, Msg: "获取作者信息失败" };
			result.code = 1;
			result.message = "获取作者信息失败";
			// return result;
		}
		const commentData = await this.app.mysql.query(commentDataSql, [obj.vid]);
		// result = { code: 1, Msg: "获取视频、作者、评论信息成功", video: vData[0], user: uData[0], comment: JSON.stringify(commentData) === "{}" ? [{ cid: 1, content: "还没有评论哦", createtime: "1998-06-29T12:30:00.000Z", uid: 1, userimg: "http://localhost:8090/public/imgupload/defaultuserimg.jpg", username: "管理员" }] : commentData };
		result.data.comment = JSON.stringify(commentData) === "{}" ? [{ cid: 1, content: "还没有评论哦", createtime: "1998-06-29T12:30:00.000Z", uid: 1, userimg: "http://localhost:8090/public/imgupload/defaultuserimg.jpg", username: "管理员" }] : commentData;
		if (vData[0].uid !== obj.uid) {
			await this.app.mysql.query(`UPDATE video v SET v.watchnum=v.watchnum+1 WHERE vid=${obj.vid}`);
		}
		return result;
	}
	async addLikeCount(obj) {
		// let result = { code: 1, Msg: "点赞成功" };
		let result = { data: {}, code: 200, message: "点赞成功" };
		let sql = `UPDATE video v SET v.likecount=v.likecount+1 WHERE vid=?`;
		const data = await this.app.mysql.query(sql, [obj.vid]);
		if (!data.changedRows) {
			result.code = 0;
			result.message = "点赞失败";
			// result = { code: 0, Msg: "点赞失败" };
		}
		return result;
	}
	async uploadHighLight(obj) {
		// let result = { code: 1, Msg: "视频发布成功,审核中,请耐心等待" };
		let result = { data: {}, code: 200, message: "视频发布成功,审核中,请耐心等待" };
		const sql = "INSERT INTO video (uid, vtitle, vcontent, vtext, videotype,fengmian)  VALUES (?, ?, ?, ?, ?, ?)";
		const data = await this.app.mysql.query(sql, [obj.uid, obj.vtitle, obj.vcontent, obj.vtext, obj.videotype, obj.fengmian]);
		if (data.length === 0) {
			result.code = 0;
			result.message = "视频发布失败";
			// result = { code: 0, Msg: "视频发布失败" };
		}
		return result;
	}
}

module.exports = VideoService;