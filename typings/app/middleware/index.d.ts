// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwtVerify = require('../../../app/middleware/jwtVerify');

declare module 'egg' {
  interface IMiddleware {
    jwtVerify: typeof ExportJwtVerify;
  }
}
