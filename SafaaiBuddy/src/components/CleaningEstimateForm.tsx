import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X, CheckCircle, Loader2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  numberOfRooms: string;
  houseArea: string;
  houseImages: string[];
}

interface CleaningEstimateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CleaningEstimateForm = ({ isOpen, onClose }: CleaningEstimateFormProps) => {
  console.log("CleaningEstimateForm rendering, isOpen:", isOpen);
  
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    numberOfRooms: "",
    houseArea: "",
    houseImages: []
  });
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset images when number of rooms changes
  useEffect(() => {
    const numRooms = parseInt(formData.numberOfRooms) || 0;
    if (numRooms > 0) {
      // Initialize empty arrays for the selected number of rooms
      const newImages = Array(numRooms).fill("");
      const newPreviews = Array(numRooms).fill("");
      setFormData(prev => ({ ...prev, houseImages: newImages }));
      setImagePreviews(newPreviews);
    } else {
      setFormData(prev => ({ ...prev, houseImages: [] }));
      setImagePreviews([]);
    }
  }, [formData.numberOfRooms]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedBase64);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      
      // Update the specific image in the array
      setFormData(prev => {
        const newImages = [...prev.houseImages];
        newImages[index] = compressedImage;
        return { ...prev, houseImages: newImages };
      });
      
      setImagePreviews(prev => {
        const newPreviews = [...prev];
        newPreviews[index] = compressedImage;
        return newPreviews;
      });
      
      toast({
        title: "Image uploaded successfully!",
        description: `Room ${index + 1} image has been processed and optimized.`
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try uploading a different image.",
        variant: "destructive"
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.houseImages];
      newImages[index] = "";
      return { ...prev, houseImages: newImages };
    });
    
    setImagePreviews(prev => {
      const newPreviews = [...prev];
      newPreviews[index] = "";
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.address || 
        !formData.numberOfRooms || !formData.houseArea) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Filter out empty images and create the submission data
      const filteredImages = formData.houseImages.filter(img => img !== "");
      const submissionData = {
        ...formData,
        houseImages: filteredImages
      };

      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Quote request submitted!",
          description: "We'll contact you within 24 hours with your custom cleaning estimate."
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            numberOfRooms: "",
            houseArea: "",
            houseImages: []
          });
          setImagePreviews([]);
          onClose();
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md card-glass border-0">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Quote Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you! We'll contact you within 24 hours with your custom cleaning estimate.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const numberOfRooms = parseInt(formData.numberOfRooms) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto card-glass border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Get Your Free Cleaning Estimate
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-primary">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-modern"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-primary">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="input-modern"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-primary">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="input-modern"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-semibold text-primary">
              Property Address *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="input-modern min-h-[80px]"
              placeholder="Enter your complete address including city, state, and zip code"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rooms" className="text-sm font-semibold text-primary">
                Number of Rooms *
              </Label>
              <Select 
                value={formData.numberOfRooms} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, numberOfRooms: value }))}
              >
                <SelectTrigger className="input-modern">
                  <SelectValue placeholder="Select number of rooms" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border border-white/30">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-sm font-semibold text-primary">
                House Area (sq. ft) *
              </Label>
              <Input
                id="area"
                type="number"
                value={formData.houseArea}
                onChange={(e) => setFormData(prev => ({ ...prev, houseArea: e.target.value }))}
                className="input-modern"
                placeholder="1200"
                min="100"
                max="10000"
                required
              />
            </div>
          </div>

          {/* Dynamic Image Upload Section */}
          {numberOfRooms > 0 && (
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-primary">
                Room Images (Optional) - Upload {numberOfRooms} image{numberOfRooms > 1 ? 's' : ''}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: numberOfRooms }, (_, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Room {index + 1} Image
                    </Label>
                    <div className="relative">
                      <input
                        id={`image-${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`image-${index}`}
                        className="input-modern min-h-[120px] border-2 border-dashed cursor-pointer 
                                 hover:border-primary/50 transition-colors duration-300
                                 flex flex-col items-center justify-center text-center"
                      >
                        {imagePreviews[index] ? (
                          <div className="relative w-full">
                            <img 
                              src={imagePreviews[index]} 
                              alt={`Room ${index + 1} preview`} 
                              className="max-h-24 mx-auto rounded-lg shadow-medium"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                removeImage(index);
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-primary/60 mb-1" />
                            <span className="text-primary/80 font-medium text-sm">
                              Upload Room {index + 1}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              JPEG, PNG up to 10MB
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Get Free Estimate'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CleaningEstimateForm;