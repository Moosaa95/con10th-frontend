export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Skill {
    id: number;
    name: string;
  }
  
  // export interface Expert {
  //   id: number;
  //   user: User;
  //   full_name: string;
  //   profile_pic: string | null;
  //   title: string;
  //   categories: Category[];
  //   skills: Skill[];
  //   experience_level: 'entry' | 'inter' | 'expert' | 'professional';
  //   average_response_time: string;
  //   is_available: boolean;
  //   location: string;
  //   rating: number;
  // }
  export interface PortfolioItem {
    title: string
    description: string
    image: string
  }

  export interface SkillItem {
    id?: string;
    name: string;
  }

  export interface Expert {
    expert_id: string;
    first_name: string;
    last_name: string;
    title: string;
    category: string;
    skills: SkillItem[];
    profile_picture: string;
    rating: number;
    reviews: number;
    location: string;
    hourly_rate: number;
    is_available: boolean;
    response_time: string;
    joined_date: string;
    experience_level: string;
    bio: string;
    email: string;
    phone: string;
    portfolio?: PortfolioItem[];
  }
  
export interface IPromo {
  variant: "client" | "expert"
  label: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  imageSrc: string
  imageAlt?: string
}