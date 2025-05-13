// import * as React from "react"
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { ButtonProps, buttonVariants } from "@/components/ui/button"

// const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
//   <nav
//     role="navigation"
//     aria-label="pagination"
//     className={cn("mx-auto flex w-full justify-center", className)}
//     {...props}
//   />
// )
// Pagination.displayName = "Pagination"

// const PaginationContent = React.forwardRef<
//   HTMLUListElement,
//   React.ComponentProps<"ul">
// >(({ className, ...props }, ref) => (
//   <ul
//     ref={ref}
//     className={cn("flex flex-row items-center gap-1", className)}
//     {...props}
//   />
// ))
// PaginationContent.displayName = "PaginationContent"

// const PaginationItem = React.forwardRef<
//   HTMLLIElement,
//   React.ComponentProps<"li">
// >(({ className, ...props }, ref) => (
//   <li ref={ref} className={cn("", className)} {...props} />
// ))
// PaginationItem.displayName = "PaginationItem"

// type PaginationLinkProps = {
//   isActive?: boolean
// } & Pick<ButtonProps, "size"> &
//   React.ComponentProps<"a">

// const PaginationLink = ({
//   className,
//   isActive,
//   size = "icon",
//   ...props
// }: PaginationLinkProps) => (
//   <a
//     aria-current={isActive ? "page" : undefined}
//     className={cn(
//       buttonVariants({
//         variant: isActive ? "outline" : "ghost",
//         size,
//       }),
//       className
//     )}
//     {...props}
//   />
// )
// PaginationLink.displayName = "PaginationLink"

// const PaginationPrevious = ({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) => (
//   <PaginationLink
//     aria-label="Go to previous page"
//     size="default"
//     className={cn("gap-1 pl-2.5", className)}
//     {...props}
//   >
//     <ChevronLeft className="h-4 w-4" />
//     <span>Previous</span>
//   </PaginationLink>
// )
// PaginationPrevious.displayName = "PaginationPrevious"

// const PaginationNext = ({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) => (
//   <PaginationLink
//     aria-label="Go to next page"
//     size="default"
//     className={cn("gap-1 pr-2.5", className)}
//     {...props}
//   >
//     <span>Next</span>
//     <ChevronRight className="h-4 w-4" />
//   </PaginationLink>
// )
// PaginationNext.displayName = "PaginationNext"

// const PaginationEllipsis = ({
//   className,
//   ...props
// }: React.ComponentProps<"span">) => (
//   <span
//     aria-hidden
//     className={cn("flex h-9 w-9 items-center justify-center", className)}
//     {...props}
//   >
//     <MoreHorizontal className="h-4 w-4" />
//     <span className="sr-only">More pages</span>
//   </span>
// )
// PaginationEllipsis.displayName = "PaginationEllipsis"

// export {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// }


"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  prevPage,
  nextPage,
  ...props
}: React.ComponentProps<"nav"> & {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}) => {
  // Generate page numbers array
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <PaginationPrevious onClick={prevPage} disabled={currentPage === 1} />

        <PaginationContent>
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink isActive={currentPage === number} onClick={() => onPageChange(number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>

        <PaginationNext onClick={nextPage} disabled={currentPage === totalPages} />
      </div>
    </nav>
  )
}

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">

const PaginationLink = ({ className, isActive, disabled, size = "icon", ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "outline",
        size,
      }),
      disabled && "pointer-events-none opacity-50",
      isActive && "bg-[#ff5d00] hover:bg-[#ff5d00]/90 border-[#ff5d00]",
      !isActive && "border-[#e0e4ea] text-[#09233e] hover:bg-[#f5f8ff] hover:text-[#09233e]",
      "h-9 w-9",
      className,
    )}
    disabled={disabled}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      "h-9 w-9 p-0",
      disabled
        ? "border-[#e0e4ea] bg-[#f5f8ff] text-[#8292aa]"
        : "border-[#e0e4ea] bg-white text-[#09233e] hover:bg-[#f5f8ff]",
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      "h-9 w-9 p-0",
      disabled
        ? "border-[#e0e4ea] bg-[#f5f8ff] text-[#8292aa]"
        : "border-[#e0e4ea] bg-white text-[#09233e] hover:bg-[#f5f8ff]",
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("h-9 w-9 flex items-center justify-center text-sm font-medium", className)}
      {...props}
    >
      ...
    </span>
  ),
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
