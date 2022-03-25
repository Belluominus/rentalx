import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
      end_date: null,
    });

    this.rentals.push(rental);

    return rental;
  }
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const a = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
    return a;
  }
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalsRepositoryInMemory };
