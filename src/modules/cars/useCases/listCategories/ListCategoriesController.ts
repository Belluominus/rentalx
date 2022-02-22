import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
  async handle(request: Request, response: Response) {
    const all = await this.listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
