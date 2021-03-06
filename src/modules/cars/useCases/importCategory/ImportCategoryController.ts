import { Response, Request } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "@modules/cars/useCases/importCategory/ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    response.status(201).send();
  }
}

export { ImportCategoryController };
