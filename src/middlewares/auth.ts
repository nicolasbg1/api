/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { env } from '../config/environment';

const prisma = new PrismaClient();

type JwtPayload = {
	id: number
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, env.JWT_PASS ?? '') as JwtPayload;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new UnauthorizedError('Não autorizado');
  }

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...loggedUser } = user;

  // @ts-expect-error
  req.user = loggedUser;

  next();
};