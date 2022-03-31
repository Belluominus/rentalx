import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordorUseCase } from "./SendForgottenPasswordorUseCase";

class SendForgottenPasswordorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgottenPasswordorUseCase = container.resolve(
      SendForgottenPasswordorUseCase
    );

    await sendForgottenPasswordorUseCase.execute(email);

    return response.json("");
  }
}

export { SendForgottenPasswordorController };
