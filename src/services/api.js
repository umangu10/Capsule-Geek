const API_URL = 'http://localhost:5000/api';

export const authService = {
  login: async (credentials) => {
    try {
      console.log('Sending login request:', {
        url: `${API_URL}/auth/login`,
        email: credentials.email
      });
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};

export const enrollInCourse = async (courseId, token) => {
  const response = await fetch(`${API_URL}/enrollments/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId })
  });
  return response.json();
};

export const updateProgress = async (courseId, moduleId, timeSpent, token) => {
  const response = await fetch(`${API_URL}/enrollments/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId, moduleId, timeSpent })
  });
  return response.json();
};

export const getEnrollmentProgress = async (courseId, token) => {
  const response = await fetch(`${API_URL}/enrollments/progress/${courseId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}; 