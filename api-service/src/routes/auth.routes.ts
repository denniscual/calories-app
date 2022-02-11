import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from '../middleware';
import * as authController from '../controllers/auth.controller';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    authController.signup,
  );

  app.post('/api/auth/signin', authController.signin);
}
