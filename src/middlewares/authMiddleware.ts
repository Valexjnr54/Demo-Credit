import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'k735hV6eslAeyfIEVAMqinMGhgNO9bFDH9pCZMWZyedPSiNm9xlFMsGheziA6eADFHFGfuyjhfvyuGFUYgfyjdy');
    // req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { authenticateUser };
