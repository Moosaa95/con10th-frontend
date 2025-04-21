"use client"

import { Info } from "lucide-react"
import { useState } from "react"
import SkillItem from "./SkillItem"

interface AboutProps {
    about: {
        achievements: string[]
        fullBio: string
        shortBio: string
    }
    experience: {
        company: string
        title: string
        period: string
    }[]
    skills: {
        id: string;
        name: string;
    }[]
}


export default function AboutTab({ about, experience, skills }: AboutProps) {
    const [showFullBio, setShowFullBio] = useState<boolean>(false)
    const [showAllExperience, setShowAllExperience] = useState<boolean>(false)
    const visibleExperience = showAllExperience ? experience : experience.slice(0, 1)

    return (
        <div>
            {/* Achievements and Bio */}
            <div className="mb-6">
                {about.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center mb-1 font-bold">
                        <span className="text-accent-color-700 mr-1">⭐</span>
                        <span className="text-lg text-neutral-1000 font-normal">{achievement}</span>
                    </div>
                ))}

                <p className="text-lg text-neutral-1000 mb-2">{showFullBio ? about.fullBio : about.shortBio}</p>
                <button className="text-accent-color-700 text-sm hover:underline py-2 px-3" onClick={() => setShowFullBio(!showFullBio)}>
                    {showFullBio ? "Show less" : "Show more"}
                </button>
            </div>
            {/* Experience section */}
            <div className="mb-6 border-[1px] border-gray-200 p-5 gap-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-xl">Experience</h3>
                        <Info className="w-4 h-4 ml-1 text-gray-400" />
                    </div>
                    {experience.length > 1 && (
                        <button
                            className="text-accent-color-700 text-sm hover:underline"
                            onClick={() => setShowAllExperience(!showAllExperience)}
                        >
                            {showAllExperience ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>
                {visibleExperience.map((job, index) => (
                    <div key={index} className="flex mb-4">
                        <div className="mr-3 mt-1">
                            <div className="w-8 h-8 rounded-full bg-accent-color-100 flex items-center justify-center text-accent-color-700">
                                {job.company.charAt(0)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">{job.title}</h4>
                            <p className="text-xs text-gray-500">{job.company}</p>
                            <p className="text-sm text-accent-color-700 mt-1">{job.period}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills section */}
            <div className="border-2 border-gray-200 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                    <h3 className="font-medium text-xl text-neutral-1000">Skills</h3>
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <SkillItem key={index} skill={skill} />
                    ))}
                </div>
            </div>
        </div>
    )

}


// "use client"

// import { useState, useEffect } from "react"
// import { ArrowLeft, MessageCircle, Heart, MoreHorizontal, Loader2 } from "lucide-react"
// import Image from "next/image"
// import { fetchProfileData } from "@/lib/api"
// import AboutTab from "@/components/profile/about-tab"
// import WorkTab from "@/components/profile/work-tab"
// import OffersTab from "@/components/profile/offers-tab"
// import ReviewsTab from "@/components/profile/reviews-tab"

// export default function DesignerProfile() {
//   const [activeTab, setActiveTab] = useState("about")
//   const [profileData, setProfileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [liked, setLiked] = useState(false)

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true)
//       try {
//         // Simulate API call delay
//         const data = await fetchProfileData()
//         setProfileData(data)
//       } catch (error) {
//         console.error("Failed to load profile data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//       </div>
//     )
//   }

//   if (!profileData) {
//     return <div className="text-center p-8">Failed to load profile data</div>
//   }

//   const { name, tagline, jobTitle, location, verified, skills, experience, about } = profileData

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "about":
//         return <AboutTab about={about} experience={experience} skills={skills} />
//       case "work":
//         return <WorkTab work={profileData.work} />
//       case "offers":
//         return <OffersTab offers={profileData.offers} />
//       case "reviews":
//         return <ReviewsTab reviews={profileData.reviews} />
//       default:
//         return <AboutTab about={about} experience={experience} skills={skills} />
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto bg-white min-h-screen">
//       {/* Back button */}
//       <div className="p-4">
//         <button className="flex items-center text-orange-500">
//           <ArrowLeft className="w-4 h-4 mr-1" />
//           <span>Back</span>
//         </button>
//       </div>

//       {/* Profile header */}
//       <div className="relative">
//         {/* Blue banner */}
//         <div className="bg-blue-800 text-white p-6 pt-12 pb-16 text-center relative">
//           {/* Floating tags */}
//           {profileData.tags.map((tag, index) => (
//             <div
//               key={tag.name}
//               className={`absolute ${tag.position} ${tag.color} text-black text-xs px-2 py-0.5 rounded transform ${tag.rotation}`}
//             >
//               <span>{tag.name}</span>
//               <div
//                 className={`absolute w-2 h-2 ${tag.color} transform rotate-45 -bottom-1 ${tag.pointerPosition}`}
//               ></div>
//             </div>
//           ))}

//           <h1 className="text-2xl font-bold mb-1">{name}</h1>
//           <p className="text-sm italic mb-2">{tagline}</p>
//           <p className="text-sm">{jobTitle}</p>
//         </div>

//         {/* Profile picture */}
//         <div className="absolute -bottom-12 left-6">
//           <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
//             <Image
//               src={profileData.profileImage || "/placeholder.svg"}
//               alt={name}
//               width={96}
//               height={96}
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* Divider line */}
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>
//       </div>

//       {/* Profile info */}
//       <div className="pt-16 px-6 pb-4 flex justify-between items-start">
//         <div>
//           <h2 className="text-orange-500 font-medium text-lg">{profileData.displayName}</h2>
//           <div className="flex items-center text-xs text-gray-600 mt-1">
//             <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="text-green-500">Verified Expert in {verified.field}</span>
//           </div>
//           <div className="flex items-center text-xs text-gray-600 mt-1">
//             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//             <span>{profileData.title}</span>
//           </div>
//           <div className="flex items-center text-xs text-gray-600 mt-1">
//             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span>{location}</span>
//           </div>
//         </div>
//         <div className="flex space-x-3">
//           <button className="text-gray-600 hover:text-blue-500 transition-colors">
//             <MessageCircle className="w-5 h-5" />
//           </button>
//           <button
//             className={`${liked ? "text-red-500" : "text-gray-600"} hover:text-red-500 transition-colors`}
//             onClick={() => setLiked(!liked)}
//           >
//             <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
//           </button>
//           <button className="text-gray-600 hover:text-gray-800 transition-colors">
//             <MoreHorizontal className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Navigation tabs */}
//       <div className="border-b border-gray-200">
//         <div className="flex">
//           {["about", "work", "offers", "reviews"].map((tab) => (
//             <button
//               key={tab}
//               className={`px-6 py-3 text-sm font-medium ${
//                 activeTab === tab ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500 hover:text-gray-700"
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Image dimensions */}
//       <div className="px-6 py-3 text-xs text-gray-500 text-center border-b border-gray-200">
//         {profileData.bannerDimensions}
//       </div>

//       {/* Tab content */}
//       <div className="px-6 py-4">{renderTabContent()}</div>
//     </div>
//   )
// }




// "use client"

// import { useState } from "react"

// export default function OffersTab({ offers }) {
//   const [expandedOffer, setExpandedOffer] = useState(null)

//   const toggleOffer = (id) => {
//     if (expandedOffer === id) {
//       setExpandedOffer(null)
//     } else {
//       setExpandedOffer(id)
//     }
//   }

//   return (
//     <div>
//       <h3 className="font-medium mb-4">Services & Packages</h3>

//       <div className="space-y-4">
//         {offers.map((offer) => (
//           <div key={offer.id} className="border border-gray-200 rounded-lg overflow-hidden">
//             <div
//               className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
//               onClick={() => toggleOffer(offer.id)}
//             >
//               <div>
//                 <h4 className="font-medium">{offer.title}</h4>
//                 <p className="text-sm text-gray-500">Starting at ${offer.price}</p>
//               </div>
//               <div className="text-orange-500">
//                 {expandedOffer === offer.id ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </div>
//             </div>

//             {expandedOffer === offer.id && (
//               <div className="p-4 bg-gray-50 border-t border-gray-200">
//                 <p className="text-sm mb-3">{offer.description}</p>

//                 <h5 className="font-medium text-sm mb-2">What's included:</h5>
//                 <ul className="text-sm space-y-1 mb-4">
//                   {offer.includes.map((item, index) => (
//                     <li key={index} className="flex items-start">
//                       <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>

//                 <button className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
//                   Contact for this service
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useState } from "react"
// import Image from "next/image"

// export default function ReviewsTab({ reviews }) {
//   const [sortBy, setSortBy] = useState("recent")

//   // Sort reviews based on selected option
//   const sortedReviews = [...reviews].sort((a, b) => {
//     if (sortBy === "recent") {
//       return new Date(b.date) - new Date(a.date)
//     } else if (sortBy === "highest") {
//       return b.rating - a.rating
//     } else if (sortBy === "lowest") {
//       return a.rating - b.rating
//     }
//     return 0
//   })

//   // Calculate average rating
//   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h3 className="font-medium">Client Reviews</h3>
//           <div className="flex items-center mt-1">
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <svg
//                   key={star}
//                   className={`w-4 h-4 ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-1 text-sm text-gray-600">
//               {averageRating.toFixed(1)} ({reviews.length} reviews)
//             </span>
//           </div>
//         </div>

//         <div>
//           <select
//             className="text-sm border border-gray-300 rounded-md px-2 py-1"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="recent">Most Recent</option>
//             <option value="highest">Highest Rated</option>
//             <option value="lowest">Lowest Rated</option>
//           </select>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {sortedReviews.map((review) => (
//           <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
//             <div className="flex items-start">
//               <div className="mr-3">
//                 <div className="w-10 h-10 rounded-full overflow-hidden">
//                   <Image
//                     src={review.avatar || "/placeholder.svg"}
//                     alt={review.name}
//                     width={40}
//                     height={40}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-sm">{review.name}</h4>
//                     <div className="flex items-center mt-1">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg
//                             key={star}
//                             className={`w-3 h-3 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <span className="ml-2 text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
//                     </div>
//                   </div>

//                   <div className="text-xs text-gray-500">{review.projectType}</div>
//                 </div>

//                 <p className="text-sm mt-2">{review.comment}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// "use client"

// import { useState } from "react"
// import Image from "next/image"

// export default function WorkTab({ work }) {
//   const [selectedCategory, setSelectedCategory] = useState("all")

//   const filteredProjects =
//     selectedCategory === "all"
//       ? work.projects
//       : work.projects.filter((project) => project.category === selectedCategory)

//   return (
//     <div>
//       <div className="mb-6">
//         <h3 className="font-medium mb-4">Portfolio</h3>

//         {/* Category filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <button
//             className={`px-3 py-1 text-sm rounded-full ${
//               selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//             onClick={() => setSelectedCategory("all")}
//           >
//             All
//           </button>
//           {work.categories.map((category) => (
//             <button
//               key={category}
//               className={`px-3 py-1 text-sm rounded-full ${
//                 selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Projects grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {filteredProjects.map((project, index) => (
//             <div
//               key={index}
//               className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//             >
//               <div className="aspect-w-16 aspect-h-9 relative">
//                 <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
//               </div>
//               <div className="p-3">
//                 <h4 className="font-medium text-sm">{project.title}</h4>
//                 <p className="text-xs text-gray-500 mt-1">{project.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <p className="text-center text-gray-500 py-8">No projects found in this category</p>
//         )}
//       </div>
//     </div>
//   )
// }
