import express from 'express';
import { createUser, getUserById, updateUser, deleteUser} from '../controller/userController.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with validated details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               position:
 *                 type: string
 *                 enum: [CareGiver, Doctor, Nurse]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/users", createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:id", getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user information by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               position:
 *                 type: string
 *                 enum: [CareGiver, Doctor, Nurse]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/users/:id", updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/users/:id", deleteUser);

export default router;
