import bcrypt from "bcryptjs";
import * as authRepository from "./auth.repository.js";
import type { User } from "../../shared/types/user.dto.js";
import type { CreateUserDTO, LoginRequest, LoginResponse } from "./auth.types.js";
import { generateToken } from "../../shared/utils/jwt.js";

// ========================================
// REGISTRO
// ========================================
export async function register(data: CreateUserDTO): Promise<User> {
  // Buscamos si existe el email
  const existingEmail = await authRepository.findByEmail(data.email);

  if (existingEmail) {
    throw new Error("El email ya existe");
  }

  // Buscamos si existe el usuario
  const existingUsername = await authRepository.findByUsername(data.username);

  if (existingUsername) {
    throw new Error("El usuario ya existe");
  }

  // Hasear la contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await authRepository.create({
    email: data.email,
    username: data.username,
    password: hashedPassword,
  });

  if (!user) {
    throw new Error("Error al crear el usuario");
  }

  const safeUser: User = {
    id: user.id,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };

  return safeUser;
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(data: LoginRequest) {
  const user = 
    (await authRepository.findByEmail(data.identifier)) ||
    (await authRepository.findByUsername(data.identifier));

  // Si no existe el email o usuario
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Validamos la contraseña
  const isValidPassword = await bcrypt.compare(
    data.password,
    user.password,
  );

  // Si la contraseña es incorrecta
  if (!isValidPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken({
    userId: user.id,
  });

  const safeUser: User = {
    id: user.id,
    email: user.email,
    username: user.username,
    nickname: user.nickname,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }

  const result: LoginResponse = {
    user: safeUser,
    token,
  }

  return result;
}