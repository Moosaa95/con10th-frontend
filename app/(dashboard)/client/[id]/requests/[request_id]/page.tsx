"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
  FileText,
  Trash2,
  Link as LinkIcon,
  Plus,
  MessageSquare,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ReviewDialog } from "@/components/review/ReviewDialog";
import { CancelOrderDialog } from "@/components/order/CancelOrderDialog";
import { serviceOfferedData } from "@/testData";
import { Expert } from "@/types/expert";

interface TimelineEvent {
  id: string;
  type: string;
  by: {
    name: string;
    avatar?: string;
  };
  date: string;
}

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((event, idx) => (
        <div key={event.id} className="flex items-start gap-3">
          <div className="relative">
            <div className="h-10 w-10 bg-gray-50 border rounded-full flex items-center justify-center">
              <span className="text-xl">📄</span>
            </div>
            {idx !== events.length - 1 && (
              <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200" />
            )}
          </div>
          <div className="flex-1 pt-2">
            <div className="text-sm font-medium text-gray-900">
              {event.type}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={event.by.avatar} />
                <AvatarFallback>{event.by.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">By</span>
                <span className="text-xs font-medium text-gray-900">
                  {event.by.name}
                </span>
                <span className="text-xs text-gray-500">{event.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpertInfo({ expert }: { expert: Expert }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-1">Expert</h3>
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#F56630]">
              {expert.first_name} {expert.last_name}
            </h2>
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified Expert in {expert.category}</span>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <p className="text-sm text-gray-600">{expert.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <p className="text-sm text-gray-600">{expert.location}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Total order fee</span>
          <span className="font-semibold">$2000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Order ID</span>
          <span className="font-semibold">#ORD1236</span>
        </div>
      </div>
    </div>
  );
}

function AboutOrder({ about }: { about: string }) {
  return (
    <div className="text-sm font-light max-w-none">
      <p>{about}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100/80",
    completed: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80",
    cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80",
  }
  return (
    <div className="min-w-[100px]">
      <Badge className={`${styles[status as keyof typeof styles]} font-medium border text-xs sm:text-sm px-2 sm:px-2.5`}>
        {status.replace("_", " ").toLocaleUpperCase()}
      </Badge>
    </div>
  )
}
const documents = [
  { id: "doc1", name: "Brand Guidelines.pdf", size: "200 KB" },
  { id: "doc2", name: "Reference Logo.png", size: "200 KB" },
];

export default function RequestPage() {
  const { request_id, id } = useParams();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const service = serviceOfferedData.find(
    (service) => service.id === request_id
  );
  if (!service) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-red-600">Service not found</h1>
      </div>
    );
  }

  const handleReviewSubmit = (rating: number, review: string) => {
    // TODO: Implement the review submission logic here
    console.log("Review submitted:", { rating, review });
  };

  const handleCancelSubmit = (reason: string) => {
    // TODO: Implement the cancellation logic here
    console.log("Order cancelled:", { reason });
  };

  const submission = {
    title: "Brand identity design submission",
    link: "htousdtwosjdfs.com",
    files: [
      {
        id: "1",
        name: "HannahBusing_Resume.pdf",
        size: "200 KB",
      },
    ],
  };

  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      type: "Payout made",
      by: { name: "Con10th", avatar: "/avatars/con10th.png" },
      date: "March 5th 2025, 4:34pm",
    },
    {
      id: "2",
      type: "Order Mark Completed",
      by: { name: "Mike Brown", avatar: "/avatars/mike.png" },
      date: "March 5th 2025, 4:34pm",
    },
    {
      id: "3",
      type: "Order Mark Completed",
      by: { name: "Muhammad Basheer", avatar: "/avatars/muhammad.png" },
      date: "March 5th 2025, 4:34pm",
    },
    {
      id: "4",
      type: "Order Accepted",
      by: { name: "Muhammad Basheer", avatar: "/avatars/muhammad.png" },
      date: "March 5th 2025, 4:34pm",
    },
    {
      id: "5",
      type: "Payment Made",
      by: { name: "Mike Brown", avatar: "/avatars/mike.png" },
      date: "March 5th 2025, 4:34pm",
    },
    {
      id: "6",
      type: "Order Requested",
      by: { name: "Mike Brown", avatar: "/avatars/mike.png" },
      date: "March 5th 2025, 4:34pm",
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/client/${id}/requests`}
              className="text-gray-500 hover:text-gray-700 flex gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              All Orders
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download Invoice</DropdownMenuItem>
              <DropdownMenuItem>Report Issue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols1 md:grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-4">
            <StatusBadge status={service.status} />
            {service.status === "cancelled" && (
              //Add Cancelation reason
              <div className="text-red-600 text-sm">
                This order has been cancelled. Please contact support for more information.
              </div>
            )}
            <h1 className="text-2xl font-bold">
              {service.title}
            </h1>
            <Card>
              <CardHeader className="font-semibold text-lg">
                About Service
              </CardHeader>
              <CardContent className="">
                <AboutOrder
                  about={service.description}
                />
              </CardContent>
            </Card>
            <Tabs defaultValue="about" className="w-full">
              <TabsList>
                <TabsTrigger value="about">Instructions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="m-0 flex flex-col gap-4">
                <div className="w-full border flex flex-col bg-gray-100 shadow-none p-2 gap-4">
                  <h1 className="font-bold text-sm">Service Description</h1>
                  <AboutOrder
                    about={service.description}
                  />
                  <p className="text-orange-500 text-xs">Show more</p>
                </div>
                <div className="w-full border flex flex-col bg-gray-100 shadow-none p-2 gap-4">
                  <h1 className="font-bold text-sm">Uploaded Documents</h1>
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Uploaded Documents
                      </h2>
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between py-3 border-b last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                              <FileText className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                {doc.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {doc.size}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <button className="text-orange-500 hover:underline text-sm">
                              Click to view
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="m-0">
                <Card>
                  <CardContent className="pt-6">
                    <Timeline events={timelineEvents} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="m-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {submission.title}
                        </h2>
                        {submission.link && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <LinkIcon className="h-4 w-4" />
                            <a
                              href={`https://${submission.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gray-700"
                            >
                              {submission.link}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {submission.files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between py-3 border-t"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                <FileText className="h-5 w-5 text-gray-600" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {file.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {file.size}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="text-orange-500 hover:underline text-sm">
                                Click to view
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full bg-[#0A1629] hover:bg-[#0A1629]/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Submit new item
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="col-span-1">
            <Card>
              <CardContent className="pt-6">
                <ExpertInfo expert={service.expert} />
              </CardContent>
            </Card>

            <div className="mt-4 space-y-4">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Mark as completed
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Make Payment
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setReviewDialogOpen(true)}
              >
                Write a review
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={() => setCancelDialogOpen(true)}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ReviewDialog
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        onSubmit={handleReviewSubmit}
      />
      <CancelOrderDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onSubmit={handleCancelSubmit}
      />
    </div>
  );
}
