"use strict";
const md5 = require("md5");
const Service = require("egg").Service;
class UserService extends Service {
	async changeUserInfo(obj) {
		// let result = { code: 1, Msg: "个人信息修改成功" };
		let result = { data: {}, code: 200, message: "个人信息修改成功" };
		const havePhoneSql = `SELECT * FROM user u WHERE u.tel=?`;
		const haveEmailSql = `SELECT * FROM user u WHERE u.useremail=?`;
		const changeUserInfoSql = "UPDATE user u SET u.userimg=?,u.usersign=?,u.tel =?, u.useremail =?, u.gender =?, u.uage =?, u.consttell =?, u.gamelike =? WHERE uid =? AND u.`status` = 1";
		const havePhoneData = await this.app.mysql.query(havePhoneSql, [obj.tel]);
		if (havePhoneData.length === 1 && obj.uid !== havePhoneData[0].uid) {
			// result = { code: 0, Msg: "手机号已被注册，换一个试试" };
			result.code = 0;
			result.message = "手机号已被注册，换一个试试";
		} else {
			const haveEmailData = await this.app.mysql.query(haveEmailSql, [obj.useremail]);
			if (haveEmailData.length === 1 && obj.uid !== haveEmailData[0].uid) {
				// result = { code: -1, Msg: "邮箱已被使用，换一个试试" };
				result.code = -1;
				result.message = "邮箱已被使用，换一个试试";
			} else {
				const changeUserInfoData = await this.app.mysql.query(changeUserInfoSql, [obj.userimg, obj.usersign, obj.tel, obj.useremail, obj.gender, obj.uage, obj.consttell, obj.gamevalue, obj.uid, obj.mibao]);
				result.data.user_info = {
					uid: obj.uid,
					user_img: obj.userimg,
					user_sign: obj.usersign,
					user_phone: obj.tel,
					user_email: obj.useremail,
					user_gender: obj.gender,
					user_age: obj.uage,
					user_consttel: obj.consttell,
					user_game_like: obj.gamevalue,
					user_mibao: obj.mibao
				};
				if (!changeUserInfoData.affectedRows) {
					// result = { code: -2, Msg: "用户不存在或账号被封停" };
					result.code = -2;
					result.data = {};
					result.message = "用户不存在或账号被封停";
				}
			}
		}
		return result;
	}
	async getUserRanking() {
		// let result = { code: 1, Msg: "查询所有用户贡献成功" };
		let result = { data: {}, code: 200, message: "查询所有用户贡献成功" };
		const sql = `SELECT u.uid,u.userimg AS user_img,u.username AS user_name,u.gender AS user_gender,u.uage AS user_age,u.usersign AS user_sign,
			IFNULL(SUM(v.watchnum), 0) wnum,
			IFNULL(SUM(v.likecount),0) likenum,
			IFNULL(SUM(v.comment_count),0) comment_count,COUNT(v.uid) vnum,
			IFNULL(SUM(v.watchnum), 0)+IFNULL(SUM(v.likecount),0)+COUNT(v.uid)+IFNULL(SUM(v.comment_count),0) sums FROM user u LEFT JOIN video v ON v.uid=u.uid WHERE v.status=1 and u.status=1 GROUP BY u.uid ORDER BY sums DESC`;
		try {
			const data = await this.app.mysql.query(sql);
			result.message = "查询所有用户贡献成功";
			result.data.userList = data;
		} catch (e) {
			result.code = 0;
			result.message = `查询所有用户贡献失败,${e}`;
		}
		return result;
	}
	async getUserBestVideo(obj) {
		// let result = { code: 1, Msg: "查询此用户热度最高视频成功" };
		let result = { data: {}, code: 200, message: "查询此用户热度最高视频成功" };
		const sql = "SELECT v.vid,u.username,v.vtitle,v.vtext,v.videotype,v.fengmian,v.createtime,v.watchnum,v.likecount,COUNT(c.vid) cnum,v.watchnum + v.likecount + COUNT(c.vid) sums FROM video v LEFT JOIN`comment` c ON c.vid = v.vid LEFT JOIN user u ON u.uid = v.uid WHERE v.uid = ? AND v.`status` = 1 AND u.`status` = 1 GROUP BY v.vid ORDER BY sums DESC LIMIT 2";
		const data = await this.app.mysql.query(sql, [obj.searchUserId]);
		if (data.length === 0) {
			// result = { code: 0, Msg: "查询所有用户贡献失败" };
			result.code = 0;
			result.message = "查询此用户热度最高视频失败";
		} else if (data.length !== 0) {
			// result = { code: 1, Msg: "查询所有用户贡献成功", bestVideoList: data };
			result.message = "查询此用户热度最高视频成功";
			result.data.bestVideoList = data;
		}
		return result;
	}
	// 服务器文件结构优化
	// 登录
	async login(obj) {
		let result = { data: {}, code: 200, message: "登录成功" };
		const sql = `SELECT uid,username,userimg,passwd,tel,useremail,gender,uage,consttell,DATE_FORMAT(createtime, "'%Y-%m-%d %H:%m:%S'") as createtime,gamelike,mibao,status,checkresult FROM user WHERE username=? AND status=1`;
		const data = await this.app.mysql.query(sql, [obj.username]);
		if (data.length === 0) {
			result.code = -1;
			result.message = "账号错误或不存在或违规封停";
		} else if (md5(obj.password) !== data[0].passwd) {
			result.code = 0;
			result.message = "密码错误";
		} else {
			const token = this.app.jwt.sign({ username: obj.username }, this.app.config.jwt.secret, { expiresIn: "24h" });
			result.data.token = token;
			result.data.user_info = {
				uid: data[0].uid,
				user_name: data[0].username,
				user_img: data[0].userimg,
				user_phone: data[0].tel,
				user_email: data[0].useremail,
				user_gender: data[0].gender,
				user_age: data[0].uage,
				user_consttel: data[0].consttell,
				user_create_date: data[0].createtime,
				user_game_like: data[0].gamelike,
				user_mibao: data[0].mibao,
				user_status: data[0].status,
				user_checkresult: data[0].checkresult
			};
		}
		return result;
	}
	// 注册
	async logon(obj) {
		// let result = { code: 1, Msg: "注册成功,去登录吧" };
		let result = { data: {}, code: 200, message: "注册成功,去登录吧" };
		const userNameSql = `SELECT * FROM user WHERE username=?`;
		const phoneSql = `SELECT * FROM user WHERE tel=?`;
		const userNameData = await this.app.mysql.query(userNameSql, [obj.username]);
		if (userNameData.length !== 0) {
			// result = { code: -1, Msg: "用户名已被使用，换一个试试" };
			result.code = -1;
			result.message = "用户名已被使用，换一个试试";
		} else {
			const phoneData = await this.app.mysql.query(phoneSql, [obj.tel]);
			if (phoneData.length !== 0) {
				// result = { code: -2, Msg: "手机号已被注册，换一个试试" };
				result.code = -2;
				result.message = "手机号已被注册，换一个试试";
			} else {
				const sql = `INSERT INTO user (username, passwd, tel)  VALUES (?, ?, ?)`;
				const data = await this.app.mysql.query(sql, [obj.username, md5(obj.passwd), obj.tel]);
				if (data.length === 0) {
					result = { code: 0, Msg: "注册失败" };
					result.code = 0;
					result.message = "注册失败";
				}
			}
		}
		return result;
	}
	// 忘记密码
	async changePassword(obj) {
		// let result = { code: 1, "Msg": "账号密码重置成功" };
		let result = { data: {}, code: 200, message: "账号密码重置成功" };
		const verify_code = await this.service.redis.get("verifyCode");
		if (!verify_code) {
			result.code = -4;
			result.message = "验证码已过期";
			return result;
		}
		if (obj.verify_code.toLowerCase() !== verify_code.toLowerCase()) {
			result.code = -5;
			result.message = "验证码错误";
			return result;
		}
		const phoneSql = `SELECT * FROM user WHERE tel=?`;
		const phoneData = await this.app.mysql.query(phoneSql, [obj.tel]);
		if (phoneData.length === 0) {
			// result = { code: 0, "Msg": "账号密码重置失败，手机号不存在" };
			result.code = 0;
			result.message = "账号密码重置失败，手机号不存在";
		} else {
			const phoneSecretSql = `SELECT * FROM user WHERE tel=? AND mibao=?`;
			const phoneSecretData = await this.app.mysql.query(phoneSecretSql, [obj.tel, obj.mibao]);
			if (phoneSecretData.length === 0) {
				// result = { code: -1, "Msg": "账号密码重置失败，密保错误" };
				result.code = -1;
				result.message = "账号密码重置失败，密保错误";
			} else {
				const userNameSql = `SELECT * FROM user WHERE username=?`;
				const userNameData = await this.app.mysql.query(userNameSql, [obj.username]);
				if (userNameData.length !== 0) {
					// result = { code: -2, "Msg": "账号密码重置失败，用户名已被使用" };
					result.code = -2;
					result.message = "账号密码重置失败，用户名已被使用";
				} else {
					const sql = `UPDATE user SET username=?, passwd=?  WHERE tel=?`;
					const data = await this.app.mysql.query(sql, [obj.username, md5(obj.passwd), obj.tel]);
					if (data.length === 0) {
						// result = { code: -3, "Msg": "账号密码重置失败，未知错误" };
						result.code = -3;
						result.message = "账号密码重置失败，未知错误";
					}
				}
			}
		}
		return result;
	}
	async getUserInfo(username) {
		let result = { data: {}, code: 200, message: "查询用户信息成功" };
		const sql = `SELECT uid,username,userimg,usersign,tel,useremail,gender AS user_gender,uage,consttell,gamelike,mibao FROM user WHERE username=? AND STATUS=1`;
		const data = await this.app.mysql.query(sql, [username]);
		if (data.length === 0) {
			result.code = -1;
			result.message = "该账号已被封停，请联系管理员";
		} else if (data.length !== 0) {
			result.data.user_info = {
				uid: data[0].uid,
				user_name: data[0].username,
				user_img: data[0].userimg,
				user_phone: data[0].tel,
				user_email: data[0].useremail,
				user_gender: data[0].user_gender,
				user_age: data[0].uage,
				user_sign: data[0].usersign,
				user_consttel: data[0].consttell,
				user_create_date: data[0].createtime,
				user_game_like: data[0].gamelike,
				user_mibao: data[0].mibao,
				user_status: data[0].status,
				user_checkresult: data[0].checkresult
			};
		}
		// console.log(result);
		return result;
	}
	async getUserInfoById(obj) {
		let result = { data: {}, code: 200, message: "查询用户信息成功" };
		const sql = `SELECT uid,username,userimg,usersign,tel,useremail,gender AS user_gender,uage,consttell,gamelike,mibao FROM user WHERE uid=? AND STATUS=1`;
		const data = await this.app.mysql.query(sql, [obj.uid]);
		if (data.length === 0) {
			result.code = -1;
			result.message = "该账号已被封停，请联系管理员";
		} else if (data.length !== 0) {
			result.data.user_info = {
				uid: data[0].uid,
				user_name: data[0].username,
				user_img: data[0].userimg,
				user_phone: data[0].tel,
				user_email: data[0].useremail,
				user_gender: data[0].user_gender,
				user_age: data[0].uage,
				user_sign: data[0].usersign,
				user_consttel: data[0].consttell,
				user_create_date: data[0].createtime,
				user_game_like: data[0].gamelike,
				user_mibao: data[0].mibao,
				user_status: data[0].status,
				user_checkresult: data[0].checkresult
			};
		}
		// console.log(result);
		return result;
	}
}
module.exports = UserService;