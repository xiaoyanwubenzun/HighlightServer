"use strict";

// 定制白名单，不需要验证token的接口地址
const whiteList = ["/user/login", "/user/logon", "/user/changePassword", "/common/svgImg"];

module.exports = options => {
	return async function(ctx, next) {
		// 判断接口路径是否在白名单
		if (!whiteList.some(item => item === ctx.request.url)) {
			// 拿到token,这个是自定义请求头,前端如果定义大写Highlight-Token最后还是会变小写
			// 别相信某些博主说必须用authorization,自定义请求头想怎么命名怎么命名
			let token = ctx.request.header["highlight-token"];
			if (token) {
				// 如果token存在
				// let decoded = ctx.app.jwt.decode(token)
				// 这个decode就是jwt的解密token的方法，解密成功的话是下面这样一个对象
				// {
				// 	iat: 生成token的时间戳,
				// 	exp: token过期的时间戳,
				//  username: ""//sign方法传入的一些信息,一般用用户名,登录成功后用这个用户名去数据库拿这个用户的个人信息然后返回给前端
				// }
				// console.log(decoded);
				let verify = ctx.app.jwt.verify(token, options.secret, (error, success) => {
					// error是token失效或无效时返回的参数，
					// 不对这个error.name做处理的话，token过期或无效了后，服务端会报异常
					if (error) {
						if (error.name === "TokenExpiredError") {
							// token过期
							ctx.body = {
								data: {},
								code: 50014,
								message: "token过期"
							};
						} else if (error.name === "JsonWebTokenError") {
							// 无效的token
							ctx.body = {
								data: {},
								code: 50009,
								message: "token无效"
							};
						}
					} else {
						return success;
					}
				});
				if (verify) {
					if (verify.iat < verify.exp) {
						// console.log(verify);
						await next();// 通過
					} else {
						// console.log(verify);
						return;
					}
				} else {
					return;
				}
			} else {
				ctx.body = {
					data: {},
					code: 50008,
					message: "未设置token"
				};
				return;
			}
		} else {
			await next();
		}
	};
};