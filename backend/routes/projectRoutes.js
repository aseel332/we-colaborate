import express from 'express';
import {loadProjects, createProject, loadProjectById, addMemberToProject, editProjectDetails} from '../controllers/projectController.js';
import { addMembersToBranch, createBranch, editBranchDetails, getAllBranchesUserIn, getBranchById, removeMemberFromBranch, deleteBranch } from '../controllers/branchController.js';
import { createTask, getTaskById, loadTaskUserIn, removeMemberFromTask, addMembersToTask, modifyTaskDetails, deleteTask } from '../controllers/taskController.js';
import { loadConversationByTaskId, addMessageToConversation, addMessageToConversationInBranch, loadAllConversationsByBranchId } from '../controllers/conversationController.js';

const router = express.Router();

// Project routes
router.get('/', loadProjects);
router.post('/', createProject);
router.get('/:projectId', loadProjectById);
router.post('/join/:projectId', addMemberToProject);

// Project Management routes
router.put('/:projectId', editProjectDetails);

// Branch routes
router.post('/:projectId/branches/', createBranch);
router.get('/:projectId/branches', getAllBranchesUserIn);
router.get('/:projectId/branches/:branchId', getBranchById);

// Branch Management routes
router.put('/:projectId/branches/:branchId', editBranchDetails);
router.delete('/:projectId/branches/:branchId', deleteBranch);
router.put('/:projectId/branches/:branchId/remove-member', removeMemberFromBranch);
router.put('/:projectId/branches/:branchId/add-members', addMembersToBranch);

// Task routes
router.post('/:projectId/branches/:branchId/tasks', createTask);
router.get('/:projectId/branches/:branchId/tasks', loadTaskUserIn);
router.get('/:projectId/branches/:branchId/tasks/:taskId', getTaskById);


// Conversation routes
router.get('/:projectId/branches/:branchId/tasks/:taskId/conversation', loadConversationByTaskId);
router.post('/:projectId/branches/:branchId/tasks/:taskId/conversation', addMessageToConversation);
router.get('/:projectId/branches/:branchId/conversation', loadAllConversationsByBranchId);
router.post('/:projectId/branches/:branchId/conversation', addMessageToConversationInBranch);


// Task management routes
router.put('/:projectId/branches/:branchId/tasks/:taskId/remove-member', removeMemberFromTask);
router.put('/:projectId/branches/:branchId/tasks/:taskId/add-members', addMembersToTask);
router.put('/:projectId/branches/:branchId/tasks/:taskId/modify', modifyTaskDetails);
router.delete('/:projectId/branches/:branchId/tasks/:taskId/', deleteTask);

export default router;