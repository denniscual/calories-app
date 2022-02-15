import { RequestHandler } from 'express';
import db from '../models';
import {
  createLast7DaysDateRange,
  createRangeDates,
  createResponseMessage,
  HTTPStatuses,
  roundOff2DecimalPlaces,
} from '../utils';
import Sequelize from 'sequelize';
import moment from 'moment';
import _ from 'lodash';

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = (
      await db.user.findAll(
        {
          include: [
            db.foodEntry,
            {
              model: db.role,
              attributes: ['name'],
            },
          ],
        },
        {
          where: {
            roles: {
              [Sequelize.Op.eq]: 2,
            },
          },
        },
      )
    )
      .filter((user) => user.roles.find((role) => role.name === 'ROLE_USER'))
      .map((user) => user.toJSON())
      .reduce((acc, value) => {
        const { foodEntries } = value;
        delete value.foodEntries;
        return acc.concat({
          ...value,
          foodEntriesCount: foodEntries.length,
        });
      }, []);

    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage('Users retrieved sucessfully.', {
        count: users.length,
        users,
      }),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const { params } = req;
    if (params.userId === undefined) {
      throw new Error('Request param string "userId" is required.');
    }

    const user = await db.user.findByPk(params.userId);

    if (user === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('User not found.'));
      return;
    }

    res
      .status(HTTPStatuses.SUCCESS)
      .send(createResponseMessage('User retrieved sucessfully.', user));
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const getUserFoodEntries: RequestHandler = async (req, res) => {
  const { params, query } = req;
  try {
    if (params.userId === undefined) {
      throw new Error('Request query string "userId" is required.');
    }

    const user = await db.user.findByPk(params.userId, {
      include: db.foodEntry,
      where: {
        userId: params.userId,
      },
    });
    if (user === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('User not found.'));
      return;
    }

    let foodEntries = user.foodEntries;

    if (query.date) {
      foodEntries = foodEntries.filter((entry) => {
        return moment(entry.createdAt).format('YYYY-MM-DD') === query.date;
      });
    }

    setTimeout(() => {
      res.status(HTTPStatuses.SUCCESS).send({
        id: user.id,
        fullName: user.fullName,
        maxCalories: user.maxCalories,
        maxPricePerMonth: user.maxPricePerMonth,
        foodEntries,
      });
    }, 1000);
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export const getUserFoodEntriesReport: RequestHandler = async (req, res) => {
  const { params } = req;
  try {
    if (params.userId === undefined) {
      throw new Error('Request query string "userId" is required.');
    }

    const [startDate, endDate] = createLast7DaysDateRange(moment().local());

    const last7DaysFoodEntries = await db.foodEntry.findAll({
      where: {
        userId: params.userId,
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
      return moment(entry.createdAt).startOf('day').format('YYYY-MM-DD');
    });

    const datesWithTotalNumOfCalories = _.toPairs(groupedByDateEntries).map(
      (dayCollection) => {
        const collection = dayCollection[1];
        return {
          date: moment(dayCollection[0]).local().format('MMM DD YYYY'),
          totalNumOfCalories: roundOff2DecimalPlaces(
            collection.reduce((acc, value) => acc + value.numOfCalories, 0),
          ),
        };
      },
    );

    const rangeDatesWithTotalNumOfCalories = createRangeDates(startDate).map(
      (date) => ({
        date: date.date,
        totalNumOfCalories: 0,
      }),
    );

    const sortedDatesWithTotalNumOfCalories =
      rangeDatesWithTotalNumOfCalories.map((rangeDate) => {
        const foundDate = datesWithTotalNumOfCalories.find(
          (date) => date.date === rangeDate.date,
        );
        return {
          ...rangeDate,
          totalNumOfCalories: foundDate?.totalNumOfCalories ?? 0,
        };
      });

    const totalCaloriesPerWeek = sortedDatesWithTotalNumOfCalories.reduce(
      (acc, value) => acc + value.totalNumOfCalories,
      0,
    );

    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage(
        'User food entries report retrieved successfully.',
        {
          averageNumOfCalories: roundOff2DecimalPlaces(
            totalCaloriesPerWeek / sortedDatesWithTotalNumOfCalories.length,
          ),
          dataPoints: sortedDatesWithTotalNumOfCalories,
        },
      ),
    );
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};
