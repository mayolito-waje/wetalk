import type { Request, Response } from 'express';

const getLoggedInUser = (req: Request, res: Response):void => {
  const loggedInUser = req.user;

  res.json({ ...loggedInUser });
};

export default getLoggedInUser;
