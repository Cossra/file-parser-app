"use client"

import { useUser } from "@clerk/nextjs";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core"
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

function PDFDropzone() {

  const [isUploading, setIsUpLoading] = useState(false)
  const [uploadFiles, setUpLoadedFiles] = useState<string[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useUser();

  const {
    value: isFeatureEnabled,
    featureUsageExceeded,
    featureUsage,
    featureAllocation,
  } = useSchematicEntitlement("scans");

  // console.log("is feature enabled ", isFeatureEnabled);
  // console.log("feature usage ", featureUsage)
  // console.log("feature allocation ", featureAllocation)
  // console.log("feature usage exceeded ", featureUsageExceeded)

  const sensors = useSensors(useSensor(PointerSensor));

  const handleUpload = useCallback(
    async (files: FileList | File[]) => {
      if (!user) {
        alert("Please sign in to upload files");
        return;
      }
      const fileArray = Array.from(files);
      const pdfFiles = fileArray.filter(
        (file) =>
          file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
      );

      if (pdfFiles.length === 0) {
        alert("Please drop only PDF files.")
      }

      setIsUpLoading(true);

      try {
        // Upload Files
        const newUploadedFiles: string[] = [];

        for (const file of pdfFiles) {

          const formData = new FormData();
          formData.append("file", file);

          const result = await uploadPDF(formData);

          if (!result.success) {
            throw new Error(result.error);
          }

          newUploadedFiles.push(file.name);
        }

        setUpLoadedFiles((prev) => [...prev, ...newUploadedFiles]);

        // Clear uploaded files list after 5 seconds
        setTimeout(() => {
          setUpLoadedFiles([]);
        }, 5000);

      } catch (error) {
        console.error("Upload failed:", error);
        alert(
          `Upload failed: ${error instanceof Error ? error.message: "Unknown error"}`,
        );
      } finally {
        setIsUpLoading(false);
      }


    },
    [user, router],
  );
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    if (!user) {
      alert("Please sign in to upload files");
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }

  }, [user, handleUpload]);

  // const canUpload = isUserSignedIn && isFeatureEnabled;
  const canUpload = true;

  return (
    <DndContext sensors={sensors}>
      <div className="w-full max-w-md mx-auto">
        <div
          onDragOver={canUpload ? handleDragOver : undefined}
          onDragLeave={canUpload ? handleDragLeave : undefined}
          onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
          className={`border-2 border-dashed round-lg p-8 text-center transition-colors ${isDraggingOver ? "border-blue-500 bg-blue-500" : "border-gray-300"
            } ${!canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
        >

        </div>
      </div>
    </DndContext>
  );
}

export default PDFDropzone;


