import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface CommandOutputProps {
  frequency: number;
  intensity: number;
  repoUrl: string;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ frequency, intensity, repoUrl }) => {
  const commands = `# Initialize repository
git init

# Create contribution script
cat > generate.sh << 'EOL'
#!/bin/bash

# Configuration
FREQUENCY=${frequency}  # Percentage of days to commit (0-1)
MAX_COMMITS=${intensity}   # Maximum commits per day

# Get date from one year ago
START_DATE=$(date -v-1y +%Y-%m-%d)

# Create file if it doesn't exist
touch contributions.txt

# Loop through each day
while [ "$START_DATE" != "$(date +%Y-%m-%d)" ]; do
  if (( $(echo "$(LC_NUMERIC=C printf '%.2f\\n' "$((RANDOM % 100))e-2") < $FREQUENCY" | bc -l) )); then
    COMMITS=$((RANDOM % MAX_COMMITS + 1))
    for i in $(seq 1 $COMMITS); do
      echo "Contribution $i on $START_DATE" >> contributions.txt
      git add contributions.txt
      GIT_AUTHOR_DATE="$START_DATE 12:00:00" GIT_COMMITTER_DATE="$START_DATE 12:00:00" git commit -m "Contribution $i on $START_DATE"
    done
  fi
  START_DATE=$(date -v+1d -jf %Y-%m-%d $START_DATE +%Y-%m-%d)
done
EOL

# Make script executable
chmod +x generate.sh

# Run script
./generate.sh

# Push to GitHub
git remote add origin ${repoUrl}
git branch -M main
git push -u origin main`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands);
  };

  return (
    <div className="relative">
      <pre className="p-4 bg-muted rounded-lg font-mono text-sm overflow-x-auto">
        {commands}
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CommandOutput;