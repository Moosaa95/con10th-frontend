"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"


interface SkillCardProps {
  id: string
  name: string
  className?: string
  image?: string;
}


export function CategoryCard({ id, name, image="" }: SkillCardProps) {

  return (
    <Link
      href={`/search/${id}`}
      className="flex-shrink-0 w-[215px] h-[287px] relative rounded-[4px] overflow-hidden group cursor-pointer"
    >
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity"></div>
            <div className="absolute inset-0 w-[141px] h-[23px] top-8 left-4 flex items-center justify-center">
              <span className="text-white font-bold md:text-xl text-center px-2">{name}</span>
            </div>
    </Link>
  )
}

