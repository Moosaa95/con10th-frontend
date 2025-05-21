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

export interface IOffer { 
  id: string;
  title: string;
  description: string;
  price: number;
  requirements: string[];
  expert: Expert;
  ratings: {
    // TODO change to client
    client: Expert;
    rating: number;
    review: string;
    date: string;
  }[]
  imageSrc: string;
  imageAlt?: string;
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

export interface IOrder {
  id: string;
  expertName: string;
  serviceOrdered: string;
  price: number;
  status: string;
  orderDate: string;
  deliveryDeadline: string;
}

export interface IPayment {
  id: string;
  serviceSold: string;
  expertName: string;
  amountPaid: number;
  datePaid: string;
  status: string;
}