"use client"

import { useUser } from "@clerk/nextjs";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core"
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

function PDFDropzone() {

    const [isUploading, setIsUpLoading] = useState(false)
    const [uploadFiles, setUpLoadedFiles] = useState<string[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { user } = useUser();

  const sensors = useSensors(useSensor(PointerSensor));
  
  const handleDragOver = useCallback((e:React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e:React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

    const handleDrop = useCallback((e:React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        console.log("Dropped");
    }, []);

    // const canUpload = isUserSignedIn && isFeatureEnabled;
    const canUpload = true;

  return (
    <DndContext sensors={sensors}>
        <div className="w-full max-w-md mx-auto">
            <div
                onDragOver={canUpload ? handleDragOver : undefined}
                onDragLeave={canUpload ? handleDragLeave : undefined}
                onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
                className={`border-2 border-dashed round-lg p-8 text-center transition-colors ${
                isDraggingOver ? "border-blue-500 bg-blue-500" : "border-gray-300"
            } ${!canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
            >

            </div>
      </div>
    </DndContext>
  );
}

export default PDFDropzone;


