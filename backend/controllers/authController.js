import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try { 

    const { email, password, name } = req.body;

    // Checking For already existing user 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    } 
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Creating a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name
    });

    await newUser.save();

    // Generate Token
    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong'  });
  } 
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);  
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }    

    // Generate Token
    const token = jwt.sign({id: user._id}, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  } 
} 