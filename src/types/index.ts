export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Module {
  title: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  price: {
    amount: number;
    type: string;
  };
  level: string;
  duration: string;
  enrolled?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
} 