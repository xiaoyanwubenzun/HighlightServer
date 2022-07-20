"use strict";
const fileSystem = require("fs");
const path = require("path");
// const net = require("net");
const Controller = require("egg").Controller;

class UploadController extends Controller {
	async uploadImg() {
		const { ctx } = this;
		const result = {
			// errno 即错误代码，0 表示没有错误。
			//       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
			errno: 0,

			// data 是一个数组，返回图片Object，Object中包含需要包含url、alt和href三个属性,它们分别代表图片地址、图片文字说明和跳转链接,alt和href属性是可选的，可以不设置或设置为空字符串,需要注意的是url是一定要填的。
			data: [{
				url: "图片地址",
				alt: "图片文字说明",
				href: "跳转链接"
			}]
		};
		const file = ctx.request.files[0];
		// let obj = ctx.request.body;
		// console.log(obj);
		// let newpath = path.join(__dirname, "../public/imgupload/" + `${Date.now()}` + `${file.filename}`);
		// const newPath = "/public/imgupload/" + `${Date.now()}` + "_" + `${file.filename}`;
		// const imgNewPath = `${path.dirname(__dirname)}/public/imgUpload/${Date.now()}_${file.filename}`;
		const imgNewPath = `/public/imgUpload/${Date.now()}_${file.filename}`;
		const aim_path = path.dirname(__dirname) + imgNewPath;
		await fileSystem.copyFileSync(file.filepath, aim_path);
		await fileSystem.unlinkSync(file.filepath);
		fileSystem.close(ctx.request.files.length);
		// const fd = await fileSystem.unlinkSync(file.filepath);
		// fileSystem.close(fd);
		const httpUrl = `http://localhost:8090${imgNewPath}`;
		result.data[0].url = httpUrl;
		result.data[0].alt = path.basename;
		result.data[0].href = httpUrl;
		// console.log(file.filepath);
		ctx.body = result;
	}
	async uploadVideo() {
		const { ctx } = this;
		const result = {
			// errno 即错误代码，0 表示没有错误。
			//       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
			errno: 0,

			// data 是一个数组，返回图片Object，Object中包含需要包含url、alt和href三个属性,它们分别代表图片地址、图片文字说明和跳转链接,alt和href属性是可选的，可以不设置或设置为空字符串,需要注意的是url是一定要填的。
			data: [{
				url: "视频地址"
			}]
		};
		const file = ctx.request.files[0];
		// let obj = ctx.request.body;
		// console.log(obj);
		// const newPath = "/public/videoupload/" + `${Date.now()}` + "_" + `${file.filename}`;
		// const videoNewPath = `${path.dirname(__dirname)}/public/videoUpload/${Date.now()}_${file.filename}`;
		const videoNewPath = `/public/videoUpload/${Date.now()}_${file.filename}`;
		const aim_path = path.dirname(__dirname) + videoNewPath;
		await fileSystem.copyFileSync(file.filepath, aim_path);
		await fileSystem.unlinkSync(file.filepath);
		// const fd = await fileSystem.unlinkSync(file.filepath);
		fileSystem.close(ctx.request.files.length);
		const httpUrl = `http://localhost:8090${videoNewPath}`;
		result.data[0].url = httpUrl;
		// console.log(file.filepath);
		ctx.body = result;
	}
}

// let tcp = net.createServer(socket => {
// 	console.log("someone connects");
//
// 	socket.on("data", d => {
// 		// 数据到达：d
// 		console.log(d);
// 	});
//
// 	socket.on("close", () => {
// 		// 当socket链接被关闭
// 		console.log("close");
// 	});
//
// 	// *======错误原因是没有on error事件，需要绑定，添加下边这个on error事件即可======*/
// 	socket.on("error", err => {
// 		console.log(err);
// 		socket.destroy();
// 	});
// });
//
// tcp.on("error", err => {
// 	console.log(err);
// });
//
// tcp.listen(8090, "127.0.0.1", () => {
// 	console.log("serv started. listen on http://127.0.0.1:8090/");
// });

module.exports = UploadController;