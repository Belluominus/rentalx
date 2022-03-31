import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgottenPasswordorController } from "@modules/accounts/useCases/sendForgottenPasswordor/SendForgottenPasswordorController";

const passwordRoutes = Router();

const sendForgottenPasswordorUseCase = new SendForgottenPasswordorController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgottenPasswordorUseCase.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
