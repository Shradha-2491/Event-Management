import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, type: 'Admin', created_at: new Date() });
    return { user: { email: user.email, name: user.name, type: user?.type, id: user.id }, token: generateToken(user) };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid email or password");

    return { user: { email: user.email, name: user.name, type: user?.type, id: user.id }, token: generateToken(user) };
};
