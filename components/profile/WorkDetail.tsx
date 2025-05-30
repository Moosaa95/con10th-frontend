"use client"

import { Heart, MoreHorizontal } from "lucide-react"
import Image from "next/image"

interface Skill {
  name: string;
}

interface DetailImage {
  url: string;
  caption?: string;
}

interface Section {
  title: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  skills: Skill[];
  description: string;
  image?: string;
  detailImages?: DetailImage[];
  sections?: Section[];
}

const WorkDetail = ({ project, isLiked, onToggleLike }: { project: Project; isLiked: boolean; onToggleLike: () => void }) => {
    console.log("HEY", project, isLiked, onToggleLike)
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                {/* <button className="flex items-center text-accent-color-700">

                </button> */}
                <h2 className="text-xl font-medium">{project.title}</h2>
                <div className="flex space-x-3">
                    <button className={`${isLiked ? "text-red-500" : "text-primary-700"} bg-white w-[41.5px] h-[41.5px] shadow-md rounded-md items-center justify-center flex hover:text-red-500 transition-colors`}>
                        <Heart className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} onClick={onToggleLike} />
                    </button>
                    <button className="text-primary-400 hover:text-primary-500">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>
            
            {/* Skills tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map((skill, index) => (
                <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full border border-orange-200 text-orange-500 bg-white"
                >
                    {skill.name}
                </span>
                ))}
            </div>


            {/* Project images */}
            <div className="space-y-6">
            {project.detailImages &&
                project.detailImages.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    />
                    {image.caption && <div className="p-3 bg-gray-50 text-sm text-gray-600">{image.caption}</div>}
                </div>
                ))}
    
            {(!project.detailImages || project.detailImages.length === 0) && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                />
                </div>
            )}
            </div>

            {/* Project description */}
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Project Overview</h3>
                <p className="text-gray-700 mb-6">{project.description}</p>

                {project.sections &&
                project.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                    <h4 className="text-md font-medium mb-2">{section.title}</h4>
                    <p className="text-gray-700">{section.content}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default WorkDetail