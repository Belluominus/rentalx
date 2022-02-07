import { ICategoriesRepository } from "../modules/cars/repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByname(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already Existis!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
