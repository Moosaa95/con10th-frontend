import { client, experts } from "./testData"
import { IServiceOffered } from "./types/expert";

export const serviceOfferedData: IServiceOffered[] = [
  {
    id: "service-1",
    title: "Professional Logo Design",
    description: "Custom logo design with unlimited revisions",
    price: 299,
    client: client,
    expert: experts[0],
    status: "in_progress",
    createdAt: "2025-05-25",
    paymentStatus: "paid",
    deliveryDate: "2025-06-01",
    client_marked_as_completed: false,
    expert_marked_as_completed: false,
    client_cancelled: false,
    expert_cancelled: false
  },
  {
    id: "service-2",
    title: "Website UI/UX Design",
    description: "Complete website redesign with modern UI/UX principles",
    price: 799,
    client: client,
    expert: experts[1],
    status: "completed",
    createdAt: "2025-05-20",
    paymentStatus: "paid",
    deliveryDate: "2025-05-27",
    client_marked_as_completed: true,
    expert_marked_as_completed: true,
    client_cancelled: false,
    expert_cancelled: false
  },
  {
    id: "service-3",
    title: "Social Media Package",
    description: "Monthly social media content design",
    price: 499,
    client: client,
    expert: experts[2],
    status: "pending",
    createdAt: "2025-05-28",
    paymentStatus: "unpaid",
    deliveryDate: "2025-06-05",
    client_marked_as_completed: false,
    expert_marked_as_completed: false,
    client_cancelled: false,
    expert_cancelled: false
  },
  {
    id: "service-4",
    title: "Mobile App Design",
    description: "iOS and Android app design with user flow",
    price: 1299,
    client: client,
    expert: experts[3],
    status: "cancelled",
    createdAt: "2025-05-15",
    paymentStatus: "paid",
    deliveryDate: "2025-05-30",
    client_marked_as_completed: false,
    expert_marked_as_completed: false,
    client_cancelled: true,
    expert_cancelled: false
  },
];
