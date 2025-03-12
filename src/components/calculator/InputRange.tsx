
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface InputRangeProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
}

const InputRange: React.FC<InputRangeProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  unit = '',
  formatValue,
  onChange,
}) => {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm font-medium">{displayValue}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        className="py-2"
      />
    </div>
  );
};

export default InputRange;
