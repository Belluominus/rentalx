import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationRepository {
  findByname(name: string): Specification;
  create({ description, name }: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
