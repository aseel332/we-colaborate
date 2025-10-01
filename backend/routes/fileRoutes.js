import express from "express";
import { createFolderInBranch, uploadFile, uploadFileToFolder, uploadFileToTask } from "../controllers/uploadControllers.js";
import { getFilesByBranch, getFoldersByBranch } from "../controllers/uploadControllers.js";
import { get } from "mongoose";

const router = express.Router();
router.post('/upload/branch/:branchId', uploadFile);
router.post('/upload/folder/:folderId', uploadFileToFolder);
router.post('/upload/task/:taskId', uploadFileToTask);

router.get('/branch/:branchId', getFilesByBranch);
router.get('/folder/:folderId', getFilesByBranch);
router.get('/task/:taskId', getFilesByBranch);

router.post(`/:branchId/folder`, createFolderInBranch);

router.get('/:branchId/folder', getFoldersByBranch);


export default router;