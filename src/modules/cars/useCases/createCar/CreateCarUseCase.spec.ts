import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepository.InMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("shouldn't be able to create a car with a already exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car1",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand1",
      category_id: "category1",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description Car2",
        daily_rate: 200,
        license_plate: "abc1234",
        fine_amount: 120,
        brand: "Brand2",
        category_id: "category2",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to crate a car with available equal a true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car1",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand1",
      category_id: "category1",
    });
    expect(car.available).toBe(true);
  });
});
