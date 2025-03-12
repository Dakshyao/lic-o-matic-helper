
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import InputForm from './calculator/InputForm';
import ResultCard from './calculator/ResultCard';
import { calculatePremium, type PolicyType, type CalculationResult } from '@/lib/calculator';

const CalculatorComponent = () => {
  const { toast } = useToast();
  const [age, setAge] = useState<number>(30);
  const [sumAssured, setSumAssured] = useState<number>(1000000);
  const [term, setTerm] = useState<number>(20);
  const [policyType, setPolicyType] = useState<PolicyType>("term");
  const [paymentFrequency, setPaymentFrequency] = useState<"annual" | "semiAnnual" | "quarterly" | "monthly">("annual");
  const [smoker, setSmoker] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate premium when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = calculatePremium({
          age,
          sumAssured,
          term,
          policyType,
          paymentFrequency,
          smoker,
        });
        setResult(result);
      } catch (error) {
        console.error("Calculation error:", error);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your premium. Please check your inputs.",
          variant: "destructive",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [age, sumAssured, term, policyType, paymentFrequency, smoker, toast]);

  // Simulate calculation process
  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        const result = calculatePremium({
          age,
          sumAssured,
          term,
          policyType,
          paymentFrequency,
          smoker,
        });
        setResult(result);
        toast({
          title: "Calculation Complete",
          description: "Your premium has been calculated successfully.",
        });
      } catch (error) {
        console.error("Calculation error:", error);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your premium. Please check your inputs.",
          variant: "destructive",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  return (
    <section id="calculator" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            LIC Premium Calculator
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Calculate your life insurance premium based on your age, coverage amount, and policy term.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <InputForm
              age={age}
              setAge={setAge}
              sumAssured={sumAssured}
              setSumAssured={setSumAssured}
              term={term}
              setTerm={setTerm}
              policyType={policyType}
              setPolicyType={setPolicyType}
              paymentFrequency={paymentFrequency}
              setPaymentFrequency={setPaymentFrequency}
              smoker={smoker}
              setSmoker={setSmoker}
              handleCalculate={handleCalculate}
              isCalculating={isCalculating}
              formatCurrency={formatCurrency}
            />
          </motion.div>

          {/* Result Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`result-${JSON.stringify(result)}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ResultCard
                  result={result}
                  sumAssured={sumAssured}
                  term={term}
                  policyType={policyType}
                  paymentFrequency={paymentFrequency}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorComponent;
