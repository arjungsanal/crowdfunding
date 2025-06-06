"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {X} from 'lucide-react';
import {supabase} from '@/util/supabse';
import {Database} from '@/types/supabse';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext'; // Import your auth context

const CampaignRegistration = () => {
    const router = useRouter();
    const { user } = useAuth();
    
    type CampaignInsert = Database['public']['Tables']['campaigns']['Insert'];
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [proofImageFiles, setProofImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<CampaignInsert>({
        title: '',
        goal: 0,
        deadline: '',
        wallet_id: '',
        story: '',
        description: '',
        cover_image_url: null,
        proof_image_urls: [],
        beneficiary_name: '',
        hosted_by: '',
        relationship: '',
        user_id : '',
    });

  const updateFormData = (field: keyof CampaignInsert, value: any) => {
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
        case 'beneficiary_name':
        case 'hosted_by':
        case 'relationship':
            if (!value || value.trim().length === 0) {
                newErrors[field] = 'This field is required';
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
  if (proofImageFiles.length + files.length > 3) {
      setErrors(prev => ({
          ...prev,
          proof_image_urls: 'Maximum 3 proof images allowed'
      }));
      return;
  }
  setProofImageFiles(prev => [...prev, ...files].slice(0, 3));
  // Instead of setting undefined, we'll delete the key from the errors object
  setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.proof_image_urls;
      return newErrors;
  });
};

const removeProofImage = (index: number) => {
  setProofImageFiles((prev) => prev.filter((_, i) => i !== index));
  // Clear the error when removing images
  setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.proof_image_urls;
      return newErrors;
  });
};
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const allFields = validateStep(step);
//     if (allFields) {
//       console.log('Form Data:', formData);
//     }
//   };

//Logic to push data to backend


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateStep(step)) return;

  setIsLoading(true);

  try {
      let coverImageUrl = '';
      if (coverImageFile) {
          const { data: coverImageData, error: coverImageError } = await supabase.storage
              .from('campaigns')
              .upload(`cover-images/${coverImageFile.name}`, coverImageFile);
  
          if (coverImageError) throw coverImageError;
          coverImageUrl = coverImageData.path;
      }
  
      const proofImageUrls = [];
      for (const file of proofImageFiles) {
          const { data: proofImageData, error: proofImageError } = await supabase.storage
              .from('campaigns')
              .upload(`proof-images/${file.name}`, file);
  
          if (proofImageError) throw proofImageError;
          proofImageUrls.push(proofImageData.path);
      }
  
      const campaignData: CampaignInsert = {
          ...formData,
          cover_image_url: coverImageUrl,
          proof_image_urls: proofImageUrls,
          user_id : user!.id,
      };
  
      const { data, error } = await supabase
          .from('campaigns')
          .insert([campaignData])
          .select();
  
      if (error) throw error;
  
      console.log('Campaign created successfully:', data);
      alert('Campaign created successfully! Awaiting approval.');
  
      router.push('/profile');
  } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign. Please try again.');
  } finally {
      setIsLoading(false);
  }
};

const validateStep = (currentStep: number) => {
  const newErrors: Record<string, string> = {};

  if (currentStep === 1) {
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.goal) newErrors.goal = 'Goal is required';
      if (!formData.wallet_id) newErrors.wallet_id = 'Wallet ID is required';
      if (!formData.deadline) newErrors.deadline = 'Deadline is required';
      if (!formData.beneficiary_name) newErrors.beneficiary_name = 'Beneficiary name is required';
      if (!formData.hosted_by) newErrors.hosted_by = 'Host name is required';
      if (!formData.relationship) newErrors.relationship = 'Relationship is required';
  }

  if (currentStep === 2) {
      if (formData.story.split(' ').length < 300) newErrors.story = 'Story must be at least 300 words';
      if (formData.description.split(' ').length > 30) newErrors.description = 'Description must not exceed 30 words';
  }

  if (currentStep === 3) {
      if (!coverImageFile) newErrors.cover_image_url = 'Cover image is required';
      if (proofImageFiles.length === 0) newErrors.proof_image_urls = 'At least one proof image is required';
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
            <label className="text-sm font-medium">Beneficiary Name *</label>
            <Input
                placeholder="Enter beneficiary's full name"
                className={`border-2 focus:ring-2 focus:ring-black ${errors.beneficiary_name ? 'border-red-500' : ''}`}
                onChange={(e) => updateFormData('beneficiary_name', e.target.value)}
                value={formData.beneficiary_name}
                required
            />
            {errors.beneficiary_name && <span className="text-red-500 text-xs">{errors.beneficiary_name}</span>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Campaign Hosted By *</label>
            <Input
                placeholder="Enter your full name"
                className={`border-2 focus:ring-2 focus:ring-black ${errors.hosted_by ? 'border-red-500' : ''}`}
                onChange={(e) => updateFormData('hosted_by', e.target.value)}
                value={formData.hosted_by}
                required
            />
            {errors.hosted_by && <span className="text-red-500 text-xs">{errors.hosted_by}</span>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Relationship to Beneficiary *</label>
            <Select 
                onValueChange={(value) => updateFormData('relationship', value)}
                value={formData.relationship}
            >
                <SelectTrigger className={`border-2 focus:ring-2 focus:ring-black ${errors.relationship ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="organization">Organization Representative</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectContent>
            </Select>
            {errors.relationship && <span className="text-red-500 text-xs">{errors.relationship}</span>}
        </div>

        {/* Keep existing fields */}
        <div className="space-y-2">
            <label className="text-sm font-medium">Fundraising Goal *</label>
            <Input
                type="number"
                placeholder="Enter amount"
                className={`border-2 focus:ring-2 focus:ring-black ${errors.goal ? 'border-red-500' : ''}`}
                onChange={(e) => updateFormData('goal', parseInt(e.target.value))}
                value={formData.goal}
                required
            />
            {errors.goal && <span className="text-red-500 text-xs">{errors.goal}</span>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Wallet Address *</label>
            <Input
                placeholder="Enter your crypto wallet ID"
                className={`border-2 focus:ring-2 focus:ring-black font-mono ${errors.wallet_id ? 'border-red-500' : ''}`}
                onChange={(e) => updateFormData('wallet_id', e.target.value)}
                value={formData.wallet_id}
                required
            />
            {errors.wallet_id && <span className="text-red-500 text-xs">{errors.wallet_id}</span>}
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
                className={`border-2 focus:ring-2 focus:ring-black ${errors.cover_image_url ? 'border-red-500' : ''}`}
                onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                required
            />
            {errors.cover_image_url && <span className="text-red-500 text-xs">{errors.cover_image_url}</span>}
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Proof Images *</label>
            <div className="text-xs text-gray-500 mb-2">Maximum 3 images allowed</div>
            <Input
                type="file"
                accept="image/*"
                multiple
                className={`border-2 focus:ring-2 focus:ring-black ${errors.proof_image_urls ? 'border-red-500' : ''}`}
                onChange={handleProofImages}
                disabled={proofImageFiles.length >= 3}
                required
            />
            {errors.proof_image_urls && <span className="text-red-500 text-xs">{errors.proof_image_urls}</span>}
            <div className="grid grid-cols-2 gap-3 mt-3">
                {proofImageFiles.map((file, index) => (
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
            {proofImageFiles.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                    {proofImageFiles.length}/3 images uploaded
                </div>
            )}
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
                          disabled={isLoading}
                      >
                          {isLoading ? 'Submitting...' : 'Submit'}
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