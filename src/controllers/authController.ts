import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, createUser, getUserByUsername, getUserByEmail } from '../models/user';

const register = async (req: Request, res: Response) => {
  const { fullname, email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUserEmail = await getUserByEmail(email);
    if (existingUserEmail) {
      return res.status(409).json({ message: 'Email address already exists' });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user: User = { id:0,fullname, email, username, password: hashedPassword, walletBalance:0 };
    const createdUser = await createUser(user);

    res.json(createdUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ user: user }, 'k735hV6eslAeyfIEVAMqinMGhgNO9bFDH9pCZMWZyedPSiNm9xlFMsGheziA6eADFHFGfuyjhfvyuGFUYgfyjdy');

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login };
