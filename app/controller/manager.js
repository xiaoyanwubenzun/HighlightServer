"use strict";
const Controller = require("egg").Controller;

class ManagerController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = "";
	}
}

module.exports = ManagerController;