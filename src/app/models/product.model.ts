export interface Butler {
  userId: string;
  type: number;
  name: string;
  age: number;
  sex: number;
  experience: number;
  skill: string[];
  avatar: string;
  post: string;
  price: number;
  origin: string;
  level?: number;
  like?: boolean;
}
