
// Premium calculation constants
const BASE_RATE = 45;
const AGE_FACTOR_MULTIPLIER = 1.07;
const TERM_FACTOR = 0.95;
const POLICY_TYPE_FACTORS = {
  "term": 1.0,
  "endowment": 2.5,
  "moneyBack": 2.2,
  "wholeLife": 3.1,
  "ulip": 2.8
};

export type PolicyType = "term" | "endowment" | "moneyBack" | "wholeLife" | "ulip";

export interface CalculationInput {
  age: number;
  sumAssured: number;
  term: number;
  policyType: PolicyType;
  paymentFrequency: "annual" | "semiAnnual" | "quarterly" | "monthly";
  smoker: boolean;
}

export interface CalculationResult {
  premium: number;
  totalPremium: number;
  maturityAmount: number;
  deathBenefit: number;
}

// Helper function to calculate age factor based on age
const calculateAgeFactor = (age: number): number => {
  return Math.pow(AGE_FACTOR_MULTIPLIER, Math.max(0, age - 25));
};

// Helper function to calculate term factor based on term
const calculateTermFactor = (term: number): number => {
  return Math.pow(TERM_FACTOR, Math.max(0, term - 10));
};

// Helper function to calculate frequency factor
const calculateFrequencyFactor = (frequency: "annual" | "semiAnnual" | "quarterly" | "monthly"): number => {
  switch (frequency) {
    case "annual": return 1.0;
    case "semiAnnual": return 0.515; // 1.03 for semi-annual
    case "quarterly": return 0.26;  // 1.04 for quarterly
    case "monthly": return 0.0875;  // 1.05 for monthly
    default: return 1.0;
  }
};

/**
 * Calculate insurance premium based on input parameters
 */
export const calculatePremium = (input: CalculationInput): CalculationResult => {
  const { age, sumAssured, term, policyType, paymentFrequency, smoker } = input;
  
  // Calculate base premium
  const ageFactor = calculateAgeFactor(age);
  const termFactor = calculateTermFactor(term);
  const policyTypeFactor = POLICY_TYPE_FACTORS[policyType] || 1.0;
  const smokerFactor = smoker ? 1.5 : 1.0;
  
  // Calculate annual premium per 1000 sum assured
  const annualPremiumPer1000 = BASE_RATE * ageFactor * termFactor * policyTypeFactor * smokerFactor;
  
  // Calculate premium based on sum assured (converted to thousands)
  const annualPremium = (annualPremiumPer1000 * sumAssured) / 1000;
  
  // Apply payment frequency adjustment
  const frequencyFactor = calculateFrequencyFactor(paymentFrequency);
  const premium = annualPremium * frequencyFactor;
  
  // Calculate total premium paid over the term
  let paymentsPerYear = 1;
  switch (paymentFrequency) {
    case "semiAnnual": paymentsPerYear = 2; break;
    case "quarterly": paymentsPerYear = 4; break;
    case "monthly": paymentsPerYear = 12; break;
  }
  
  const totalPayments = paymentsPerYear * term;
  const totalPremium = premium * totalPayments;
  
  // Calculate maturity amount (this is simplistic - actual calculations would be more complex)
  let maturityMultiplier = 1.0;
  switch (policyType) {
    case "term": maturityMultiplier = 0; break; // No maturity amount for term
    case "endowment": maturityMultiplier = 1.5; break;
    case "moneyBack": maturityMultiplier = 1.35; break;
    case "wholeLife": maturityMultiplier = 2.0; break;
    case "ulip": maturityMultiplier = 1.8; break;
  }
  
  const maturityAmount = policyType === "term" ? 0 : sumAssured + (maturityMultiplier * totalPremium);
  
  // Death benefit is typically the sum assured plus any accumulated bonuses
  const deathBenefit = sumAssured + (policyType !== "term" ? (0.3 * totalPremium) : 0);
  
  return {
    premium: parseFloat(premium.toFixed(2)),
    totalPremium: parseFloat(totalPremium.toFixed(2)),
    maturityAmount: parseFloat(maturityAmount.toFixed(2)),
    deathBenefit: parseFloat(deathBenefit.toFixed(2))
  };
};

// Policy descriptions for the different policy types
export const policyDescriptions = {
  term: "Provides coverage for a specific period. If death occurs during the term, beneficiaries receive the death benefit. No maturity benefits.",
  endowment: "Provides coverage and savings. If the policyholder survives the term, they receive the sum assured plus bonuses.",
  moneyBack: "Provides periodic returns during the policy term and a lump sum payment at maturity.",
  wholeLife: "Provides coverage for the entire life of the insured with premium payments typically ending at age 100.",
  ulip: "Unit Linked Insurance Plan combines insurance with investment. Part of the premium is used for life cover, while the rest is invested in funds of your choice."
};
