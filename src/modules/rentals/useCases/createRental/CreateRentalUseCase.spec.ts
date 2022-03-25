import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepository.InMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepository.InMemory";
import { CreateRentalUseCase } from "@modules/rentals/useCases/createRental/CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  const generateDate = dayjs().add(2, "day").toDate();

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "a13bdb34",
      car_id: "7b1dd3ad",
      expected_return_date: generateDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("shouldn't be able to create a new rental if there another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "a13bdb34",
        car_id: "aaaaaa",
        expected_return_date: generateDate,
      });
      await createRentalUseCase.execute({
        user_id: "a13bdb34",
        car_id: "bbbbbb",
        expected_return_date: generateDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental if Car is unavailable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "aaaaaaa",
        car_id: "7b1dd3ad",
        expected_return_date: generateDate,
      });
      await createRentalUseCase.execute({
        user_id: "bbbbbbb",
        car_id: "7b1dd3ad",
        expected_return_date: generateDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to create a new rental if Car is unavailable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "aaaaaa",
        car_id: "bbbbbb",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
