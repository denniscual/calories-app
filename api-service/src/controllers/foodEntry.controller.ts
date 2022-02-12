import db from '../models';
import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';

export const createFoodEntry: RequestHandler = async (req, res) => {
  const { body, params } = req;

  try {
    const entry = await db.foodEntry.create({
      userId: params.userId,
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
      plain: true,
    });

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
