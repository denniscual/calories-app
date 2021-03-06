import { checkIfUserIsExisted, isAdmin, verifyToken } from '../middleware';
import * as foodEntryController from '../controllers/foodEntry.controller';

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.get(
    '/api/entries',
    [verifyToken, checkIfUserIsExisted, isAdmin],
    foodEntryController.getFoodEntries,
  );

  app.get(
    '/api/entries/report',
    [verifyToken, checkIfUserIsExisted, isAdmin],
    foodEntryController.getFoodEntriesReport,
  );

  app.post(
    '/api/entries',
    [verifyToken, checkIfUserIsExisted],
    foodEntryController.createFoodEntry,
  );

  app.get(
    '/api/entries/:entryId',
    [verifyToken, checkIfUserIsExisted],
    foodEntryController.getFoodEntryById,
  );

  app.put(
    '/api/entries/:entryId',
    [verifyToken, checkIfUserIsExisted],
    foodEntryController.updateFoodEntry,
  );

  app.delete(
    '/api/entries/:entryId',
    [verifyToken, checkIfUserIsExisted],
    foodEntryController.deleteFoodEntry,
  );
}
