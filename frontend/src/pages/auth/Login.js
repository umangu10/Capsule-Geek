import { authService } from '../../services/api';

// In your handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const data = await authService.login(formData);
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/courses');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (error) {
    setError('Failed to connect to server');
  } finally {
    setLoading(false);
  }
}; 