const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../data/store');

exports.register = async (req, res) => {
  try {
    console.log('Registration request:', req.body);
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const existingUser = store.findUserByEmail(email);
    console.log('Existing user check:', existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: Date.now().toString(), // Convert to string for consistency
      name,
      email,
      password: hashedPassword,
      enrolledCourses: [],
      createdAt: new Date()
    };

    // Add user to store
    store.addUser(newUser);
    console.log('User registered successfully:', { id: newUser.id, email: newUser.email });

    // Create token
    const token = jwt.sign(
      { id: newUser.id },
      'your_jwt_secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in registration',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Find user
    const user = store.findUserByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id },
      'your_jwt_secret',
      { expiresIn: '30d' }
    );

    console.log('Login successful for user:', user.email);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in login',
      error: error.message
    });
  }
};

exports.getUserById = (id) => {
  const user = store.findUserById(id);
  console.log('Getting user by ID:', id, user ? 'Found' : 'Not found');
  return user;
};