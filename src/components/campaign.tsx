"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from 'lucide-react';

const CampaignRegistration = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: '',
    goal: '',
    deadline: '',
    walletId: '',
    story: '',
    description: '',
    coverImage: null,
    proofImages: [] as File[]
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'story':
        if (value.split(' ').length < 300) {
          newErrors[field] = 'Story must be at least 300 words';
        } else {
          delete newErrors[field];
        }
        break;
      case 'description':
        if (value.split(' ').length > 30) {
          newErrors[field] = 'Description must not exceed 30 words';
        } else {
          delete newErrors[field];
        }
        break;
      default:
        if (!value || value.length === 0) {
          newErrors[field] = 'This field is required';
        } else {
          delete newErrors[field];
        }
    }
    
    setErrors(newErrors);
  };

  const handleProofImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      proofImages: [...prev.proofImages, ...files]
    }));
  };

  const removeProofImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      proofImages: prev.proofImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = validateStep(step);
    if (allFields) {
      console.log('Form Data:', formData);
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.goal) newErrors.goal = 'Goal is required';
      if (!formData.walletId) newErrors.walletId = 'Wallet ID is required';
      if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    }
    
    if (currentStep === 2) {
      if (formData.story.split(' ').length < 300) newErrors.story = 'Story must be at least 300 words';
      if (formData.description.split(' ').length > 30) newErrors.description = 'Description must not exceed 30 words';
    }
    
    if (currentStep === 3) {
      if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';
      if (formData.proofImages.length === 0) newErrors.proofImages = 'At least one proof image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex flex-col items-center w-1/3">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 
            ${step >= num ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-300'}`}>
            {num}
          </div>
          <div className={`h-1 ${num < 3 ? 'w-full' : 'w-0'} 
            ${step > num ? 'bg-black' : 'bg-gray-300'}`} />
        </div>
      ))}
    </div>
  );

  const renderBasicDetails = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Title *</label>
        <Input
          placeholder="Enter campaign title"
          className={`border-2 focus:ring-2 focus:ring-black ${errors.title ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('title', e.target.value)}
          value={formData.title}
          required
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Fundraising Goal *</label>
        <Input
          type="number"
          placeholder="Enter amount"
          className={`border-2 focus:ring-2 focus:ring-black ${errors.goal ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('goal', e.target.value)}
          value={formData.goal}
          required
        />
        {errors.goal && <span className="text-red-500 text-xs">{errors.goal}</span>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Wallet Address *</label>
        <Input
          placeholder="Enter your crypto wallet ID"
          className={`border-2 focus:ring-2 focus:ring-black font-mono ${errors.walletId ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('walletId', e.target.value)}
          value={formData.walletId}
          required
        />
        {errors.walletId && <span className="text-red-500 text-xs">{errors.walletId}</span>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Deadline *</label>
        <Input
          type="date"
          className={`border-2 focus:ring-2 focus:ring-black ${errors.deadline ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('deadline', e.target.value)}
          value={formData.deadline}
          required
        />
        {errors.deadline && <span className="text-red-500 text-xs">{errors.deadline}</span>}
      </div>
    </div>
  );

  const renderStorySection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Story *</label>
        <div className="text-xs text-gray-500">Minimum 300 words required</div>
        <Textarea
          placeholder="Share your story..."
          className={`h-64 border-2 focus:ring-2 focus:ring-black resize-none ${errors.story ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('story', e.target.value)}
          value={formData.story}
          required
        />
        <div className="text-xs text-gray-500">
          Word count: {formData.story.split(' ').length}
        </div>
        {errors.story && <span className="text-red-500 text-xs">{errors.story}</span>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Brief Description *</label>
        <div className="text-xs text-gray-500">Maximum 30 words</div>
        <Textarea
          placeholder="Brief overview of your campaign..."
          className={`h-24 border-2 focus:ring-2 focus:ring-black resize-none ${errors.description ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('description', e.target.value)}
          value={formData.description}
          required
        />
        <div className="text-xs text-gray-500">
          Word count: {formData.description.split(' ').length}
        </div>
        {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
      </div>
    </div>
  );

  const renderMediaUpload = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image *</label>
        <Input
          type="file"
          accept="image/*"
          className={`border-2 focus:ring-2 focus:ring-black ${errors.coverImage ? 'border-red-500' : ''}`}
          onChange={(e) => updateFormData('coverImage', e.target.files?.[0] || null)}
          required
        />
        {errors.coverImage && <span className="text-red-500 text-xs">{errors.coverImage}</span>}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Proof Images *</label>
        <Input
          type="file"
          accept="image/*"
          multiple
          className={`border-2 focus:ring-2 focus:ring-black ${errors.proofImages ? 'border-red-500' : ''}`}
          onChange={handleProofImages}
          required
        />
        {errors.proofImages && <span className="text-red-500 text-xs">{errors.proofImages}</span>}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {formData.proofImages.map((file, index) => (
            <div key={index} className="relative p-3 border-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-200 rounded-full"
                  onClick={() => removeProofImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 shadow-lg">
      <CardHeader className="space-y-4 border-b-2 bg-gray-50">
        <CardTitle className="text-2xl font-bold text-center mb-4">Create Fundraising Campaign</CardTitle>
        {renderStepIndicator()}
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && renderBasicDetails()}
          {step === 2 && renderStorySection()}
          {step === 3 && renderMediaUpload()}
          
          <div className="flex justify-between pt-6 border-t-2">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="border-2 hover:bg-gray-100 px-6"
            >
              Previous
            </Button>
            {step === 3 ? (
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 px-6"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  if (validateStep(step)) {
                    setStep(prev => Math.min(3, prev + 1));
                  }
                }}
                className="bg-black text-white hover:bg-gray-800 px-6"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CampaignRegistration;