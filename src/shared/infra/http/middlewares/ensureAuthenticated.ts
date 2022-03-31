import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Missing Token", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const usersRepository = new UsersRepository();
    const { sub: user_id } = verify(token, auth.secret_token);

    if (typeof user_id === "string") {
      const user = usersRepository.findById(user_id);

      if (!user) {
        throw new AppError("User dos not existis!", 401);
      }

      request.user = {
        id: user_id,
      };

      next();
    } else {
      throw new AppError("Invalid token!", 401);
    }
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
