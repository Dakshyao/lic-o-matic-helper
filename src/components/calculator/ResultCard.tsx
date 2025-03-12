
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import AnimatedValue from '../ui-custom/AnimatedValue';
import { type CalculationResult, type PolicyType } from '@/lib/calculator';

interface ResultCardProps {
  result: CalculationResult | null;
  sumAssured: number;
  term: number;
  policyType: PolicyType;
  paymentFrequency: "annual" | "semiAnnual" | "quarterly" | "monthly";
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  sumAssured,
  term,
  policyType,
  paymentFrequency,
}) => {
  return (
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
  );
};

export default ResultCard;
