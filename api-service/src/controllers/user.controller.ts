import { RequestHandler } from 'express';

export const getUser: RequestHandler = (req, res) => {
  res.send({ message: 'yo yo yo' });
};
