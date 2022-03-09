import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepository.InMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Name Car",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1a234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1a234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category",
    });

    expect(cars).toEqual([car]);
  });
});
