import { Router } from 'express';
import { z } from 'zod';
import { UserService } from '../services/userService';
import { requireAuth } from '../middleware/auth';

export const userRouter = Router();
const userService = new UserService();

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

userRouter.get('/', requireAuth, async (_req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

userRouter.get('/:id', requireAuth, async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
});

userRouter.post('/', async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const user = await userService.create(parsed.data);
  return res.status(201).json(user);
});
