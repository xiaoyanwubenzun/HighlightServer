"use strict";
const Controller = require("egg").Controller;

class CommentController extends Controller {
	async insertComment() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.comment.insertComment(obj);
		ctx.body = result;
	}
	async refreshComment() {
		const { ctx } = this;
		const obj = ctx.request.body;
		const result = await ctx.service.comment.refreshComment(obj);
		ctx.body = result;
	}
}

module.exports = CommentController;