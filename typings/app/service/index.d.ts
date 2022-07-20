// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportComment = require('../../../app/service/comment');
import ExportCommon = require('../../../app/service/common');
import ExportManager = require('../../../app/service/manager');
import ExportRedis = require('../../../app/service/redis');
import ExportUser = require('../../../app/service/user');
import ExportVideo = require('../../../app/service/video');

declare module 'egg' {
  interface IService {
    comment: AutoInstanceType<typeof ExportComment>;
    common: AutoInstanceType<typeof ExportCommon>;
    manager: AutoInstanceType<typeof ExportManager>;
    redis: AutoInstanceType<typeof ExportRedis>;
    user: AutoInstanceType<typeof ExportUser>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
