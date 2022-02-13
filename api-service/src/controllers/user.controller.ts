import { RequestHandler } from 'express';
import db from '../models';
import { createResponseMessage, HTTPStatuses } from '../utils';
import Sequelize from 'sequelize';

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
      throw new Error('Request query string "userId" is required.');
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
  const { params } = req;
  try {
    if (params.userId === undefined) {
      throw new Error('Request query string "userId" is required.');
    }
    const user = await db.user.findByPk(params.userId, {
      include: db.foodEntry,
    });
    if (user === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('User not found.'));
      return;
    }

    const foodEntries = user.foodEntries.map((entry) => entry.toJSON());
    res.status(HTTPStatuses.SUCCESS).send(
      createResponseMessage('User food entries retrieved successfully.', {
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

export const getUserFoodEntriesReport: RequestHandler = async (req, res) => {};
