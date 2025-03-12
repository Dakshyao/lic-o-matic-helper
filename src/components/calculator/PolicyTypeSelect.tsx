
import React from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type PolicyType, policyDescriptions } from '@/lib/calculator';

interface PolicyTypeSelectProps {
  value: PolicyType;
  onChange: (value: PolicyType) => void;
}

const PolicyTypeSelect: React.FC<PolicyTypeSelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="policyType">
          Policy Type
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{policyDescriptions[value]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
      </div>
      <Select 
        value={value} 
        onValueChange={(value) => onChange(value as PolicyType)}
      >
        <SelectTrigger className="glass-input">
          <SelectValue placeholder="Select policy type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="term">Term Plan</SelectItem>
          <SelectItem value="endowment">Endowment Plan</SelectItem>
          <SelectItem value="moneyBack">Money Back Policy</SelectItem>
          <SelectItem value="wholeLife">Whole Life Plan</SelectItem>
          <SelectItem value="ulip">ULIP</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PolicyTypeSelect;
