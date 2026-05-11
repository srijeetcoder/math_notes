export interface RevisionSession {
  id: string;
  duration: string;
  topics: string[];
  description: string;
}

export const lastNightPlan: RevisionSession[] = [
  {
    id: 'session-1',
    duration: 'First 1 hour',
    topics: ['Basic probability', 'Conditional probability', 'Bayes Theorem'],
    description: 'Focus on understanding the core difference between simple probability, "given that" conditions (Conditional), and reverse causes (Bayes). Practice identifying the question type.'
  },
  {
    id: 'session-2',
    duration: 'Next 1.5 hours',
    topics: ['PMF', 'PDF', 'CDF', 'Expectation', 'Variance'],
    description: 'Learn the difference between discrete (sum) and continuous (integral). Master finding the constant k. Practice Expectation and Variance formulas. Remember to square E(X) when finding V(X).'
  },
  {
    id: 'session-3',
    duration: 'Next 1 hour',
    topics: ['Binomial distribution'],
    description: 'Identify n, p, and q. Practice questions with "at least" and "at most" conditions. Memorize mean = np and variance = npq.'
  },
  {
    id: 'session-4',
    duration: 'Next 1 hour',
    topics: ['Correlation', 'Regression', 'Rank Correlation'],
    description: 'These are formula heavy. Create a table for x, y, x², y², xy. Understand that r sign matches the regression coefficients. Remember the Spearman formula starts with 1 - ...'
  },
  {
    id: 'session-5',
    duration: 'Last 30 minutes',
    topics: ['Formula Revision'],
    description: 'Review the formula sheet. Try to recall one solved example for each main topic. Relax and ensure you know how to identify which formula to use.'
  }
];
