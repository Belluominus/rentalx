import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepository.InMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepository.InMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

const testUser: ICreateUserDTO = {
  driver_license: "000123",
  email: "user@test.com",
  password: "1234",
  name: "User Test",
};

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute(testUser);

    const token = await authenticateUserUseCase.execute({
      email: testUser.email,
      password: testUser.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("shouldn't be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: testUser.email,
        password: testUser.password,
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("shouldn't be able to authenticate with incorect password", async () => {
    await createUserUseCase.execute(testUser);
    await expect(
      authenticateUserUseCase.execute({
        email: testUser.email,
        password: "incorectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
