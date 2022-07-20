"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	// 控制层js文件名对应数据库表名，方法名对应增删改查
	const { router, controller, middleware } = app;
	router.post("/", middleware.jwtVerify(app.config.jwt), controller.home.index);
	// 公共接口
	router.post("/common/svgImg", middleware.jwtVerify(app.config.jwt), controller.common.svgVerifyImg);
	// 用户相关
	router.post("/user/logout", middleware.jwtVerify(app.config.jwt), controller.user.logout);
	router.post("/user/login", middleware.jwtVerify(app.config.jwt), controller.user.login);
	router.post("/user/logon", middleware.jwtVerify(app.config.jwt), controller.user.logon);
	router.post("/user/getUserInfo", middleware.jwtVerify(app.config.jwt), controller.user.getUserInfo);
	router.post("/user/getUserInfoById", middleware.jwtVerify(app.config.jwt), controller.user.getUserInfoById);
	router.post("/user/getUserRanking", middleware.jwtVerify(app.config.jwt), controller.user.getUserRanking);
	router.post("/user/getUserBestVideo", middleware.jwtVerify(app.config.jwt), controller.user.getUserBestVideo);
	router.post("/user/changePassword", middleware.jwtVerify(app.config.jwt), controller.user.changePassword);
	router.post("/user/changeUserInfo", middleware.jwtVerify(app.config.jwt), controller.user.changeUserInfo);
	// 上传相关
	router.post("/upload/uploadImg", middleware.jwtVerify(app.config.jwt), controller.upload.uploadImg);
	router.post("/upload/uploadVideo", middleware.jwtVerify(app.config.jwt), controller.upload.uploadVideo);
	// 视频相关
	router.post("/video/search", middleware.jwtVerify(app.config.jwt), controller.video.search);
	router.post("/video/getUserHighLight", middleware.jwtVerify(app.config.jwt), controller.video.getUserHighLight);
	router.post("/video/getBestVideo", middleware.jwtVerify(app.config.jwt), controller.video.getBestVideo);
	router.post("/video/getVideoInfo", middleware.jwtVerify(app.config.jwt), controller.video.getVideoInfo);
	router.post("/video/addLikeCount", middleware.jwtVerify(app.config.jwt), controller.video.addLikeCount);
	router.post("/video/uploadHighLight", middleware.jwtVerify(app.config.jwt), controller.video.uploadHighLight);
	// 评论相关
	router.post("/comment/insertComment", middleware.jwtVerify(app.config.jwt), controller.comment.insertComment);
	router.post("/comment/refreshComment", middleware.jwtVerify(app.config.jwt), controller.comment.refreshComment);
};