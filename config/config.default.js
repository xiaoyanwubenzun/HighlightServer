/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1614753788209_9549";

	// add your middleware config here
	// config.middleware = [];

	// add your user config here
	const userConfig = {
		// myAppName: "egg",
	};
	// 配置服务器基本信息
	userConfig.cluster = {
		listen: {
			path: "",
			port: 8090,
			hostname: "" // 默认localhost和ip地址,上线时用0.0.0.0
		}
	};

	// userConfig.origin = {
	//     whitelist:["http://localhost:8080","http://localhost:8081"]
	// }
	// 跨域处理配置
	userConfig.cors = {
		origin: "http://localhost:8080", // 不能是*
		allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTION",
		// 允许携带凭证
		credentials: true
	};

	// 数据库的配置
	userConfig.mysql = {
		// 单数据库信息配置
		client: {
			host: "localhost",
			port: "3306",
			user: "root",
			password: "root",
			database: "highLight"
		},
		// 是否加载到 app 上，默认开启
		app: true,
		// 是否加载到 agent 上，默认关闭
		agent: false
	};
	// egg-redis配置
	userConfig.redis = {
		client: {
			port: 6379,
			host: "127.0.0.1",
			password: "",
			db: 0
		}
	}
	// session配置
	// userConfig.session = {
	// 	key: "HIGHT_SESSION", // 设置session cookie里面的key
	// 	maxAge: 24 * 3600 * 1000, // 设置过期时间
	// 	httpOnly: true,
	// 	encrypt: true,
	// 	renew: true // renew等于true 那么每次刷新页面的时候 session都会被延期
	// },
	// 全局配置jwt
	userConfig.jwt = {
		secret: "HighlightServer" // 这个是加密秘钥，自行添加
	};
	// 配置安全验证
	userConfig.security = {
		csrf: {
			enable: false,
			ignoreJSON: true
		}
	}
	// 图片采用文件模式上传
	userConfig.multipart = { // 文件模式
		mode: "file",
		fileSize: "500mb",
		whitelist: [".mp4", ".webm", ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".wmv"]
	};

	return {
		...config,
		...userConfig
	};
};