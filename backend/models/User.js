const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.enrolledCourses = data.enrolledCourses || [];
    this.createdAt = data.createdAt || new Date();
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      enrolledCourses: this.enrolledCourses,
      createdAt: this.createdAt
    };
  }
}

module.exports = User; 