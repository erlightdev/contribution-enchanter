import React from 'react';
import { cn } from "@/lib/utils";

interface ContributionPreviewProps {
  frequency: number;
  intensity: number;
}

const ContributionPreview: React.FC<ContributionPreviewProps> = ({ frequency, intensity }) => {
  const days = Array.from({ length: 7 * 12 }, (_, i) => i);
  
  const getIntensity = (index: number) => {
    const random = Math.random();
    if (random > frequency) return 0;
    const level = Math.floor(random * intensity * 4) + 1;
    return Math.min(level, 4);
  };

  return (
    <div className="p-4 bg-background rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      <div className="grid grid-cols-12 gap-1">
        {days.map((day) => (
          <div
            key={day}
            className={cn(
              "w-4 h-4 rounded-sm",
              `bg-github-${getIntensity(day)}`
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ContributionPreview;