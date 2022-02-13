import db from '../models';
import { RequestHandler } from 'express';
import {
  createLast7DaysDateRange,
  createRangeDates,
  createResponseMessage,
  HTTPStatuses,
} from '../utils';
import moment from 'moment';
import _ from 'lodash';

export const getFoodEntries: RequestHandler = async (req, res) => {
  try {
    const foodEntries = await db.foodEntry.findAll({
      include: db.user,
      raw: true,
      nest: true,
    });

    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage('Food entries retrieved successfully.', {
        foodEntries,
        count: foodEntries.length,
      }),
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
    if (params.entryId === undefined) {
      throw new Error('Request query string "entryId" is required.');
    }

    const entry = await db.foodEntry.findByPk(params.entryId, {
      include: db.user,
      raw: true,
      nest: true,
    });

    res
      .status(HTTPStatuses.CREATED_ONCE_SUCCESS)
      .send(createResponseMessage('Food entry retrieved sucessfully.', entry));
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
    const entry = await db.foodEntry.create(
      {
        userId: body.userId,
        name: body.name,
        numOfCalories: body.numOfCalories,
        price: body.price,
        meal: body.meal,
      },
      {
        include: db.user,
        raw: true,
        nest: true,
      },
    );

    res
      .status(HTTPStatuses.CREATED_ONCE_SUCCESS)
      .send(
        createResponseMessage('Food entry registered successfully.', entry),
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
    const updatedFoodEntry = await db.foodEntry.findByPk(params.entryId, {
      include: db.user,
      raw: true,
      nest: true,
    });

    if (updateFoodEntry === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('Food entry not found.'));
      return;
    }

    res
      .status(HTTPStatuses.SUCCESS)
      .send(
        createResponseMessage(
          'Food entry updated successfully.',
          updatedFoodEntry,
        ),
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
      .send(createResponseMessage('Food entry deleted successfully.'));
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const getFoodEntriesReport: RequestHandler = async (req, res) => {
  try {
    if (req.query.date === undefined) {
      throw new Error('Request query string "date" is required.');
    }
    const [startDate, endDate] = createLast7DaysDateRange(
      moment(req.query.date as string),
    );
    const last7DaysFoodEntries = await db.foodEntry.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          createdAt: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
      },
      raw: true,
      nest: true,
    });

    const groupedByDateEntries = _.groupBy(last7DaysFoodEntries, (entry) => {
      return moment(entry.createdAt).format('YYYY-MM-DD');
    });

    const datesWithFoodEntriesCount = _.toPairs(groupedByDateEntries).map(
      (dateCollection) => {
        const collection = dateCollection[1];
        return {
          date: moment(dateCollection[0]).local().format('MMM DD YYYY'),
          foodEntriesCount: collection.length,
        };
      },
    );

    const rangeDatesWithFoodEntriesCount = createRangeDates(startDate).map(
      (date) => ({
        date: date.date,
        foodEntriesCount: 0,
      }),
    );
    const sortedDatesWithFoodEntriesCount = rangeDatesWithFoodEntriesCount.map(
      (rangeDate) => {
        const foundDate = datesWithFoodEntriesCount.find(
          (date) => date.date === rangeDate.date,
        );
        return {
          ...rangeDate,
          foodEntriesCount: foundDate?.foodEntriesCount ?? 0,
        };
      },
    );

    const totalNumOfFoodEntries = sortedDatesWithFoodEntriesCount.reduce(
      (acc, value) => acc + value.foodEntriesCount,
      0,
    );

    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage('Food entries retrieved successfully.', {
        totalNumOfFoodEntries,
        dataPoints: sortedDatesWithFoodEntriesCount,
      }),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};
