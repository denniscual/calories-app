import db from '../models';
import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';

export const getUserFoodEntries: RequestHandler = async (req, res) => {
  const { params } = req;

  try {
    const foodEntries = await db.foodEntry.findAll({
      where: {
        userId: params.userId,
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
