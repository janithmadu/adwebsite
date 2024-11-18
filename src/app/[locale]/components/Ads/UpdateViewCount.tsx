"use client"
import { useEffect } from "react";

export default function UpdateViewCount({ adId }: { adId: string }) {


  useEffect(() => {
    const updateViewCount = async () => {
      try {
        await fetch(`/api/adview/${adId}`, { method: "POST" });
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    if (adId) updateViewCount();
  }, [adId]);

  return null; // No UI is needed for this component
}