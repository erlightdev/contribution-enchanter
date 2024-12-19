import React, { useState } from 'react';
import ContributionPreview from '@/components/ContributionPreview';
import GeneratorForm from '@/components/GeneratorForm';
import CommandOutput from '@/components/CommandOutput';
import Header from '@/components/Header';

const Index = () => {
  const [frequency, setFrequency] = useState(0.6);
  const [intensity, setIntensity] = useState(10);
  const [showCommands, setShowCommands] = useState(false);

  const handleGenerate = () => {
    setShowCommands(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">GitHub Activity Generator</h1>
            <p className="text-muted-foreground">
              Generate a beautiful GitHub contributions graph for the last year
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ContributionPreview frequency={frequency} intensity={intensity} />
              <GeneratorForm
                frequency={frequency}
                setFrequency={setFrequency}
                intensity={intensity}
                setIntensity={setIntensity}
                onGenerate={handleGenerate}
              />
            </div>

            {showCommands && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Generated Commands</h2>
                <CommandOutput frequency={frequency} intensity={intensity} />
                <p className="text-sm text-muted-foreground">
                  ⚠️ Disclaimer: This tool is for educational purposes only. Using it to deceive others about your contributions is not recommended.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;