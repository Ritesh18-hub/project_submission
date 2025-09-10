import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Add user
router.post("/", async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
});

// Edit user
router.put("/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(user);
});

// Delete user
router.delete("/:id", async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;