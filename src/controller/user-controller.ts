import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { PrismaClient, User } from '@prisma/client';
import { env } from '../config/environment';
import { BadRequestError } from '../helpers/api-erros';

const prisma = new PrismaClient();

export class UserController {
  create = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    const userExists = await this.checkUserExists(email);
    if (userExists) {
      throw new BadRequestError('Email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone },
    });

    const userWithoutPassword = this.omitPassword(newUser);
    return res.status(201).json(userWithoutPassword);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new BadRequestError('Email ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestError('Email ou senha inválidos');
    }

    const token = jwt.sign({ id: user.id }, env.JWT_PASS || '', {
      expiresIn: '8h',
    });

    const userLogin = this.omitPassword(user);
    return res.json({ user: userLogin, token });
  };

  getProfile = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const userProfile = await prisma.user.findUnique({ where: { id: userId } });
    return res.json(userProfile);
  };

  private checkUserExists = async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({ where: { email } });
    return !!user;
  };

  private getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  };

  private omitPassword = (user: User): Omit<User, 'password'> => {
    const { password:_ , ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  getBarbers = async (req: Request, res: Response) => {
    const barbers = await prisma.barber.findMany();
    return res.json(barbers);
  };

  getServices = async (req: Request, res: Response) => {
    const services = await prisma.service.findMany();
    return res.json(services);
  };
}
