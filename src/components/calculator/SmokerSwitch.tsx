
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface SmokerSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const SmokerSwitch: React.FC<SmokerSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <Label htmlFor="smoker">Smoker</Label>
      <Switch 
        id="smoker" 
        checked={value}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default SmokerSwitch;
