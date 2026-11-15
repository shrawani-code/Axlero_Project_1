export class User {
  constructor({ name, email, password, role = "customer" }) {
    if (!name || !email || !password) throw new Error("Name, email and password are required");
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.password = password;
    this.role = role;
  }
}