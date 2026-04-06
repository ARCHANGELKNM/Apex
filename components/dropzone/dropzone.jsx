"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function DropZone ({ onUpload }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Convert to Base64 for the "Lean" Pass-through
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onUpload(reader.result); // This goes to our AI Action
      setIsUploading(false);
    };
  };

  return (
    <Card className="p-12 border-dashed border-2 flex flex-col items-center justify-center bg-zinc-50/50 hover:bg-zinc-50 transition-all cursor-pointer relative">
      <input 
        type="file" 
        className="absolute inset-0 opacity-0 cursor-pointer" 
        onChange={handleFile}
        accept="image/*,application/pdf"
      />
      {isUploading ? (
        <Loader2 className="h-10 w-10 animate-spin text-zinc-400" />
      ) : (
        <>
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Upload className="h-6 w-6 text-zinc-600" />
          </div>
          <h3 className="text-lg font-semibold">Drop your exam paper here</h3>
          <p className="text-sm text-zinc-500">PDF or Images (Max 10MB)</p>
        </>
      )}
    </Card>
  );
}
