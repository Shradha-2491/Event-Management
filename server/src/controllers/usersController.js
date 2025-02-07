import { registerUser, loginUser } from "../services/usersService.js";

export const register = async (req, res) => {
    try {
        console.log("Got Request", req.body)
        const { name, email, password } = req.body;
        const { user, token } = await registerUser(name, email, password);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
