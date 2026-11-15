import { UserModel } from "../models/UserModel.js";

export class UserRepository {
  async findByEmail(email) { return UserModel.findOne({ email }); }
  async create(data) { return UserModel.create(data); }
}