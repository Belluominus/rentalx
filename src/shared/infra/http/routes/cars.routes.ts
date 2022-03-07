import { Router } from "express";
// import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
