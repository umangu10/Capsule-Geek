import { courseService } from '../services/api';

// In your useEffect:
useEffect(() => {
  const fetchCourseData = async () => {
    try {
      const data = await courseService.getCourseById(id);
      if (data.success) {
        setCourseData(data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  fetchCourseData();
}, [id]);

// In your handleEnrollClick:
const handleEnrollClick = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      setToastMessage('Please login to enroll in this course');
      setToastType('info');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setLoading(true);
    const data = await courseService.enrollInCourse(id);

    if (data.success) {
      setIsEnrolled(true);
      setToastMessage('Successfully enrolled in course!');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => {
        navigate(`/courses/${id}/learn`);
      }, 1500);
    }
  } catch (error) {
    setToastMessage('Failed to enroll in course');
    setToastType('error');
    setShowToast(true);
  } finally {
    setLoading(false);
  }
}; 