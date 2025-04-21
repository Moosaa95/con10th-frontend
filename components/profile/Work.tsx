import { useState } from "react"
import WorkDetail from "./Work-Detail"
import { Heart, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function WorkTab({work}) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedProject, setSelectedProject] = useState(null)
    const [likedProjects, setLikedProjects] = useState([])

    console.log(work, 'work')

    const filteredProjects = 
        selectedCategory === "all"
            ? work.projects 
            : work.projects.filter(project => project.category === selectedCategory)
    

    const toggleLike = (projectId) => {
        if (likedProjects.includes(projectId)) {
            setLikedProjects(likedProjects.filter(id => id !== projectId))
        } else {
            setLikedProjects([...likedProjects, projectId])
        }
    }

    console.log('eaker', filteredProjects);
    

    if (selectedProject) {
        return (
          <WorkDetail
            project={selectedProject}
            isLiked={likedProjects.includes(selectedProject.id)}
            onToggleLike={() => toggleLike(selectedProject.id)}
          />
        )
      }

    
    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-6">
                <button 
                    className={`px-3 py-1 text-sm rounded-full ${
                        selectedCategory === "all" ? "bg-primary-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                    }`}
                    onClick={() => setSelectedCategory("all")}
                >
                    All
                </button>
                {work && work.categories.map(category => (
                    <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full ${
                            selectedCategory === category ? "bg-primary-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Project grid */}
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (

                    <div
                        key={project.title}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white hover:shadow-md transition-shadow"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div 
                            className="aspect-w-16 aspect-h-12 relative cursor-pointer"
                            onClick={() => setSelectedProject(project)}

                        >
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                            />

                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium text-gray-800 cursor-pointer" onClick={() => setSelectedProject(project)}>{project.title}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        className={`${likedProjects.includes(project.title) ? "text-red-500" : "text-gray-400"} hover:text-red-500`}
                                        onClick={() => toggleLike(project.title)}
                                    >
                                        <Heart className="w-6 h-6" fill={likedProjects.includes(project.title) ? "currentColor" : "none"} />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project && project.skills.map((skill, index) => (
                                    <span
                                        key={skill.name}
                                        className="px-3 py-1 text-xs rounded-full border border-accent-color-200 text-accent-color-700 bg-white"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredProjects.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No projects found</p>
                </div>
            )}
        </div>
)

}