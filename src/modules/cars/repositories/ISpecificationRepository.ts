import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationRepository {
  findByname(name: string): Promise<Specification>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository };
