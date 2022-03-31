import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepository.InMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepository.InMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    const specification = await specificationRepositoryInMemory.create({
      description: "teste",
      name: "teste",
    });
    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: [specification.id],
    });
    expect(carSpecification).toHaveProperty("specifications");
    expect(carSpecification.specifications.length).toBe(1);
  });
  it("shouldn't be able to add a specification for a non-existent car", async () => {
    const car_id = "123";
    const specification_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });
});
