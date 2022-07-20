const Service = require("egg").Service;
const svgCaptcha = require("svg-captcha");
class CommonService extends Service {
	async svgVerifyImg() {
		let result = { data: {}, code: 200, message: "success" };
		// const { ctx } = this;
		const captcha = svgCaptcha.create({
			size: 4,
			fontSize: 50,
			width: 160,
			height: 100,
			bacground: "#48D1CC"
		});
		// this.ctx.session.svgtext = captcha.text; //缓存验证码中的文字
		await this.service.redis.set("verifyCode", captcha.text, "60");
		// await this.app.redis.set("verifyCode", captcha.text);
		result.data.img = captcha.data;
		return result;
	}
}
module.exports = CommonService;