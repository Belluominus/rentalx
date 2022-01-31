import { Router } from "express";
import { CategoriesRepositories } from "repositories/CategoriesRepositories";

const categoriesRoutes = Router();
const categoriesRepositories = new CategoriesRepositories();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categoriesRepositories.create({ name, description });

  return response.status(201).send();
});
categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepositories.list();

  return response.json(all);
});

export { categoriesRoutes };
