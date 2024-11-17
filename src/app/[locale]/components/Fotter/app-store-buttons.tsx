"use client";

import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppStoreButtonsProps {
  className?: string;
}

export function AppStoreButtons({ className }: AppStoreButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <Button
        variant="outline"
        size="lg"
        className="bg-[#1A1B1E] text-white border-[#1A1B1E] hover:bg-[#2C2D31] hover:border-[#2C2D31] h-[60px]"
        onClick={() => window.open("#", "_blank")}
      >
        <div className="flex items-center gap-3">
          <Apple className="h-8 w-8" />
          <div className="flex flex-col items-start">
            <span className="text-xs">Get it now</span>
            <span className="text-lg font-semibold">App Store</span>
          </div>
        </div>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="bg-[#1A1B1E] text-white border-[#1A1B1E] hover:bg-[#2C2D31] hover:border-[#2C2D31] h-[60px]"
        onClick={() => window.open("#", "_blank")}
      >
        <div className="flex items-center gap-3">
          <Play className="h-8 w-8 fill-current" />
          <div className="flex flex-col items-start">
            <span className="text-xs">Get it now</span>
            <span className="text-lg font-semibold">Google Play</span>
          </div>
        </div>
      </Button>
    </div>
  );
}