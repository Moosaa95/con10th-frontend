"use client"

import AboutTab from "@/components/profile/About"
import WorkTab from "@/components/profile/Work"
import { fetchProfileData } from "@/lib/api"
import { Heart, Loader2, MessageCircle, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"


export default function ExpertDetailsPage() {
    const [activeTab, setActiveTab] = useState("about")
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    

    useEffect(() => {
        const loadData = async () => {
          setLoading(true)
          try {
            // Simulate API call delay
            const data = await fetchProfileData()
            setProfileData(data)
            console.log("PROFILE", profileData);
            
          } catch (error) {
            console.error("Failed to load profile data:", error)
          } finally {
            setLoading(false)
          }
        }
    
        loadData()
      }, [])
    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )
      }
    
      if (!profileData) {
        return <div className="text-center p-8">Failed to load profile data</div>
      }
    
      const { name, tagline, jobTitle, location, verified, skills, experience, about } = profileData
    const renderTabContent = () => {
        console.log(activeTab)
        switch (activeTab) {
            case "about":
                return <AboutTab about={about} experience={experience} skills={skills} />
            case "work":
                return <WorkTab work={profileData.work} />
            case "projects":
                return <div>Projects</div>
            case "certifications":
                return <div>Certifications</div>
            case "skills":
                return <div>Skills</div>
            default:
                return <div>About</div>
        }
    }

    console.log("PROFILE DATA", profileData);


    return (
        <div className="container mx-auto px-5 flex flex-col min-h-screen">
            {/* page header */}
            <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 gap-4 h-auto">
                <div className="bg-blue-400 text-white p-6 pt-12 pb-16 text-center relative">
                    {profileData.tags.map((tag, index) => (
                        <div
                            key={index}
                            className={`absolute ${tag.position} ${tag.color} text-black text-xs px-2 py-0.5 rounded transform ${tag.rotation}`}
                        >
                            <span>{tag.name}</span>
                            <div
                                className={`absolute w-2 h-2 ${tag.color} transform rotate-45 -bottom-1 ${tag.pointerPosition}`}
                            ></div>
                            
                        </div>
                    ))}
                    <h1 className="text-3xl font-bold mb-1">{name}</h1>
                    <p className="text-lg italic mb-2">{tagline}</p>
                    <p className="text-lg">{jobTitle}</p>
                </div>
                {/* Profile picture */}
                <div className="absolute -bottom-12 left-7 top-32 ">
                    <div className="w-[150px] h-[150px] rounded-full border-4 border-gray-300 overflow-hidden">
                    <Image
                        src={"/placeholder.svg"}
                        alt={name}
                        width={96}
                        height={96}
                        className="object-cover"
                    />
                    </div>
                    
                </div>
                {/* Divider line */}
                {/* <div className="absolute bottom-0 left-0 right-0  h-0.5 bg-gray-500"></div> */}
                {/* Profile details */}
                <div className="pt-20 px-6 pb-9 flex justify-between items-start">
                    <div>
                        <h2 className="text-accent-color-700 font-bold text-2xl">{profileData.displayName}</h2>
                        <div className="flex items-center space-x-2 text-sm  mt-1">
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-green-500 font-normal">Verified Expert in {verified.field}</span>
                        </div>
                        <div className="flex items-center space-x-2 font-medium text-sm text-gray-900 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                            </svg>
                            <span>{profileData.title}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{location}</span>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="text-primary-700 bg-white w-[41.5px] h-[41.5px] shadow-md rounded-md items-center justify-center flex hover:text-primary-900 transition-colors">
                            <MessageCircle className="w-6 h-6" />
                        </button>
                        <button
                            className={`bg-white w-[41.5px] h-[41.5px] shadow-md rounded-md items-center justify-center flex ${liked ? "text-red-500" : "text-primary-700"} hover:text-red-500 transition-colors`}
                            onClick={() => setLiked(!liked)}
                        >
                            <Heart className="w-6 h-6" fill={liked ? "currentColor" : "none"} />
                        </button>
                        <button className="text-primary-700 hover:text-primary-900 bg-white w-[41.5px] h-[41.5px] shadow-md rounded-md items-center justify-center flex transition-colors">
                            <MoreHorizontal className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Navigation tabs */}
            <div className="border-b border-gray-200 pt-6">
                <div className="flex space-x-6">
                    {["about", "work", "offers", "reviews"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="relative pb-3 text-base font-medium text-gray-500 hover:text-gray-700 transition"
                    >
                        <span className={`${activeTab === tab ? "text-accent-color-700" : ""}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </span>

                        {/* underline only for active tab */}
                        {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent-color-700" />
                        )}
                    </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="py-4">{renderTabContent()}</div>

        </div>
    )
}
