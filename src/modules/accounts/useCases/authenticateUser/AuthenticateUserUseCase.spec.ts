import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepository.InMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const testUser: ICreateUserDTO = {
  driver_license: "000123",
  email: "user@test.com",
  password: "1234",
  name: "User Test",
};

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("shuld be able to authenticate an user", async () => {
    await createUserUseCase.execute(testUser);

    const token = await authenticateUserUseCase.execute({
      email: testUser.email,
      password: testUser.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("shuldn't be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: testUser.email,
        password: testUser.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shuldn't be able to authenticate with incorect password", () => {
    expect(async () => {
      await createUserUseCase.execute(testUser);

      await authenticateUserUseCase.execute({
        email: testUser.email,
        password: "incorectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
