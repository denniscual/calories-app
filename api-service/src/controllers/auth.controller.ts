import db from '../models';
import config from '../config/auth.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { HTTPStatuses, createResponseMessage } from '../utils';
import { RequestHandler } from 'express';

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

export const signup: RequestHandler = (req, res) => {
  const { body } = req;
  // Save User to Database
  User.create({
    username: body.username,
    password: bcrypt.hashSync(body.password, 8),
    fullName: body.fullName,
    email: body.email,
    maxCalories: body.maxCalories,
    maxPricePerMonth: body.maxPricePerMonth,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            const token = generateToken(user.id);
            res.status(HTTPStatuses.CREATED_ONCE_SUCCESS).send(
              createResponseMessage('User registered successfully!', {
                id: user.id,
                username: user.username,
                roles: roles.map((role) => role.name),
                accessToken: token,
              }),
            );
          });
        });
      }
    })
    .catch((err) => {
      res
        .status(HTTPStatuses.BAD_REQUEST)
        .send(createResponseMessage(err.message));
    });
};

export const signin: RequestHandler = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(HTTPStatuses.NOT_FOUND)
          .send(createResponseMessage('User not found.'));
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res
          .status(HTTPStatuses.UNAUTHORIZED)
          .send(
            createResponseMessage('Invalid password.', { accessToken: null }),
          );
      }

      const token = generateToken(user.id);

      user.getRoles().then((roles) => {
        // setTimeout(() => {
        // }, 3000);
        res.status(HTTPStatuses.SUCCESS).send(
          createResponseMessage('Successfully signed in', {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            maxCalories: user.maxCalories,
            maxPricePerMonth: user.maxPricePerMonth,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            roles: roles.map((role) => role.name),
            accessToken: token,
          }),
        );
      });
    })
    .catch((err) => {
      res
        .status(HTTPStatuses.BAD_REQUEST)
        .send(createResponseMessage(err.message));
    });
};

function generateToken(userId: string) {
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
}
