"use strict";
const Controller = require("egg").Controller;

class UserController extends Controller {
	async changeUserInfo() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.changeUserInfo(obj);
		ctx.body = result;
	}
	async getUserRanking() {
		const { ctx } = this;
		const result = await ctx.service.user.getUserRanking();
		ctx.body = result;
	}
	async getUserBestVideo() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.getUserBestVideo(obj);
		ctx.body = result;
	}
	async login() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.login(obj);
		ctx.body = result;
	}
	async logout() {
		const result = { data: {}, code: 200, message: "退出成功" };
		const { ctx } = this;
		ctx.body = result;
	}
	// 注册
	async logon() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.logon(obj);
		ctx.body = result;
	}
	// 忘记密码
	async changePassword() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.changePassword(obj);
		ctx.body = result;
	}
	async getUserInfo() {
		const { ctx } = this;
		const token = ctx.request.header["highlight-token"]
		const decoded = ctx.app.jwt.decode(token);
		const result = await ctx.service.user.getUserInfo(decoded.username);
		ctx.body = result;
	}
	async getUserInfoById() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.user.getUserInfoById(obj);
		ctx.body = result;
	}
}

module.exports = UserController;