import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async register(data: any) {
    const { names, lastnames, email, password } = data;

    if (!names || !lastnames || !email || !password) {
      throw new Error("Missing required fields");
    }

    // 1. Verificar si ya existe
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new Error("Email already registered");
    }

    // 2. Cifrado del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear usuario
    const user = await prisma.user.create({
      data: {
        names,
        lastnames,
        email,
        password: hashedPassword,
        // role y status usan los defaults
      },
    });

    return {
      message: "User registered successfully",
      user: {
        user_id: user.user_id, // 
        names: user.names,
        lastnames: user.lastnames,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    return {
      message: "Login successful",
      token,
    };
  }

  async profile(user_id: number) {
    const user = await prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) throw new Error("User not found");

    return {
      user_id: user.user_id,
      names: user.names,
      lastnames: user.lastnames,
      email: user.email,
      role: user.role,
      status: user.status,
      created_at: user.created_at,
    };
  }
}
