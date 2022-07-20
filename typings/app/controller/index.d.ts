// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment = require('../../../app/controller/comment');
import ExportCommon = require('../../../app/controller/common');
import ExportHome = require('../../../app/controller/home');
import ExportManager = require('../../../app/controller/manager');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');
import ExportVideo = require('../../../app/controller/video');

declare module 'egg' {
  interface IController {
    comment: ExportComment;
    common: ExportCommon;
    home: ExportHome;
    manager: ExportManager;
    upload: ExportUpload;
    user: ExportUser;
    video: ExportVideo;
  }
}
