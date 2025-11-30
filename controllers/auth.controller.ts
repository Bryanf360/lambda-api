import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  profile = async (req: Request, res: Response) => {
    return res.json({ user: req.body.user });
  }
}
