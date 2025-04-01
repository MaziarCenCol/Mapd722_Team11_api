import express from 'express';
import { body, param } from 'express-validator';
import { create, fetch, fetchById, update, deletePatient, addClinicalData, deleteClinicalData, fetchClinicalDataByIndex,
    updateClinicalData, findCriticalPatients} from '../controller/patientController.js';

const router = express.Router();

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Fetch all patients
 *     description: Retrieves all patients from the database.
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   bdate:
 *                     type: string
 *                     format: date
 *                   gender:
 *                     type: string
 *                   address:
 *                     type: string
 *                   status:
 *                     type: string
 *                   image:
 *                     type: string
 *                   clinical:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         bp:
 *                           type: number
 *                         rr:
 *                           type: number
 *                         bol:
 *                           type: number
 *                         hbr:
 *                           type: number
 *       400:
 *         description: No patients found.
 *       500:
 *         description: Internal server error.
 */
router.get("/patients", fetch);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Fetch a patient by ID
 *     description: Retrieve the patient details by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient data
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.get("/patients/:id", fetchById);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     description: Create a new patient record with validated details.
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
 *               phone:
 *                 type: string
 *               bdate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Critical, Normal]
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/patients", create);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient's details
 *     description: Update an existing patient's information using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to update
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
 *               phone:
 *                 type: string
 *               bdate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient details updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.put("/patients/:id", update);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient record by their ID. Returns 204 No Content on success.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.delete("/patients/:id", deletePatient);

/**
 * @swagger
 * /api/patients/{id}/clinical:
 *   post:
 *     summary: Add clinical data to a patient
 *     description: Add clinical data for a specific patient by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               bph:
 *                 type: integer
 *               bpl:
 *                 type: integer
 *               rr:
 *                 type: integer
 *               bol:
 *                 type: integer
 *               hbr:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clinical data added successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.post("/patients/:id/clinical", addClinicalData);

/**
 * @swagger
 * /api/patients/{id}/clinical/{index}:
 *   get:
 *     summary: Fetch a specific clinical data entry by index
 *     description: Fetch specific clinical data from a patient by index.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *       - in: path
 *         name: index
 *         required: true
 *         description: Index of the clinical data entry
 *     responses:
 *       200:
 *         description: Clinical data entry
 *       404:
 *         description: Patient or data entry not found
 *       400:
 *         description: Invalid index
 *       500:
 *         description: Internal server error
 */
router.get("/patients/:id/clinical/:index",fetchClinicalDataByIndex);

/**
 * @swagger
 * /api/patients/{id}/clinical/{index}:
 *   put:
 *     summary: Update a specific clinical data entry
 *     description: Update a specific clinical data entry in a patient's clinical records.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *       - in: path
 *         name: index
 *         required: true
 *         description: Index of the clinical data entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               bph:
 *                 type: integer
 *               bpl:
 *                 type: integer
 *               rr:
 *                 type: integer
 *               bol:
 *                 type: integer
 *               hbr:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Clinical data entry updated
 *       404:
 *         description: Patient or data entry not found
 *       400:
 *         description: Invalid index or data
 *       500:
 *         description: Internal server error
 */
router.put(
    "/patients/:id/clinical/:index",
    updateClinicalData
);

/**
 * @swagger
 * /api/patients/{id}/clinical/{index}:
 *   delete:
 *     summary: Delete a specific clinical data entry
 *     description: Delete a clinical data entry for a patient by index.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *       - in: path
 *         name: index
 *         required: true
 *         description: Index of the clinical data entry
 *     responses:
 *       200:
 *         description: Clinical data entry deleted successfully
 *       404:
 *         description: Patient or data entry not found
 *       400:
 *         description: Invalid index
 *       500:
 *         description: Internal server error
 */
router.delete(
    "/patients/:id/clinical/:index",
    deleteClinicalData
);

/**
 * @swagger
 * /api/patients/critical:
 *   get:
 *     summary: Find patients with critical clinical data
 *     description: Retrieve a list of patients with critical clinical data.
 *     responses:
 *       200:
 *         description: A list of critical patients
 *       404:
 *         description: No critical patients found
 *       500:
 *         description: Internal server error
 */
router.get("/patients/critical", findCriticalPatients);

export default router;
