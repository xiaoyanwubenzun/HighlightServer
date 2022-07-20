"use strict";
const Controller = require("egg").Controller;

class VideoController extends Controller {
	async search() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.video.search(obj);
		ctx.body = result;
	}
	async getUserHighLight() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.video.getUserHighLight(obj);
		ctx.body = result;
	}
	async getBestVideo() {
		const { ctx } = this;
		const result = await ctx.service.video.getBestVideo();
		ctx.body = result;
	}
	async getVideoInfo() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.video.getVideoInfo(obj);
		ctx.body = result;
	}
	async addLikeCount() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.video.addLikeCount(obj);
		ctx.body = result;
	}
	async uploadHighLight() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.video.uploadHighLight(obj);
		ctx.body = result;
	}
}
module.exports = VideoController;