import Project from '../models/Project.js';
import Branch from '../models/Branch.js';
import Task from '../models/Task.js';

export const  createBranch = async (req, res) => {
  try {
    const { projectId } = req.params
    const { name, description, leader, members } = req.body
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    if (!name) {
      return res.status(400).json({ message: "Branch name is required" })
    };
    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    if (project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: "Only project admin can create branches" })
    }
    const branch = new Branch({
      name,
      admin: req.userId,
      leader: leader,
      members: members,
      tasks: [],
      conversations: [],
      description: description || "No description provided",
      projectId: projectId
    });
    const savedBranch = await branch.save();
    project.branches.push({ _id: savedBranch._id, name: savedBranch.name })
    await project.save();
    return res.status(201).json(savedBranch)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  } 
}

export const getBranchById = async (req, res) => {

  try {
    const { projectId, branchId } = req.params

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    const branch = await Branch.findById(branchId)
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" })
    }
    if (project._id.toString() !== branch.projectId.toString()) {
      return res.status(403).json({ message: "Access denied" })
    }
    // populate members, leader and admin fields with name and email only
    await branch.populate('members', 'name email img')
    await branch.populate('leader', 'name email img')
    await branch.populate('admin', 'name email img')

    return res.status(200).json(branch)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}

export const getAllBranchesUserIn = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    // If the user is admin load all the branches
    let branches;
    if (project.admin.toString() === req.userId) {
      branches = await Branch.find({ projectId: projectId })
    } else {
      branches = await Branch.find({ projectId: projectId, members: req.userId })
      // also push to the branches array the branch where the user is leader
      const leaderBranches = await Branch.find({ projectId: projectId, leader: req.userId })
      branches = branches.concat(leaderBranches)
    }
    return res.status(200).json(branches)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}


// Remove member from branch
export const removeMemberFromBranch = async (req, res) => {
  try {
    const { projectId, branchId } = req.params
    const { memberId } = req.body
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const project = await Project.findById(projectId)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    const branch = await Branch.findById(branchId)
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" })
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" })
    }
    if (branch.admin.toString() !== req.userId) {
      return res.status(403).json({ message: "Only branch admin can remove members" })
    }
    branch.members = branch.members.filter(_id => _id.toString() !== memberId)
    await branch.save()
    return res.status(200).json({ message: "Member removed from branch" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}

export const addMembersToBranch = async (req, res) => {
  try {
    const { projectId, branchId } = req.params;
    const { memberIds } = req.body; // Array of user IDs to add
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" });
    }

    // checking if the user is already a member of the project
    memberIds.forEach(memberId => {
      if (branch.members.includes(memberId)) {
        return;
      }else{
        branch.members.push(memberId);
      }
    });

    // Add members to the branch
    await branch.save();
    return res.status(200).json({ message: "Members added to branch" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}


export const editBranchDetails = async (req, res) => {
  try {
    const { projectId, branchId } = req.params
    const { name, description } = req.body
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const branch = await Branch.findById(branchId)
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" })
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" })
    }
    branch.name = name
    branch.description = description
    await branch.save()
    return res.status(200).json({ message: "Branch details updated successfully" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}


export const deleteBranch = async (req, res) => {
  try {
    const { projectId, branchId } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    if (branch.projectId.toString() !== projectId) {
      return res.status(400).json({ message: "Branch does not belong to the specified project" });
    }
    if (branch.admin.toString() !== req.userId && project.admin.toString() !== req.userId) {
      return res.status(403).json({ message: "Only branch or project admin can delete the branch" });
    }
    await Branch.findByIdAndDelete(branchId);
    // remove branch from project's branches array
    project.branches = project.branches.filter(b => b._id.toString() !== branchId);
    await project.save();

    // remove all tasks associated with the branch
    await Task.deleteMany({ branchId });

    return res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
