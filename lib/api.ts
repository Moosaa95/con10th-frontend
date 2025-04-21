// Simulated API functions with dummy data

// Delay function to simulate network latency
const delay = (ms:any) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProfileData() {
  // Simulate API call delay
  await delay(800)

  // Return dummy profile data
  return {
    name: "Muhammad Bashiru Hassan",
    displayName: "Muhammad Basheer",
    tagline: "Your vision, my design.",
    jobTitle: "Digital Product Designer | Brand/Visual Identity Designer",
    title: "Product Designer",
    location: "Nigeria",
    profileImage: "/placeholder.svg?height=96&width=96",
    bannerDimensions: "1274 x 418 Flag",

    verified: {
      field: "Design",
      date: "2023-05-15",
    },

    tags: [
      {
        name: "Creativity",
        position: "left-[15%] top-2",
        color: "bg-yellow-300",
        rotation: "-rotate-3",
        pointerPosition: "left-5",
      },
      {
        name: "Innovation",
        position: "right-[15%] top-2",
        color: "bg-blue-400",
        rotation: "rotate-3",
        pointerPosition: "right-5",
      },
      {
        name: "Problem solving",
        position: "left-[10%] bottom-10",
        color: "bg-green-400",
        rotation: "rotate-3",
        pointerPosition: "left-5",
      },
      {
        name: "Community",
        position: "right-[10%] bottom-10",
        color: "bg-green-500",
        rotation: "-rotate-3",
        pointerPosition: "right-5",
      },
    ],

    about: {
      shortBio:
        "Offering freelance design services for clients. I'm a freelance designer with 3 years of experience in the industry, dedicated to helping businesses...",
      fullBio:
        "Offering freelance design services for clients. I'm a freelance designer with 3 years of experience in the industry, dedicated to helping businesses achieve their goals through effective visual communication. I specialize in creating user-centered designs that not only look great but also solve real problems. My approach combines creativity with strategic thinking to deliver solutions that drive results. I've worked with clients across various industries, from startups to established brands, helping them establish a strong visual presence and connect with their audience.",
      achievements: ["Freelance Designer - January 2025", "Top 10% in Design - 2024"],
    },

    experience: [
      {
        title: "Senior User Interface Designer",
        company: "Google",
        period: "Nov 2023 - Present",
        description:
          "Leading UI design for enterprise products, collaborating with cross-functional teams to deliver exceptional user experiences.",
      },
      {
        title: "Product Designer",
        company: "Microsoft",
        period: "Jun 2021 - Oct 2023",
        description:
          "Designed user interfaces for cloud-based applications, conducted user research, and created design systems.",
      },
      {
        title: "UI/UX Designer",
        company: "Freelance",
        period: "Jan 2020 - May 2021",
        description: "Worked with various clients to design websites, mobile apps, and branding materials.",
      },
    ],

    skills: [
      { name: "Figma", level: "Expert" },
      { name: "Illustration", level: "Advanced" },
      { name: "Design", level: "Expert" },
      { name: "Blender", level: "Intermediate" },
    ],

    work: {
      categories: ["ui", "branding", "illustration", "3d"],
      projects: [
        {
          title: "Finance App Redesign",
          category: "ui",
          description: "A modern redesign of a banking application",
          image: "/assets/images/hero/expert.png",
          client: "FinTech Inc.",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
          ],
        },
        {
          title: "E-commerce Brand Identity",
          category: "branding",
          description: "Complete brand identity for an online store",
          image: "/placeholder.svg?height=200&width=300",
          client: "ShopEasy",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
            { name: "Design"},
            { name: "Blender"},
          ],
        },
        {
          title: "Product Illustrations",
          category: "illustration",
          description: "Custom illustrations for product pages",
          image: "/placeholder.svg?height=200&width=300",
          client: "TechGadgets",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
            { name: "Design"},
            { name: "Blender"},
          ],
        },
        {
          title: "3D Product Visualization",
          category: "3d",
          description: "Realistic 3D renders of consumer products",
          image: "/placeholder.svg?height=200&width=300",
          client: "HomeGoods",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
            { name: "Design"},
            { name: "Blender"},
          ],
        },
        {
          title: "Mobile App UI Kit",
          category: "ui",
          description: "Comprehensive UI components for mobile apps",
          image: "/placeholder.svg?height=200&width=300",
          client: "AppDev Studio",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
            { name: "Design"},
            { name: "Blender"},
          ],
        },
        {
          title: "Corporate Rebrand",
          category: "branding",
          description: "Complete rebranding for a corporate client",
          image: "/placeholder.svg?height=200&width=300",
          client: "Business Solutions",
          skills: [
            { name: "Figma"},
            { name: "Illustration"},
            { name: "Design"},
            { name: "Blender"},
          ],
        },
      ],
    },

    offers: [
      {
        id: 1,
        title: "UI/UX Design Package",
        price: 1200,
        description: "Complete design solution for your digital product, from wireframes to high-fidelity prototypes.",
        includes: [
          "User research and analysis",
          "Wireframing and prototyping",
          "High-fidelity UI design",
          "Interactive prototype",
          "Design system documentation",
          "2 rounds of revisions",
        ],
      },
      {
        id: 2,
        title: "Brand Identity Package",
        price: 1500,
        description: "Comprehensive brand identity design to establish a strong visual presence for your business.",
        includes: [
          "Logo design (3 concepts)",
          "Brand guidelines",
          "Business card and letterhead",
          "Social media assets",
          "Basic marketing materials",
          "3 rounds of revisions",
        ],
      },
      {
        id: 3,
        title: "Custom Illustration Package",
        price: 800,
        description: "Unique illustrations to enhance your brand storytelling and visual communication.",
        includes: [
          "Style exploration",
          "5 custom illustrations",
          "Source files included",
          "Usage rights for all platforms",
          "2 rounds of revisions",
        ],
      },
    ],

    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-03-15",
        comment:
          "Muhammad delivered exceptional work for our app redesign. His attention to detail and understanding of our users' needs resulted in a significant improvement in our user engagement metrics.",
        projectType: "UI/UX Design",
      },
      {
        id: 2,
        name: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2024-02-20",
        comment:
          "Great work on our brand identity. The logo and brand guidelines have helped us establish a consistent presence across all channels.",
        projectType: "Brand Identity",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2024-01-10",
        comment:
          "The illustrations Muhammad created for our website perfectly capture our brand personality. Very satisfied with the results!",
        projectType: "Illustration",
      },
      {
        id: 4,
        name: "Michael Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 3,
        date: "2023-12-05",
        comment:
          "Good work overall, though we needed more revisions than initially planned. Communication was excellent throughout the process.",
        projectType: "UI Design",
      },
    ],
  }
}
