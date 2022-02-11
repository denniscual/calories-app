// import { verifyToken, isModerator, isAdmin } from '../middleware';
import * as userController from '../controllers/user.controller';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/test/all', userController.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [verifyToken],
  //   userController.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [verifyToken, isModerator],
  //   userController.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [verifyToken, isAdmin],
  //   userController.adminBoard
  // );
}
