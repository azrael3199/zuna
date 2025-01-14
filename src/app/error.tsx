"use client";

import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Trigger a ShadCN toast for the error
    toast({
      title: "Error",
      description: error.message || "An unexpected error occurred!",
    });
    console.error("Caught error:", error); // Log for debugging
  }, [error]);

  // Return nothing as we don't want to interrupt the rendering of other components
  return <Toaster />;
}
