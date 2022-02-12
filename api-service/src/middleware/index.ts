import { RequestHandler } from 'express';
import { createResponseMessage, HTTPStatuses } from '../utils';
import db from '../models';

export const checkIfUserIsExisted: RequestHandler = async (req, res, next) => {
  try {
    const user = await db.user.findByPk(req.body.userId);
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
