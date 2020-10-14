import express from "express";
import * as jwt from "jsonwebtoken";

import config from "../config";
import { UserRole } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";

export type DecodedTokenType = {
  _id?: string;
  login?: string;
  role?: string;
};

export const getToken = (req: express.Request): string =>
  req.headers.authorization.split(" ")[1];

export const generateToken = (_id: string, login: string, role: string) => {
  const data = {
    _id,
    login,
    role,
  };
  return jwt.sign(data, config.tokenSecret, {
    expiresIn: config.tokenExpiration,
  });
};

export const decodeToken = (token: string): DecodedTokenType => {
  return jwt.verify(token, config.tokenSecret) as DecodedTokenType;
};

export const isAuthMiddleware = (role: UserRole) => {
  return function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = getToken(req);
      const decodedToken = jwt.verify(token, config.tokenSecret, (err, decoded) => {
        req.user = decoded;
        if (err) throw new HttpException(401, `Auth error: ${err.message}`);
      });
      
      if (
        role === UserRole.admin &&
        decodeToken(token).role !== UserRole.admin
      ) {

        throw new HttpException(401, "You do not have administrator rights");
      }
      res.locals.user = decodeToken(token);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  };
};
