import db from '../models';
import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';

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
    res.status(HTTPStatuses.NOT_FOUND).send(
      createResponseMessage('Food registered successfully', {
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
