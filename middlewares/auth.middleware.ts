import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {prisma} from "../prisma/client";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, "mysecret") as { user_id: number };

    // 👈 CORRECCIÓN: buscar por user_id, NO por id
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.user_id }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    req.body.user = user; // guardar usuario en request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};