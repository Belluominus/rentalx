import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    const { sub } = verify(token, "0dfb8e08098ba8d65847d9888171b92c");

    if (typeof sub === "string") {
      const user = usersRepository.findById(sub);

      if (!user) {
        throw new AppError("User dos not existis!", 401);
      }

      request.user = {
        id: sub,
      };

      next();
    } else {
      throw new AppError("Invalid token!", 401);
    }
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
