import db from '../models';
import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';
import moment from 'moment';

// TODO:
// - move this ine to User routes.
// - when using calendar to add food entries, send `createdAt` and `updatedAt` in UTC or in local dates then convert in the server the dates in UTC.
export const getUserFoodEntries: RequestHandler = async (req, res) => {
  try {
    // This logic should be exluded in this controller. This should be in controller of food entries named "getWeeksReport" controller.
    // Last 7 days food entries
    const [utcStartDate, utcEndDate] = createLast7DaysDateRange(moment().utc());
    // TODO:
    // - compute last last 7 days food entries on top of "last 7 days" computation.
    const last7DaysFoodEntries = await db.foodEntry.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          createdAt: {
            [db.Sequelize.Op.between]: [utcStartDate, utcEndDate],
          },
        },
      },
    });

    const weekBeforeLast7DaysFoodEntries = await db.foodEntry.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          createdAt: {
            [db.Sequelize.Op.between]: createLast7DaysDateRange(
              utcStartDate.clone(),
            ),
          },
        },
      },
    });

    console.log(
      'last7Days',
      last7DaysFoodEntries.map((entry) => entry.toJSON()),
    );
    console.log(
      'weekBefore',
      weekBeforeLast7DaysFoodEntries.map((entry) => entry.toJSON()),
    );

    const foodEntries = await db.foodEntry.findAll({
      where: {
        // @ts-expect-error Accessing non-standard `Request` object.
        userId: req.userId,
      },
    });

    const mappedFoodEntries = foodEntries.map((entry) => entry.toJSON());

    res
      .status(HTTPStatuses.CREATED_ONCE_SUCCESS)
      .send(
        createResponseMessage(
          'Successfully get all food entries.',
          mappedFoodEntries,
        ),
      );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const getFoodEntryById: RequestHandler = async (req, res) => {
  const { params } = req;

  try {
    const entry = await db.foodEntry.findByPk(params.entryId);

    res.status(HTTPStatuses.CREATED_ONCE_SUCCESS).send(
      createResponseMessage('Food retrieved sucessfully.', {
        id: entry.id,
        name: entry.name,
        numOfCalories: entry.numOfCalories,
        price: entry.price,
        meal: entry.meal,
        createdAt: entry.createdAt,
      }),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

// For creating food entry, the `req.body.userId` is the owner of the food entry not the user of the app.
export const createFoodEntry: RequestHandler = async (req, res) => {
  const { body } = req;

  try {
    const entry = await db.foodEntry.create({
      userId: body.userId,
      name: body.name,
      numOfCalories: body.numOfCalories,
      price: body.price,
      meal: body.meal,
    });

    res.status(HTTPStatuses.CREATED_ONCE_SUCCESS).send(
      createResponseMessage('Food registered successfully.', {
        id: entry.id,
        name: entry.name,
        numOfCalories: entry.numOfCalories,
        price: entry.price,
        meal: entry.meal,
        createdAt: entry.createdAt,
      }),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

// For creating food entry, the `req.body.userId` is the owner of the food entry not the user of the app.
export const updateFoodEntry: RequestHandler = async (req, res) => {
  const { body, params } = req;

  try {
    await db.foodEntry.update(
      {
        name: body.name,
        numOfCalories: body.numOfCalories,
        price: body.price,
        meal: body.meal,
      },
      {
        where: {
          id: params.entryId,
        },
      },
    );
    const updatedFoodEntry = await db.foodEntry.findByPk(params.entryId);

    if (updateFoodEntry === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('Food entry not found.'));
      return;
    }

    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage('Food updated successfully.', {
        id: updatedFoodEntry.id,
        name: updatedFoodEntry.name,
        numOfCalories: updatedFoodEntry.numOfCalories,
        price: updatedFoodEntry.price,
        meal: updatedFoodEntry.meal,
        createdAt: updatedFoodEntry.createdAt,
        updatedAt: updatedFoodEntry.updatedAt,
      }),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const deleteFoodEntry: RequestHandler = async (req, res) => {
  const { params } = req;

  try {
    await db.foodEntry.destroy({
      where: {
        id: params.entryId,
      },
    });

    res
      .status(HTTPStatuses.SUCCESS)
      .send(createResponseMessage('Food deleted successfully.'));
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

function createLast7DaysDateRange(utcEndDate) {
  const utcStartDate = utcEndDate.clone().subtract(6, 'days');
  return [utcStartDate, utcEndDate];
}
