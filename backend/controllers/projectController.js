
import Branch from '../models/Branch.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

export const loadProjects = async (req, res) => {
  if(!req.userId){
    return res.status(401).json({message: "Unauthorized"});
  }
  const user = await User.findById(req.userId);
  if(!user){
    return res.status(400).json({message: "Invalid user"});
  }
  const Projectids = user.projects;

  if(!Projectids || Projectids.length === 0){
    return res.status(200).json([]); // no projects found
  }

  const projects = await Promise.all(Projectids.map( async (id) => await  Project.findById(id).select('name description img admin createdAt updatedAt')));
  
  if(!projects || projects.length === 0){
    return res.status(200).json([]); // no projects found
  }
  res.status(200).json(projects);
 
}

export const createProject = async (req, res) => {

  if(!req.userId){
    return res.status(401).json({message: "Unauthorized"});
  }
  const {name, description,  img} = req.body;
  if(!name  || !description){
    return res.status(400).json({message: "Name and type are required"});
  }
  const user = await User.findById(req.userId);
  if(!user){ 
    return res.status(400).json({message: "Invalid user"});
  };

  
  // Creating main branch for the project

  // Creating a collectionf for the branch assosiated with a particular project

  const branch = new Branch({
    name: "Main", 
    admin: [req.userId],
    leader: req.userId,
    members: [],
    tasks: [],
    conversations: [],
    description: "This is the main branch",
    projectId: "temp", // will be updated after creating project
    updatedAt: Date.now(),
    createdAt: Date.now()

  });

  

  const newProject = new Project({
    name, description, admin: [user], img: img || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  });

  user.projects.push(newProject._id);
  await user.save();
  branch.projectId = newProject._id; // updating the projectId of the main branch
  const mainBranch = await branch.save();
  // Creating a random project link for sharing project acess to users having thre query type (user or admin), project id and a random string as a access key
  const randomString = Math.random().toString(36).substring(2, 15);
  const projectLink = `${process.env.FRONTEND_URL}/join-project?type=user&projectId=${newProject._id}&accessKey=${randomString}`;
  newProject.projectLink = projectLink;
  newProject.password = randomString;

  const adminRandomString = Math.random().toString(36).substring(2, 15);
  const adminLink = `${process.env.FRONTEND_URL}/join-project?type=admin&projectId=${newProject._id}&accessKey=${adminRandomString}`;
  newProject.adminLink = adminLink;   
  newProject.adminPassword = adminRandomString;

  newProject.branches.push({_id: mainBranch._id, name: mainBranch.name});


  newProject.save()
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({message: "Server error", error: err.message})); 

}

// Load a specific project by ID
export const loadProjectById = async (req, res) => {

  if(!req.userId){
    return res.status(401).json({message: "Unauthorized"});
  }
 // project id from body
  const { projectId } = req.params;

  if(!projectId){
    return res.status(400).json({message: "Project ID is required"});
  }
  // getting the entire project details including everything like branches, members, tasks, conversations etc
  const project = await Project.findById(projectId)
    .populate('members', 'username email img name')
    .populate('admin', 'username email img name')
    .then(project => project)
    .catch(err => null) // if error occurs return null  ;

 
  if(!project){
    return res.status(404).json({message: "Project not found"});
  }

  res.status(200).json(project);
}


// adding members to the project
export const addMemberToProject = async (req, res) => {
  if(!req.userId){
    return res.status(401).json({message: "Unauthorized"});
  }
  const { projectId } = req.params;
  const userId = req.userId;
  const {passKey, type} = req.body;
  if(!projectId || !passKey){
    return res.status(400).json({message: "Project ID and passKey are required"});
  }
  // finding user by id
  const user = await User.findById(userId);
  if(!user){
    return res.status(400).json({message: "Invalid user"});
  }
  // finding project by id
  const project = await Project.findById(projectId);
  if(!project){
    return res.status(404).json({message: "Project not found"});
  }
  
  // If the type is admin, add to admin array after checking if it already present and also check if the passKey matches
  if(type === "admin"){
    if(project.admin.includes(userId)){
      return res.status(400).json({message: "User is already an admin of this project"});
    }
    if(project.adminPassword !== passKey){
      return res.status(400).json({message: "Invalid passKey for admin access"});
    }
    // adding user to members of the main branch 
    const mainBranch = await Branch.findOne({projectId: projectId, name: "Main"});
    if(mainBranch && !mainBranch.members.includes(userId)){
      mainBranch.members.push(userId);
      await mainBranch.save();
    }

    project.admin.push(userId);
  } else {
    // If the type is user, add to members array after checking if it already present and also check if the passKey matches
    if(project.members.includes(userId)){
      return res.status(400).json({message: "User is already a member of this project"});
    }
    if(project.password !== passKey){
      return res.status(400).json({message: "Invalid passKey for user access"});
    }
    // adding user to members of the main branch
    const mainBranch = await Branch.findOne({projectId: projectId, name: "Main"});
    if(mainBranch && !mainBranch.members.includes(userId)){
      mainBranch.members.push(userId);
      await mainBranch.save();
    }
    project.members.push(userId);
  }
  // adding project to user's project array
  user.projects.push(projectId);
  await user.save();
  await project.save();
  res.status(200).json({message: "User added to project successfully", project});
}

export const editProjectDetails = async (req, res) => {
  if(!req.userId){
    return res.status(401).json({message: "Unauthorized"});
  }
  const { projectId } = req.params;
  const { name, description, img } = req.body;
  if(!projectId || !name || !description){
    return res.status(400).json({message: "Project ID, name and description are required"});
  }
  const project = await Project.findById(projectId);
  if(!project){
    return res.status(404).json({message: "Project not found"});
  }
  if(!project.admin.includes(req.userId)){
    return res.status(403).json({message: "Forbidden"});
  }
  project.name = name;
  project.description = description;
  if(img){
    project.img = img;
  }
  project.updatedAt = Date.now();
  await project.save();
  res.status(200).json({message: "Project details updated successfully", project});
}
  