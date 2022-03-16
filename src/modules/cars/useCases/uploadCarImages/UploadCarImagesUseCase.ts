import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (img) => {
      await this.carImagesRepository.create(car_id, img);
    });
  }
}

export { UploadCarImagesUseCase };