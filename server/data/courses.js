const courses = [
  {
    id: "1",
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity with hands-on practice.",
    difficulty: "Beginner",
    duration: "4 weeks",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    category: "fundamentals",
    modules: 8,
    students: "15,543",
    rating: 4.8,
    isFree: true,
    price: {
      amount: 0,
      type: "Free"
    }
  },
  {
    id: "2",
    title: "Web Application Security",
    description: "Master web security concepts, including XSS, CSRF, and SQL injection.",
    difficulty: "Intermediate",
    duration: "6 weeks",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    category: "web",
    modules: 12,
    students: "8,721",
    rating: 4.9,
    isFree: true,
    price: {
      amount: 0,
      type: "Free"
    }
  },
  {
    id: "3",
    title: "Network Security Basics",
    description: "Learn essential network security concepts and tools.",
    difficulty: "Beginner",
    duration: "4 weeks",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    category: "network",
    modules: 6,
    students: "12,932",
    rating: 4.7,
    isFree: true,
    price: {
      amount: 0,
      type: "Free"
    }
  },
  {
    id: "4",
    title: "Advanced Penetration Testing",
    description: "Advanced techniques for ethical hacking and penetration testing.",
    difficulty: "Advanced",
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "network",
    modules: 15,
    students: "5,234",
    rating: 4.9,
    isFree: true,
    price: {
      amount: 0,
      type: "Free"
    }
  },
  {
    id: "5",
    title: "Security Awareness Training",
    description: "Essential security awareness training for everyone.",
    difficulty: "Beginner",
    duration: "2 weeks",
    image: "https://images.unsplash.com/photo-1560732488-6b0df240254a",
    category: "fundamentals",
    modules: 5,
    students: "20,845",
    rating: 4.6,
    isFree: true,
    price: {
      amount: 0,
      type: "Free"
    }
  }
];

module.exports = courses; 