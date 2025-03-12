
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PaymentFrequency = "annual" | "semiAnnual" | "quarterly" | "monthly";

interface FrequencySelectProps {
  value: PaymentFrequency;
  onChange: (value: PaymentFrequency) => void;
}

const FrequencySelect: React.FC<FrequencySelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="paymentFrequency">Payment Frequency</Label>
      <Select 
        value={value}
        onValueChange={(value) => onChange(value as PaymentFrequency)}
      >
        <SelectTrigger className="glass-input">
          <SelectValue placeholder="Select payment frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="annual">Annual</SelectItem>
          <SelectItem value="semiAnnual">Semi-Annual</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrequencySelect;
