import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepository.InMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepository.InMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProvider.InMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordorUseCase } from "./SendForgottenPasswordorUseCase";

let sendForgottenPasswordorUseCase: SendForgottenPasswordorUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
describe("Send Forgotten Passwordor", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgottenPasswordorUseCase = new SendForgottenPasswordorUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a mail from a forgotten password to an user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "878384",
      email: "ko@siomub.mh",
      name: "Marvin Santiago",
      password: "1234",
    });

    await sendForgottenPasswordorUseCase.execute("ko@siomub.mh");

    expect(sendMail).toHaveBeenCalled();
  });
  it("should't be able to send a mail if user does not exists", async () => {
    await expect(
      sendForgottenPasswordorUseCase.execute("mufbaac@noh.us")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await userRepositoryInMemory.create({
      driver_license: "064680",
      email: "adi@emuduluc.hr",
      name: "Abbie Andrews",
      password: "12343",
    });

    await sendForgottenPasswordorUseCase.execute("adi@emuduluc.hr");

    expect(generateTokenMail).toBeCalled();
  });
});
