const API_URL = 'http://localhost:5000/api';

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};

// Course Services
export const courseService = {
  getAllCourses: async () => {
    const response = await fetch(`${API_URL}/courses`);
    return response.json();
  },

  getCourseById: async (id) => {
    const token = localStorage.getItem('token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    const response = await fetch(`${API_URL}/courses/${id}`, { headers });
    return response.json();
  },

  enrollInCourse: async (courseId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId })
    });
    return response.json();
  },

  updateProgress: async (courseId, progressData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments/progress/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(progressData)
    });
    return response.json();
  }
};

// User Services
export const userService = {
  getEnrolledCourses: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/enrolled`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    return response.json();
  }
}; 