"use client";

// types.ts
export interface FundraiserFormData {
    purpose: string;
    amount: string;
    title: string;
    raisingFor: string;
    beneficiaryName: string;
    education: string;
    employmentStatus: string;
    campaignerImage: File | null;
    location: string;
    closingDate: Date | null;
    description: string;
    story: string;
    documents: File[];
    acceptTerms: boolean;
  }
  
  export interface FormErrors {
    [key: string]: string | undefined;
  }
  
  // FundraiserForm.tsx
  import React, { useState } from 'react';
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Calendar } from "@/components/ui/calendar";
  import { Checkbox } from "@/components/ui/checkbox";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { toast } from "@/hooks/use-toast";
//   import type { FundraiserFormData, FormErrors } from './types';
  
  const INITIAL_FORM_STATE: FundraiserFormData = {
    purpose: '',
    amount: '',
    title: '',
    raisingFor: '',
    beneficiaryName: '',
    education: '',
    employmentStatus: '',
    campaignerImage: null,
    location: '',
    closingDate: null,
    description: '',
    story: '',
    documents: [],
    acceptTerms: false
  };
  
  const FundraiserForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FundraiserFormData>(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
    const validateStep = (stepNumber: number): boolean => {
      const newErrors: FormErrors = {};
  
      if (stepNumber === 1) {
        if (!formData.purpose) newErrors.purpose = 'Purpose is required';
        if (!formData.amount) newErrors.amount = 'Amount is required';
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.raisingFor) newErrors.raisingFor = 'This field is required';
        if (!formData.beneficiaryName) newErrors.beneficiaryName = 'Beneficiary name is required';
        if (!formData.education) newErrors.education = 'Education is required';
        if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
      }
  
      if (stepNumber === 2) {
        if (!formData.campaignerImage) newErrors.campaignerImage = 'Image is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.closingDate) newErrors.closingDate = 'Closing date is required';
        if (!formData.description) newErrors.description = 'Description is required';
      }
  
      if (stepNumber === 3) {
        if (!formData.story) {
          newErrors.story = 'Story is required';
        } else if (formData.story.split(' ').length < 300) {
          newErrors.story = 'Story must be at least 300 words';
        }
        if (!formData.documents || formData.documents.length === 0) {
          newErrors.documents = 'At least one document is required';
        }
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      
      if (type === 'file') {
        const fileInput = e.target as HTMLInputElement;
        if (name === 'campaignerImage' && fileInput.files) {
          setFormData((prev: any) => ({
            ...prev,
            [name]: fileInput.files![0] || null
          }));
        } else if (name === 'documents' && fileInput.files) {
          const fileArray = Array.from(fileInput.files).slice(0, 3);
          setFormData((prev: any) => ({
            ...prev,
            [name]: fileArray
          }));
        }
      } else {
        setFormData((prev: any) => ({
          ...prev,
          [name]: value
        }));
      }
      
      if (errors[name]) {
        setErrors((prev: any) => ({
          ...prev,
          [name]: undefined
        }));
      }
    };
  
    const handleSelectChange = (name: string, value: string) => {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors((prev: any) => ({
          ...prev,
          [name]: undefined
        }));
      }
    };
  
    const handleDateChange = (date: Date | null) => {
      setFormData((prev: any) => ({
        ...prev,
        closingDate: date
      }));
      if (errors.closingDate) {
        setErrors((prev: any) => ({
          ...prev,
          closingDate: undefined
        }));
      }
    };
  
    const handleCheckboxChange = (checked: boolean) => {
      setFormData((prev: any) => ({
        ...prev,
        acceptTerms: checked
      }));
      if (errors.acceptTerms) {
        setErrors((prev: any) => ({
          ...prev,
          acceptTerms: undefined
        }));
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = validateStep(3);
      
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please check all required fields",
          variant: "destructive",
        });
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        // Here you can add your own submission logic
        console.log('Form submitted:', formData);
        
        toast({
          title: "Success!",
          description: "Your campaign has been submitted for approval",
        });
  
        // Reset form
        setFormData(INITIAL_FORM_STATE);
        setCurrentStep(1);
  
      } catch (error) {
        console.error('Error submitting campaign:', error);
        toast({
          title: "Error",
          description: "There was an error submitting your campaign. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const nextStep = () => {
      const isValid = validateStep(currentStep);
      if (isValid) {
        setCurrentStep((prev) => prev + 1);
      }
    };
  
    const prevStep = () => {
      setCurrentStep((prev) => prev - 1);
    };
  
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Tell us about your campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of campaign *</Label>
                  <Input
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className={errors.purpose ? 'border-red-500' : ''}
                  />
                  {errors.purpose && (
                    <p className="text-sm text-red-500">{errors.purpose}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="amount">How much do you want to raise? *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={errors.amount ? 'border-red-500' : ''}
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500">{errors.amount}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="title">Title for fund raising *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="raisingFor">Whom are you raising funds for? *</Label>
                  <Input
                    id="raisingFor"
                    name="raisingFor"
                    value={formData.raisingFor}
                    onChange={handleInputChange}
                    className={errors.raisingFor ? 'border-red-500' : ''}
                  />
                  {errors.raisingFor && (
                    <p className="text-sm text-red-500">{errors.raisingFor}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="education">Education qualification *</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('education', value)}
                    value={formData.education}
                  >
                    <SelectTrigger className={errors.education ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.education && (
                    <p className="text-sm text-red-500">{errors.education}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment status *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                    value={formData.employmentStatus}
                  >
                    <SelectTrigger className={errors.employmentStatus ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="selfEmployed">Self Employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentStatus && (
                    <p className="text-sm text-red-500">{errors.employmentStatus}</p>
                  )}
                </div>
  
                <Button type="button" onClick={nextStep} className="w-full">
                  Next
                </Button>
              </CardContent>
            </Card>
          )}
  
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Add campaigner image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignerImage">Choose file *</Label>
                  <Input
                    id="campaignerImage"
                    name="campaignerImage"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className={errors.campaignerImage ? 'border-red-500' : ''}
                  />
                  {errors.campaignerImage && (
                    <p className="text-sm text-red-500">{errors.campaignerImage}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="location">Enter your location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label>Campaign closes on *</Label>
                  <Calendar
  mode="single"
  selected={formData.closingDate ?? undefined}
  onSelect={(day: Date | undefined) => handleDateChange(day ?? null)} // Ensuring correct type handling
  className={`border rounded-md ${errors.closingDate ? 'border-red-500' : ''}`}
  disabled={(date) => date < new Date()}
/>


                  {errors.closingDate && (
                    <p className="text-sm text-red-500">{errors.closingDate}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                  <Label htmlFor="description">Short description for your campaign *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
  
                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline">
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
  
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Tell us your story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="story">
                    Tell us the story about why you are raising the fund *
                    <span className="text-sm text-gray-500"> (minimum 300 words)</span>
                  </Label>
                  <Textarea
                    id="story"
                    name="story"
                    className={`min-h-[200px] ${errors.story ? 'border-red-500' : ''}`}
                    value={formData.story}
                    onChange={handleInputChange}
                  />
                  {errors.story && (
                    <p className="text-sm text-red-500">{errors.story}</p>
                  )}
                </div>
  
                <div className="space-y-2">
                <Label htmlFor="documents">Upload necessary documents (max 3) *</Label>
                <Input
                  id="documents"
                  name="documents"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleInputChange}
                  className={errors.documents ? 'border-red-500' : ''}
                />
                {errors.documents && (
                  <p className="text-sm text-red-500">{errors.documents}</p>
                )}
                {formData.documents.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Selected files: {formData.documents.map((file: { name: any; }) => file.name).join(', ')}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                  className={errors.acceptTerms ? 'border-red-500' : ''}
                />
                <Label htmlFor="terms" className={errors.acceptTerms ? 'text-red-500' : ''}>
                  I agree to the terms and conditions *
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-500">{errors.acceptTerms}</p>
              )}

              <div className="flex justify-between">
                <Button type="button" onClick={prevStep} variant="outline">
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? "Submitting..." : "Submit for approval"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};

export default FundraiserForm;