const User = require('../models/User');

// In-memory storage with persistence to localStorage
const store = {
  users: [],
  courses: [
    {
      id: 1,
      title: "Network Penetration Testing",
      description: "Master advanced network penetration testing techniques.",
      duration: "4 Weeks",
      level: "Advanced",
      price: 0
    },
    {
      id: 2,
      title: "Web Application Security",
      description: "Learn web application security testing.",
      duration: "4 Weeks",
      level: "Intermediate",
      price: 0
    }
  ],
  enrollments: [],

  // Save data to localStorage
  save() {
    const data = {
      users: this.users.map(user => user.toJSON()),
      enrollments: this.enrollments
    };
    console.log('Saving store:', { 
      userCount: this.users.length, 
      enrollmentCount: this.enrollments.length 
    });
    try {
      localStorage.setItem('geekbench_store', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving store:', error);
    }
  },

  // Load data from localStorage
  load() {
    try {
      const data = localStorage.getItem('geekbench_store');
      if (data) {
        const parsed = JSON.parse(data);
        this.users = (parsed.users || []).map(userData => new User(userData));
        this.enrollments = parsed.enrollments || [];
        console.log('Loaded store:', { 
          userCount: this.users.length, 
          enrollmentCount: this.enrollments.length 
        });
      }
    } catch (error) {
      console.error('Error loading store:', error);
      this.users = [];
      this.enrollments = [];
    }
  },

  // Add user
  addUser(userData) {
    const user = new User(userData);
    this.users.push(user);
    console.log('Added user:', { id: user.id, email: user.email });
    this.save();
    return user;
  },

  // Find user by email
  findUserByEmail(email) {
    const user = this.users.find(u => u.email === email);
    console.log('Finding user by email:', email, user ? 'Found' : 'Not found');
    return user;
  },

  // Find user by id
  findUserById(id) {
    const user = this.users.find(u => u.id === id);
    console.log('Finding user by ID:', id, user ? 'Found' : 'Not found');
    return user;
  },

  // Add enrollment
  addEnrollment(enrollment) {
    this.enrollments.push(enrollment);
    console.log('Added enrollment:', enrollment);
    this.save();
    return enrollment;
  },

  // Get user enrollments
  getUserEnrollments(userId) {
    const enrollments = this.enrollments.filter(e => e.userId === userId);
    console.log('Getting user enrollments:', { userId, count: enrollments.length });
    return enrollments;
  },

  // Clear store
  clearStore() {
    this.users = [];
    this.enrollments = [];
    this.save();
    console.log('Store cleared');
  }
};

// Initialize store
store.load();

module.exports = store; 