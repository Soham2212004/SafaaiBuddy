import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CleaningEstimateForm from "@/components/CleaningEstimateForm";

const Index = () => {
  console.log("Index component loading...");
  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log("Index component rendering, isFormOpen:", isFormOpen);

  return (
    <div className="min-h-screen">
      <HeroSection onOpenForm={() => {
        console.log("Opening form...");
        setIsFormOpen(true);
      }} />
      <CleaningEstimateForm 
        isOpen={isFormOpen} 
        onClose={() => {
          console.log("Closing form...");
          setIsFormOpen(false);
        }} 
      />
    </div>
  );
};

export default Index;
