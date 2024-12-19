import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface GeneratorFormProps {
  frequency: number;
  setFrequency: (value: number) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  onGenerate: (repoUrl: string) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({
  frequency,
  setFrequency,
  intensity,
  setIntensity,
  onGenerate,
}) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) {
      toast.error("Please enter a repository URL");
      return;
    }
    onGenerate(repoUrl);
    toast.success("Commands copied to clipboard!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          GitHub Repository URL
        </label>
        <Input
          type="url"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Frequency (% of days with commits)
        </label>
        <Slider
          value={[frequency * 100]}
          onValueChange={(value) => setFrequency(value[0] / 100)}
          min={0}
          max={100}
          step={1}
        />
        <span className="block text-sm text-muted-foreground">
          {Math.round(frequency * 100)}%
        </span>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Intensity (max commits per day)
        </label>
        <Slider
          value={[intensity]}
          onValueChange={(value) => setIntensity(value[0])}
          min={1}
          max={20}
          step={1}
        />
        <span className="block text-sm text-muted-foreground">
          {intensity} commits
        </span>
      </div>

      <Button type="submit" className="w-full">
        Generate Commands
      </Button>
    </form>
  );
};

export default GeneratorForm;