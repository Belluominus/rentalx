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
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "test",
      daily_rate: 100,
      license_plate: "teste",
      fine_amount: 40,
      category_id: "1234",
      brand: "test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "a13bdb34",
      car_id: car.id,
      expected_return_date: generateDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("shouldn't be able to create a new rental if there another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      id: "123",
      name: "test",
      description: "test",
      daily_rate: 100,
      license_plate: "teste",
      fine_amount: 40,
      category_id: "1234",
      brand: "test",
    });
    const car2 = await carsRepositoryInMemory.create({
      id: "321",
      name: "test2",
      description: "test2",
      daily_rate: 100,
      license_plate: "teste2",
      fine_amount: 40,
      category_id: "12342",
      brand: "test2",
    });

    await createRentalUseCase.execute({
      user_id: "a13bdb34",
      car_id: car.id,
      expected_return_date: generateDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "a13bdb34",
        car_id: car2.id,
        expected_return_date: generateDate,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("shouldn't be able to create a new rental if Car is unavailable", async () => {
    const car = await carsRepositoryInMemory.create({
      id: "123",
      name: "test",
      description: "test",
      daily_rate: 100,
      license_plate: "teste",
      fine_amount: 40,
      category_id: "1234",
      brand: "test",
    });
    await createRentalUseCase.execute({
      user_id: "aaaaaaa",
      car_id: car.id,
      expected_return_date: generateDate,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "bbbbbbb",
        car_id: car.id,
        expected_return_date: generateDate,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("shouldn't be able to create a new rental if Car is unavailable", async () => {
    const car = await carsRepositoryInMemory.create({
      id: "123",
      name: "test",
      description: "test",
      daily_rate: 100,
      license_plate: "teste",
      fine_amount: 40,
      category_id: "1234",
      brand: "test",
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "aaaaaa",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be more than 24h from now")
    );
  });
});
