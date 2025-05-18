/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import SelectCard from "@/app/(nondashboard)/components/UserTypeCard"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRegister } from "@/hooks"
import { Suspense, useState } from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';



// zod schemas
const step1Schema = z.object({
  role: z.enum(["client", "expert"])
})

const step2Schema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

const step3Schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  re_password: z.string(),
  }).refine(data => data.password === data.re_password, {
  message: "Passwords don't match",
  path: ["re_password"]
  });

const registerSchema = step1Schema.merge(step2Schema).merge(step3Schema) //ignore
type FormValues = z.infer<typeof registerSchema>

const Tpage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormValues>>({})

  const schemaForStep = () => {
      switch (currentStep) {
        case 1: return step1Schema;
        case 2: return step2Schema;
        case 3: return step3Schema;
        default: return registerSchema;
      }
      };
    
    const form = useForm({
      resolver: zodResolver(schemaForStep()),
      defaultValues: {
        role:  "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
      }
    });
  const isLoading = false;
  const onSubmit = async (data: FormValues) => { 
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Handle final submission
      console.log("Final Data: ", { ...formData, ...data });
      // Call your API or perform any action with the final data
    }
  }
  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onSubmit(form.getValues());
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  return (
    <div className="container mx-auto ">
      {currentStep > 1 && (
        <Button variant="ghost" className="text-accent-color-700 gap-4 mb-8 hidden md:flex" onClick={handleBack}>
          <ArrowLeft size={24} />
          <span className="font-[400] text-xl">Back</span>
        </Button>
      )}

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        {/* Progress Indicator */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentStep >= step ? "bg-primary-700 text-white" : "bg-gray-200"}`}
            >
              {step}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form className="w-full max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="">
                  <h3 className="text-primary-700 font-[600] text-3xl text-center ">
                    Join as a client or an expert!
                  </h3>
                </div>

                <FormField
                  control={form.control}

                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col md:flex-row gap-6 mb-12"
                      >
                        <SelectCard
                          selectedValue={field.value || ""}
                          label="I am a client"
                          value="client"
                          imageSrc="/assets/images/userType/client.png"
                        />
                        <SelectCard
                          selectedValue={field.value || ""}
                          label="I am an expert"
                          value="expert"
                          imageSrc="/assets/images/userType/expert.png"
                        />
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-primary-700 font-semibold text-4xl mb-12 text-center">
                  Personal Information
                </h3>
                {['first_name', 'last_name', 'email'].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName.replace('_', ' ').toUpperCase()}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-primary-700 font-semibold text-4xl mb-12 text-center">
                  Create Password
                </h3>
                {['password', 're_password'].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName === 're_password' ? 'Confirm Password' : 'Password'}</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex justify-between gap-4 mb-16 mt-6">
                {currentStep > 1 && (
                  <Button className="" type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="" />
                    <span className="text-xl font-[400]">Back</span>
                  </Button>
                )}

                {currentStep < 3 ? (
                  <div className="flex items-end justify-end flex-1">
                    <Button type="button" onClick={handleNext} className="py-4 px-8 gap-3 bg-accent-color-700 text-white rounded-lg">
                      Continue
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="py-4 px-8 gap-3 bg-accent-color-700 text-white rounded-lg"
                  >
                    {isLoading ? "Submitting..." : "Complete Registration"}
                  </Button>
                )}

              </div>
              <div className="flex justify-center">
                <Link className="font-[400] space-x-2" href="/auth/login">
                  <span>Already have an account? </span>
                  <span className="text-accent-color-700 text-xl font-[500]">Login</span>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Tpage