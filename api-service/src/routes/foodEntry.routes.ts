import { checkIfUserIsExisted, verifyToken } from '../middleware';
import * as foodEntryController from '../controllers/foodEntry.controller';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/entries',
    [checkIfUserIsExisted],
    [checkIfUserIsExisted, verifyToken],
    foodEntryController.createFoodEntry,
  );
}
