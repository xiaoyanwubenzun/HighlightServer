"use strict";
const Service = require("egg").Service;
class ManagerService extends Service {
	async find(uid) {
		const sql = ``
		const data = await this.app.mysql.query(sql);
		return data;
	}
}
module.exports = ManagerService;