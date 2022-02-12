// import { verifyToken, isModerator, isAdmin } from '../middleware';
import * as userController from '../controllers/user.controller';
import { verifyToken } from '../middleware';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get('/api/users', [verifyToken], userController.getUser);
}
