
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronsRight, Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import AnimatedValue from './ui-custom/AnimatedValue';
import { calculatePremium, policyDescriptions, type PolicyType, type CalculationResult } from '@/lib/calculator';

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
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="age">Age</Label>
                    <span className="text-sm font-medium">{age} years</span>
                  </div>
                  <Slider
                    id="age"
                    min={18}
                    max={65}
                    step={1}
                    value={[age]}
                    onValueChange={(value) => setAge(value[0])}
                    className="py-2"
                  />
                </div>

                {/* Sum Assured */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sumAssured">Sum Assured</Label>
                    <span className="text-sm font-medium">{formatCurrency(sumAssured)}</span>
                  </div>
                  <Slider
                    id="sumAssured"
                    min={1000}
                    max={10000000}
                    step={1000}
                    value={[sumAssured]}
                    onValueChange={(value) => setSumAssured(value[0])}
                    className="py-2"
                  />
                </div>

                {/* Policy Term */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="term">Policy Term</Label>
                    <span className="text-sm font-medium">{term} years</span>
                  </div>
                  <Slider
                    id="term"
                    min={5}
                    max={40}
                    step={1}
                    value={[term]}
                    onValueChange={(value) => setTerm(value[0])}
                    className="py-2"
                  />
                </div>

                {/* Policy Type */}
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
                            <p className="text-sm">{policyDescriptions[policyType]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                  <Select 
                    value={policyType} 
                    onValueChange={(value) => setPolicyType(value as PolicyType)}
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

                {/* Payment Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select 
                    value={paymentFrequency}
                    onValueChange={(value) => setPaymentFrequency(value as "annual" | "semiAnnual" | "quarterly" | "monthly")}
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

                {/* Smoker Status */}
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="smoker">Smoker</Label>
                  <Switch 
                    id="smoker" 
                    checked={smoker}
                    onCheckedChange={setSmoker}
                  />
                </div>
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
                <Card className="glass-card animated-border border-0 overflow-hidden">
                  <CardHeader className="bg-primary/5 dark:bg-primary/10">
                    <CardTitle>Your Premium Estimate</CardTitle>
                    <CardDescription>
                      Based on your selected policy details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {result ? (
                      <div className="space-y-8">
                        {/* Premium Amount */}
                        <div className="text-center p-4 rounded-lg bg-primary/5 dark:bg-primary/10">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {paymentFrequency === "annual" ? "Annual" :
                             paymentFrequency === "semiAnnual" ? "Semi-Annual" :
                             paymentFrequency === "quarterly" ? "Quarterly" : "Monthly"} Premium
                          </p>
                          <h3 className="text-4xl font-bold tracking-tight text-primary mb-1">
                            <AnimatedValue 
                              value={result.premium} 
                              prefix="₹" 
                              decimals={2}
                              duration={1500}
                            />
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Total premiums over {term} years: ₹{result.totalPremium.toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-secondary/50 text-center">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Death Benefit</p>
                            <p className="text-xl font-semibold">
                              <AnimatedValue 
                                value={result.deathBenefit} 
                                prefix="₹" 
                                duration={1500}
                              />
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-secondary/50 text-center">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Maturity Amount</p>
                            <p className="text-xl font-semibold">
                              {policyType === "term" ? (
                                "N/A"
                              ) : (
                                <AnimatedValue 
                                  value={result.maturityAmount} 
                                  prefix="₹" 
                                  duration={1500}
                                />
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Policy Details Summary */}
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Policy Type</span>
                            <span className="font-medium">
                              {policyType === "term" ? "Term Plan" :
                               policyType === "endowment" ? "Endowment Plan" :
                               policyType === "moneyBack" ? "Money Back Policy" :
                               policyType === "wholeLife" ? "Whole Life Plan" : "ULIP"}
                            </span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Sum Assured</span>
                            <span className="font-medium">₹{sumAssured.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-border">
                            <span className="text-muted-foreground">Policy Term</span>
                            <span className="font-medium">{term} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment Frequency</span>
                            <span className="font-medium">
                              {paymentFrequency === "annual" ? "Annual" :
                               paymentFrequency === "semiAnnual" ? "Semi-Annual" :
                               paymentFrequency === "quarterly" ? "Quarterly" : "Monthly"}
                            </span>
                          </div>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-muted-foreground bg-secondary/30 p-3 rounded-md">
                          Disclaimer: This is an estimate only. Actual premiums may vary based on 
                          medical examination, occupation, and other factors. Please contact an 
                          LIC agent for a detailed quote.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="animate-pulse bg-primary/10 w-32 h-12 rounded-md mb-4" />
                        <p className="text-muted-foreground">
                          Adjust the policy details to see your premium calculation
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorComponent;
