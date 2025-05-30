"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { 
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { IServiceOffered } from "@/types/expert"
import Link from "next/link"

export const columns: ColumnDef<IServiceOffered>[] = [

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium text-primary-800 hidden lg:block">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-primary-100/50 -ml-3 sm:-ml-4 px-3 sm:px-4"
        >
          Service
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-primary-500" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium text-primary-900 min-w-[180px]">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "expert.first_name",
    header: "Expert",
    cell: ({ row }) => {
      const expert = row.original.expert
      return (
        <div className="flex items-center gap-2 text-primary-800 min-w-[140px]">
          {expert.first_name} {expert.last_name}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-primary-100/50 -ml-3 sm:-ml-4 px-3 sm:px-4"
        >
          Price
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-primary-500" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium text-primary-800 min-w-[100px]">{formatted}</div>
    },
  },
  {
    accessorKey: "deliveryDate",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-primary-100/50 -ml-3 sm:-ml-4 px-3 sm:px-4 hidden md:flex"
        >
          Delivery Date
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-primary-500" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-primary-800 min-w-[120px] hidden md:block">
        {row.getValue("deliveryDate")}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus: string = row.getValue("paymentStatus")
      const styles = {
        paid: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80",
        unpaid: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80",
      }
      return (
        <div className="min-w-[120px]">
          <Badge className={`${styles[paymentStatus as keyof typeof styles]} font-medium border text-xs sm:text-sm px-2 sm:px-2.5`}>
            {paymentStatus.replace("_", " ")}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status")
      const styles = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80",
        in_progress: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100/80",
        completed: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80",
        cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80",
      }
      return (
        <div className="min-w-[100px]">
          <Badge className={`${styles[status as keyof typeof styles]} font-medium border text-xs sm:text-sm px-2 sm:px-2.5`}>
            {status.replace("_", " ")}
          </Badge>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button
        //       variant="ghost"
        //       className="h-8 w-8 p-0 hover:bg-primary-100/50"
        //     >
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4 text-primary-600" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end" className="w-[160px]">
        //     <DropdownMenuItem className="text-sm text-primary-800 focus:bg-primary-100/50 focus:text-primary-900">
        //       View details
        //     </DropdownMenuItem>
        //     <DropdownMenuItem className="text-sm text-primary-800 focus:bg-primary-100/50 focus:text-primary-900">
        //       View messages
        //     </DropdownMenuItem>

        //     {row.original.paymentStatus === "unpaid" && (
        //       <DropdownMenuItem className="text-sm text-primary-800 focus:bg-primary-100/50 focus:text-primary-900">
        //         Pay now
        //       </DropdownMenuItem>
        //     )}
        //     {row.original.status === "in_progress" && (
        //       <DropdownMenuItem className="text-sm text-primary-800 focus:bg-primary-100/50 focus:text-primary-900">
        //         Mark as completed
        //       </DropdownMenuItem>
        //     )}
        //     <DropdownMenuItem className="text-sm text-primary-800 focus:bg-primary-100/50 focus:text-primary-900">
        //       Open Dispute
        //     </DropdownMenuItem>
        //     <DropdownMenuItem className="text-sm text-red-600 focus:bg-red-50 focus:text-red-700">
        //       Cancel request
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <Link href={`requests/${row.original.id}`} className="">Open</Link>
      )
    },
  },
]
