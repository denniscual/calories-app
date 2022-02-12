import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';
import db from '../models';

export const checkIfUserIsExisted: RequestHandler = async (req, res, next) => {
  try {
    // @ts-expect-error `req.userId` is a custom property defined by the author.
    const user = await db.user.findByPk(req.userId);
    if (user === null) {
      res
        .status(HTTPStatuses.NOT_FOUND)
        .send(createResponseMessage('User not found.'));
      return;
    }
    next();
  } catch (err) {
    res
      .status(HTTPStatuses.BAD_REQUEST)
      .send(createResponseMessage(err.message));
  }
};

export * from './authJwt';
export * from './verifySignUp';
