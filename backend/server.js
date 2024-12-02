const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize users array
let users = [];

// Generate unique user ID
const generateUserId = () => {
    return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
};

// Create initial test user
const initializeTestUser = async () => {
    try {
        // Only create if not exists
        if (!users.find(u => u.email === 'test@example.com')) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            
            const testUser = {
                id: generateUserId(),
                username: 'testuser',
                email: 'test@example.com',
                password: hashedPassword
            };
            
            users.push(testUser);
            console.log('Test user created successfully');
        }
    } catch (error) {
        console.error('Error creating test user:', error);
        throw new Error('Failed to initialize test user');
    }
};

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', {
      email: req.body.email,
      usersCount: users.length
    });

    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match for user:', email);
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

    console.log('Login successful for:', email);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
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
});

// Initialize server
const PORT = process.env.PORT || 3000;

// Initialize test user and start server
(async () => {
    try {
        await initializeTestUser();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
})();