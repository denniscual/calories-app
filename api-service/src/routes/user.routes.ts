// import { verifyToken, isModerator, isAdmin } from '../middleware';
import * as userController from '../controllers/user.controller';
import { checkIfUserIsExisted, isAdmin, verifyToken } from '../middleware';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get(
    '/api/users',
    [verifyToken, checkIfUserIsExisted, isAdmin],
    userController.getUsers,
  );

  app.get(
    '/api/users/:userId',
    [verifyToken, checkIfUserIsExisted],
    userController.getUser,
  );

  app.get(
    '/api/users/:userId/entries',
    [verifyToken, checkIfUserIsExisted],
    userController.getUserFoodEntries,
  );

  app.get(
    '/api/users/:userId/entries/report',
    [verifyToken, checkIfUserIsExisted, isAdmin],
    userController.getUserFoodEntriesReport,
  );
}
