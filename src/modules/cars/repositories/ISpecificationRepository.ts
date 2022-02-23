import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationRepository {
  findByname(name: string): Promise<Specification>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository };
