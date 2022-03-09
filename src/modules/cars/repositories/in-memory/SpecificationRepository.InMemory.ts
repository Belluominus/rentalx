import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];
  async findByname(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const listSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return listSpecifications;
  }
}

export { SpecificationRepositoryInMemory };
