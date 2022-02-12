import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import db from '../models';
import { HTTPStatuses } from '../utils/index.js';
import * as authorization from 'auth-header';

const User = db.user;

export function verifyToken(req, res, next) {
  const bearerToken = req.get('authorization');

  if (!bearerToken) {
    return res.status(HTTPStatuses.UNAUTHORIZED).send({
      message: 'Unauthorized request.',
    });
  }

  jwt.verify(
    authorization.parse(bearerToken).token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(HTTPStatuses.UNAUTHORIZED).send({
          message: 'Unauthorized!',
        });
      }
      req.userId = decoded.id;
      next();
    },
  );
}

export function isAdmin(req, res, next) {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'ROLE_ADMIN') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
      return;
    });
  });
}
