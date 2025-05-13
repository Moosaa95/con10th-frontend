"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProgressIndicator from "../ui/progress-indicator"
import ProfilePhotoUpload from "../ui/upload"
import { useGetClientProfileMutation, useUpdateClientProfileDetailsMutation, useUpdateClientProfilePictureMutation } from "@/states/features/endpoints/client/clientApiSlice"


// TODO : to use zod validation later

// Define the form data structure
interface ProfileFormData {
  profilePhoto?: File | null
  firstName: string
  lastName: string
  gender: string
  country: string
  bio: string;
  role?: string;
}

export default function ClientProfileSetup({id}:{id:string}) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    bio: "",
  })

  const [getClientProfile, {isLoading:isLoadingClientProfile, isError, error}] =  useGetClientProfileMutation()
  const [updateClientProfilePicture, { isLoading: isUpdatingPhoto }] = useUpdateClientProfilePictureMutation()
  const [updateClientProfileDetails, { isLoading: isLoadingProfile }] = useUpdateClientProfileDetailsMutation()

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getClientProfile({ client_id: id }).unwrap();  
        if (response.profile_picture){
          setProfileImageUrl(response.profile_picture)
        }
        
        
        setFormData((prev) => ({
          ...prev,
          firstName: response.first_name || "",
          lastName: response.last_name || "",
          gender: response.gender || "",
          country: response.country || "",
          bio: response.bio || "",
        }));
      } catch (err) {
        toast.error("Failed to load client profile. Please try again.");
      }
    };
    fetchClientProfile();
  }, [id, getClientProfile]);
  
  // Update form data
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle photo upload
  const handlePhotoUpload = async(file: File | null) => {
    if (!file) return 

    try{
      await updateClientProfilePicture({client_id:id, photo:file}).unwrap()
      toast.success("Success")
    }catch (error:any) {
      toast.error(error.data?.error || "Failed to upload profile photo")
    }
  }


  // Navigate to next step
  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country) {
        toast.error("Please fill in all required fields")
        return
      }
    } else if (currentStep === 2) {
      if (!formData.bio) {
        toast.error("Please enter your bio")
        return
      }
    }

    // Move to next step
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
      if (!formData.bio) {
        toast.error("Please enter your bio")
        return
      }
  
      setIsSubmitting(true)
      

      const data =  {
        client_id: id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        country: formData.country,
        bio: formData.bio,
      }
      try {
        // Update profile details
        await updateClientProfileDetails(data).unwrap()
  
        toast.success("Profile setup completed successfully! please login to continue")
        router.push(`/auth/login`)
      } catch (error: any) {
        console.error("Error updating profile:", error)
        toast.error(error.data?.error || "Failed to update profile")
      } finally {
        setIsSubmitting(false)
      }
    }

  if (isLoadingProfile) {
    return <div className="flex justify-center p-8">Loading profile...</div>
  }

  return (
    <div className="flex flex-col">

      {/* Progress bar */}
      <div className="w-full h-2 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentStep / 2) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex">
        {/* Left sidebar with progress indicator */}
        <div className="hidden md:block w-24 border-r p-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />
        </div>

        {/* Main content */}
        <div className="flex-1 py-8 px-4 md:px-12 max-w-3xl mx-auto w-full">
          {/* Step 1: Basic Profile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl font-bold text-primary-900 text-center">
                Welcome! Let's get your new profile all set up.
              </h1>

              <div className="flex flex-col items-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Upload a clear profile photo (Optional)</p>
                <ProfilePhotoUpload onPhotoUpload={handlePhotoUpload} initialImage={profileImageUrl || undefined} />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Your gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="country">Which country do you live in? *</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          

          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900 text-center">Finally, your bio!</h1>

              <div>
                <Label htmlFor="bio">Short description about yourself and your expertise.</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Write a brief bio..."
                  className="h-32"
                  required
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <Button variant="ghost" className="text-accent-color-700 flex items-center gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < 2 ? (
              <Button className="bg-accent-color-700 hover:bg-accent-color-600 text-white px-6 rounded-full" onClick={handleNext}>
                Continue
              </Button>
            ) : (
              <Button
                className="bg-accent-color-700 hover:bg-accent-color-600 text-white px-6 rounded-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
