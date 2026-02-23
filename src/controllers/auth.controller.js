import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.userId);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
