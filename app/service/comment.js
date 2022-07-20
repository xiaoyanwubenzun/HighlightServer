"use strict";
const Service = require("egg").Service;
class CommentService extends Service {
	async insertComment(obj) {
		// let result = { code: 1, Msg: "评论成功" };
		let result = { data: {}, code: 200, message: "评论成功" };
		const sql = "INSERT INTO `comment` (vid, uid, content)  VALUES (?, ?, ?)";
		const add_comment_num_sql = `UPDATE video v SET v.commentnum=v.commentnum+1 WHERE vid=${obj.vid}`;
		try {
			const data = await this.app.mysql.query(sql, [obj.vid, obj.uid, obj.content]);
			const add_comment_num_data = await this.app.mysql.query(add_comment_num_sql);
			if (data.affectedRows && add_comment_num_data.affectedRows) {
				await this.app.mysql.query(add_comment_num_sql);
			} else {
				result.code = 0;
				result.message = "评论失败";
			}
		} catch (e) {
			result.code = 0;
			result.message = "评论失败";
		}
		// if (!data.affectedRows) {
		// 	result.code = 0;
		// 	result.message = "评论失败";
		// } else {
		// 	await this.app.mysql.query(add_comment_num_sql);
		// }
		return result;
	}
	async refreshComment(obj) {
		// let result = { code: 1, Msg: "评论刷新成功" };
		let result = { data: {}, code: 200, message: "评论刷新成功" };
		const sql = "SELECT c.cid,c.uid,c.content,c.createtime,u.username,u.userimg FROM `comment` c LEFT JOIN `user` u ON u.uid=c.uid WHERE c.vid=? AND c.`status`=1 ORDER BY c.createtime DESC";
		const data = await this.app.mysql.query(sql, [obj.vid]);
		if (data.length !== 0) {
			// result = { code: 1, Msg: "评论刷新成功", comment: data };
			result.message = "评论刷新成功";
			result.data.comment = data;
		} else {
			result.code = 0;
			result.message = "评论刷新失败";
			// result = { code: 0, Msg: "评论刷新失败" };
		}
		// console.log(data);
		return result;
	}
}
module.exports = CommentService;
