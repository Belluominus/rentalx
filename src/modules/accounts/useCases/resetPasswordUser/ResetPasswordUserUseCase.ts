import { hash } from "bcrypt";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid Token");
    }

    if (
      await this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired !");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    console.log(user.password);

    user.password = await hash(password, 8);

    console.log(user.password);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
