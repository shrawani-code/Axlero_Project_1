import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { User } from "../../domain/entities/User.js";

export class AuthService {
  constructor(userRepository) { this.userRepository = userRepository; }

  async register(input) {
    const existing = await this.userRepository.findByEmail(input.email.toLowerCase());
    if (existing) throw new Error("Email already registered");

    const entity = new User(input);
    const password = await bcrypt.hash(entity.password, 10);
    const user = await this.userRepository.create({
      name: entity.name, email: entity.email, password, role: entity.role
    });
    return this.issue(user);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email.toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return this.issue(user);
  }

  issue(user) {
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: "7d" });
    return {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    };
  }
}