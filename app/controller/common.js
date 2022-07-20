"use strict";
const Controller = require("egg").Controller;

class commonController extends Controller {
	async svgVerifyImg() {
		const { ctx } = this;
		const result = await ctx.service.common.svgVerifyImg();
		ctx.body = result;
	}
}

module.exports = commonController;