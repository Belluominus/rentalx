import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepository.InMemory";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create a category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("should be able to crate a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByname(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });
  it("shouldn't be able to crate a already existed category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };
    await createCategoryUseCase.execute(category);
    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError("Category Already Existis!")
    );
  });
});
