import { User, Course, Lab, Module } from '../types';

const STORAGE_KEYS = {
  USERS: 'users',
  COURSES: 'courses',
  LABS: 'labs',
} as const;

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React development',
    price: {
      amount: 0,
      type: 'Free'
    },
    level: 'Beginner',
    duration: '4 weeks',
    modules: [
      {
        title: 'Getting Started',
        content: 'Introduction to React concepts'
      },
      {
        title: 'Components',
        content: 'Understanding React components'
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master JavaScript programming',
    price: {
      amount: 0,
      type: 'Free'
    },
    level: 'Advanced',
    duration: '8 weeks',
    modules: [
      {
        title: 'ES6 Features',
        content: 'Modern JavaScript features'
      },
      {
        title: 'Async Programming',
        content: 'Promises and async/await'
      }
    ]
  }
];

const sampleLabs: Lab[] = [
  {
    id: '1',
    title: 'React Todo App',
    description: 'Build a simple todo application'
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Connect your app to a REST API'
  }
];

const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(sampleCourses));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LABS)) {
    localStorage.setItem(STORAGE_KEYS.LABS, JSON.stringify(sampleLabs));
  }
};

initializeStorage();

export const storageService = {
  getUsers: (): User[] => 
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
    
  addUser: (user: Omit<User, 'id'>): void => {
    const users = storageService.getUsers();
    users.push({ ...user, id: Date.now().toString() });
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  getCourses: (): Course[] => 
    JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]'),
    
  addCourse: (course: Omit<Course, 'id'>): void => {
    const courses = storageService.getCourses();
    courses.push({ ...course, id: Date.now().toString() });
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },
  
  getCourseById: (id: string): Course | undefined => {
    const courses = storageService.getCourses();
    return courses.find(course => course.id === id);
  },
  
  getLabs: (): Lab[] => 
    JSON.parse(localStorage.getItem(STORAGE_KEYS.LABS) || '[]'),
    
  addLab: (lab: Omit<Lab, 'id'>): void => {
    const labs = storageService.getLabs();
    labs.push({ ...lab, id: Date.now().toString() });
    localStorage.setItem(STORAGE_KEYS.LABS, JSON.stringify(labs));
  }
}; 