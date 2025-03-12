
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronsRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import InputRange from './InputRange';
import PolicyTypeSelect from './PolicyTypeSelect';
import FrequencySelect from './FrequencySelect';
import SmokerSwitch from './SmokerSwitch';
import { type PolicyType } from '@/lib/calculator';

interface InputFormProps {
  age: number;
  setAge: (age: number) => void;
  sumAssured: number;
  setSumAssured: (sumAssured: number) => void;
  term: number;
  setTerm: (term: number) => void;
  policyType: PolicyType;
  setPolicyType: (policyType: PolicyType) => void;
  paymentFrequency: "annual" | "semiAnnual" | "quarterly" | "monthly";
  setPaymentFrequency: (frequency: "annual" | "semiAnnual" | "quarterly" | "monthly") => void;
  smoker: boolean;
  setSmoker: (smoker: boolean) => void;
  handleCalculate: () => void;
  isCalculating: boolean;
  formatCurrency: (value: number) => string;
}

const InputForm: React.FC<InputFormProps> = ({
  age,
  setAge,
  sumAssured,
  setSumAssured,
  term,
  setTerm,
  policyType,
  setPolicyType,
  paymentFrequency,
  setPaymentFrequency,
  smoker,
  setSmoker,
  handleCalculate,
  isCalculating,
  formatCurrency
}) => {
  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span>Policy Details</span>
        </CardTitle>
        <CardDescription>
          Enter your details to calculate your premium
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Age Selection */}
        <InputRange
          id="age"
          label="Age"
          value={age}
          min={18}
          max={65}
          step={1}
          unit=" years"
          onChange={setAge}
        />

        {/* Sum Assured */}
        <InputRange
          id="sumAssured"
          label="Sum Assured"
          value={sumAssured}
          min={1000}
          max={10000000}
          step={1000}
          formatValue={formatCurrency}
          onChange={setSumAssured}
        />

        {/* Policy Term */}
        <InputRange
          id="term"
          label="Policy Term"
          value={term}
          min={5}
          max={40}
          step={1}
          unit=" years"
          onChange={setTerm}
        />

        {/* Policy Type */}
        <PolicyTypeSelect 
          value={policyType} 
          onChange={setPolicyType} 
        />

        {/* Payment Frequency */}
        <FrequencySelect 
          value={paymentFrequency} 
          onChange={setPaymentFrequency} 
        />

        {/* Smoker Status */}
        <SmokerSwitch 
          value={smoker} 
          onChange={setSmoker} 
        />
      </CardContent>
      <CardFooter>
        <motion.button
          type="button"
          className="btn-primary py-2.5 px-4 w-full text-sm flex items-center justify-center gap-2"
          onClick={handleCalculate}
          disabled={isCalculating}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isCalculating ? (
            <>Calculating...</>
          ) : (
            <>
              Calculate Premium <ChevronsRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </CardFooter>
    </Card>
  );
};

export default InputForm;
