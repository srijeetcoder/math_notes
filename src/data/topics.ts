export interface PracticeQuestion {
  id: string;
  text: string;
  solution: string;
}

export interface SolvedExample {
  title: string;
  problem: string;
  solution: string;
}

export interface Topic {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  conceptExplanation: string;
  whenToUse: string;
  importantFormulas: string[];
  stepByStepMethod: string[];
  solvedExamples: SolvedExample[];
  commonMistakes: string[];
  practiceQuestion: PracticeQuestion;
}

export const topics: Topic[] = [
  {
    id: 'basic-probability',
    title: 'Basic Probability',
    priority: 'High',
    conceptExplanation: 'Probability is the measure of the likelihood that an event will occur. It is quantified as a number between 0 and 1.',
    whenToUse: 'When you need to find the chance of simple events occurring, or combinations of independent/mutually exclusive events.',
    importantFormulas: [
      "P(A') = 1 - P(A)",
      "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      "P(A \\cap B) = P(A)P(B) \\text{, for independent events}",
      "P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)"
    ],
    stepByStepMethod: [
      'Identify the total number of possible outcomes (Sample Space).',
      'Identify the number of favorable outcomes.',
      'Divide favorable outcomes by total outcomes.',
      'For compound events, check if they are mutually exclusive or independent and apply the relevant formula.'
    ],
    solvedExamples: [
      {
        title: 'Union of Events',
        problem: 'Given P(A) = 0.5, P(B) = 0.4, and P(A ∩ B) = 0.2. Find P(A ∪ B).',
        solution: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\\\ P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7'
      }
    ],
    commonMistakes: [
      'Forgetting to subtract the intersection P(A ∩ B) when finding the union P(A ∪ B).',
      'Assuming events are independent when they are not.'
    ],
    practiceQuestion: {
      id: 'prac-bp-1',
      text: 'If P(A) = 0.6, P(B) = 0.5, and A and B are independent, find P(A ∪ B).',
      solution: '\\text{Since A and B are independent: } P(A \\cap B) = P(A)P(B) = 0.6 \\times 0.5 = 0.3 \\\\ \\text{Then, } P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.6 + 0.5 - 0.3 = 0.8'
    }
  },
  {
    id: 'conditional-probability',
    title: 'Conditional Probability',
    priority: 'High',
    conceptExplanation: 'Conditional probability is the probability of an event occurring, given that another event has already occurred.',
    whenToUse: 'If the question says "given that", "if it is known that", or imposes a condition on the sample space.',
    importantFormulas: [
      "P(A | B) = \\frac{P(A \\cap B)}{P(B)}",
      "P(A \\cap B) = P(B)P(A | B)"
    ],
    stepByStepMethod: [
      'Identify the event whose probability is asked (Event A).',
      'Identify the given condition (Event B).',
      'Find P(B) and P(A ∩ B).',
      'Use the formula P(A | B) = P(A ∩ B) / P(B).'
    ],
    solvedExamples: [
      {
        title: 'Basic Conditional',
        problem: 'Given P(A) = 0.4, P(B) = 0.3, P(A ∪ B) = 0.5, find P(A | B).',
        solution: '\\text{First, find } P(A \\cap B): \\\\ P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.4 + 0.3 - 0.5 = 0.2 \\\\ \\text{Then, } P(A | B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.2}{0.3} = \\frac{2}{3}'
      }
    ],
    commonMistakes: [
      'Confusing P(A | B) with P(B | A).',
      'Dividing by P(A) instead of P(B) when finding P(A | B).'
    ],
    practiceQuestion: {
      id: 'prac-cp-1',
      text: 'A die is rolled. What is the probability that it shows a 2, given that it shows an even number?',
      solution: '\\text{Let } A = \\text{getting a 2, } B = \\text{getting an even number.} \\\\ P(B) = \\frac{3}{6} = \\frac{1}{2} \\\\ P(A \\cap B) = P(\\text{getting a 2}) = \\frac{1}{6} \\\\ P(A | B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{1/6}{1/2} = \\frac{1}{3}'
    }
  },
  {
    id: 'bayes-theorem',
    title: 'Bayes Theorem',
    priority: 'High',
    conceptExplanation: 'Bayes theorem describes the probability of an event, based on prior knowledge of conditions that might be related to the event. It reverses the conditional probability.',
    whenToUse: 'If the question asks for a "cause" after a "result" has happened. Often involves selecting items from different sources (boxes, factories, etc.) and then observing a property.',
    importantFormulas: [
      "P(B_i | A) = \\frac{P(B_i)P(A | B_i)}{\\sum_{j} P(B_j)P(A | B_j)}"
    ],
    stepByStepMethod: [
      'Identify the mutually exclusive hypotheses (B1, B2, etc.) and their prior probabilities P(Bi).',
      'Identify the observed event (A).',
      'Find the conditional probabilities P(A | Bi) for each hypothesis.',
      'Calculate the total probability of A: P(A) = Σ P(Bi)P(A | Bi).',
      'Use Bayes formula to find the posterior probability P(Bi | A).'
    ],
    solvedExamples: [
      {
        title: 'Two Boxes Problem',
        problem: 'Box 1 has 4 white and 3 red balls. Box 2 has 3 white and 7 red balls. A box is selected randomly and one ball is drawn. Find the probability that it came from Box 1 given that it is white.',
        solution: '\\text{Let } B_1, B_2 \\text{ be choosing Box 1, Box 2. } P(B_1) = \\frac{1}{2}, P(B_2) = \\frac{1}{2}. \\\\ \\text{Let } W \\text{ be drawing a white ball.} \\\\ P(W | B_1) = \\frac{4}{7}, \\quad P(W | B_2) = \\frac{3}{10} \\\\ P(W) = P(B_1)P(W | B_1) + P(B_2)P(W | B_2) = \\left(\\frac{1}{2} \\times \\frac{4}{7}\\right) + \\left(\\frac{1}{2} \\times \\frac{3}{10}\\right) = \\frac{2}{7} + \\frac{3}{20} = \\frac{61}{140} \\\\ P(B_1 | W) = \\frac{P(B_1)P(W | B_1)}{P(W)} = \\frac{2/7}{61/140} = \\frac{40}{61}'
      }
    ],
    commonMistakes: [
      'Misidentifying the prior probabilities, especially if the problem doesn\'t state them (assume equally likely if so).',
      'Calculation errors in the denominator (Total Probability Theorem).'
    ],
    practiceQuestion: {
      id: 'prac-bt-1',
      text: 'Machine A produces 60% of items and Machine B produces 40%. 2% of A\'s items are defective, 5% of B\'s items are defective. A defective item is chosen. What is the probability it came from A?',
      solution: 'P(A) = 0.60, P(B) = 0.40 \\\\ P(D|A) = 0.02, P(D|B) = 0.05 \\\\ P(D) = P(A)P(D|A) + P(B)P(D|B) = (0.6)(0.02) + (0.4)(0.05) = 0.012 + 0.020 = 0.032 \\\\ P(A|D) = \\frac{P(A)P(D|A)}{P(D)} = \\frac{0.012}{0.032} = 0.375'
    }
  },
  {
    id: 'pmf-pdf-cdf',
    title: 'PMF, PDF, and CDF',
    priority: 'High',
    conceptExplanation: 'PMF (Probability Mass Function) gives probabilities for discrete values. PDF (Probability Density Function) describes continuous probabilities over an interval. CDF (Cumulative Distribution Function) accumulates probabilities up to a value x.',
    whenToUse: 'If p(x) is given for discrete values, use PMF. If f(x) is given with intervals, use PDF. If F(x) is asked, calculate cumulative distribution.',
    importantFormulas: [
      "PMF: p(x) \\ge 0, \\sum p(x) = 1",
      "PDF: f(x) \\ge 0, \\int_{-\\infty}^{\\infty} f(x) dx = 1",
      "P(a \\le X \\le b) = \\int_{a}^{b} f(x) dx",
      "CDF (Discrete): F(x) = P(X \\le x) = \\sum_{t \\le x} p(t)",
      "CDF (Continuous): F(x) = P(X \\le x) = \\int_{-\\infty}^{x} f(t) dt"
    ],
    stepByStepMethod: [
      'For discrete problems with unknown constant k, use Σ p(x) = 1.',
      'For continuous problems with unknown k, set integral of f(x) over all space to 1.',
      'To find CDF for continuous, integrate f(t) from lower bound up to x.',
      'To find probabilities from CDF, use P(a < X ≤ b) = F(b) - F(a).'
    ],
    solvedExamples: [
      {
        title: 'Finding constant k and CDF',
        problem: 'f(x) = kx, x = 1,2,3,4,5. Find k and F(x).',
        solution: '\\sum p(x) = 1 \\Rightarrow k(1 + 2 + 3 + 4 + 5) = 1 \\Rightarrow 15k = 1 \\Rightarrow k = \\frac{1}{15} \\\\ F(x) \\text{ is a step function:} \\\\ x < 1 : 0 \\\\ 1 \\le x < 2 : 1/15 \\\\ 2 \\le x < 3 : 3/15 \\\\ 3 \\le x < 4 : 6/15 \\\\ 4 \\le x < 5 : 10/15 \\\\ x \\ge 5 : 1'
      }
    ],
    commonMistakes: [
      'Forgetting the bounds of integration for continuous PDF/CDF.',
      'Confusing PMF and PDF.'
    ],
    practiceQuestion: {
      id: 'prac-pdf-1',
      text: 'A continuous random variable has PDF f(x) = kx^2 for 0 < x < 1, and 0 otherwise. Find k.',
      solution: '\\int_{0}^{1} kx^2 dx = 1 \\\\ \\left[ k \\frac{x^3}{3} \\right]_0^1 = 1 \\\\ \\frac{k}{3} = 1 \\Rightarrow k = 3'
    }
  },
  {
    id: 'expectation-variance',
    title: 'Expectation and Variance',
    priority: 'Medium',
    conceptExplanation: 'Expectation E(X) is the mean or average value. Variance V(X) measures the spread or dispersion around the mean.',
    whenToUse: 'When asked for mean, expected value, variance, or standard deviation.',
    importantFormulas: [
      "E(X) = \\sum x p(x) \\quad \\text{(Discrete)}",
      "E(X) = \\int x f(x) dx \\quad \\text{(Continuous)}",
      "V(X) = E(X^2) - [E(X)]^2",
      "E(X^2) = \\sum x^2 p(x) \\quad \\text{or} \\quad \\int x^2 f(x) dx"
    ],
    stepByStepMethod: [
      'First calculate E(X) using the appropriate formula (summation or integration).',
      'Then calculate E(X²).',
      'Use the variance formula: V(X) = E(X²) - [E(X)]².',
      'Remember Standard Deviation = √V(X).'
    ],
    solvedExamples: [
      {
        title: 'Discrete Expectation and Variance',
        problem: 'X has values 0, 1, 2 with probabilities 0.2, 0.5, 0.3. Find E(X) and V(X).',
        solution: 'E(X) = (0)(0.2) + (1)(0.5) + (2)(0.3) = 0 + 0.5 + 0.6 = 1.1 \\\\ E(X^2) = (0^2)(0.2) + (1^2)(0.5) + (2^2)(0.3) = 0 + 0.5 + 1.2 = 1.7 \\\\ V(X) = E(X^2) - [E(X)]^2 = 1.7 - (1.1)^2 = 1.7 - 1.21 = 0.49'
      }
    ],
    commonMistakes: [
      'Forgetting to square the E(X) term in the variance formula.',
      'Squaring the x values incorrectly during E(X²) calculation.'
    ],
    practiceQuestion: {
      id: 'prac-ev-1',
      text: 'For a continuous random variable with PDF f(x) = 2x for 0 < x < 1, find E(X).',
      solution: 'E(X) = \\int_{0}^{1} x \\cdot (2x) dx = \\int_{0}^{1} 2x^2 dx = \\left[ \\frac{2x^3}{3} \\right]_0^1 = \\frac{2}{3}'
    }
  },
  {
    id: 'binomial',
    title: 'Binomial Distribution',
    priority: 'High',
    conceptExplanation: 'Binomial distribution models the number of successes in n independent yes/no experiments, each with probability of success p.',
    whenToUse: 'If n (number of trials) and p (probability of success) are given, and you are asked for the probability of x successes.',
    importantFormulas: [
      "P(X = x) = {}^nC_x p^x q^{n-x}, \\quad q = 1 - p",
      "E(X) = np",
      "V(X) = npq"
    ],
    stepByStepMethod: [
      'Identify n, p, and calculate q = 1 - p.',
      'Identify the x values asked in the question (e.g., "at most 2" means x = 0, 1, 2).',
      'Use the Binomial formula to calculate the probability for each x.',
      'Sum the probabilities if needed.'
    ],
    solvedExamples: [
      {
        title: 'At Most Condition',
        problem: 'The probability that a pen is defective is 1/10. If 12 pens are made, find probability that at most 2 are defective.',
        solution: 'X \\sim \\text{Binomial}(n = 12, p = 1/10, q = 9/10) \\\\ P(X \\le 2) = P(X=0) + P(X=1) + P(X=2) \\\\ P(X=0) = {}^{12}C_0 (0.1)^0 (0.9)^{12} \\\\ P(X=1) = {}^{12}C_1 (0.1)^1 (0.9)^{11} \\\\ P(X=2) = {}^{12}C_2 (0.1)^2 (0.9)^{10} \\\\ P(X \\le 2) \\approx 0.2824 + 0.3766 + 0.2301 = 0.8891'
      }
    ],
    commonMistakes: [
      'Misinterpreting "at least x" (means x to n) or "at most x" (means 0 to x).',
      'Calculation mistakes with combinations (nCx).'
    ],
    practiceQuestion: {
      id: 'prac-bin-1',
      text: 'A coin is tossed 5 times. Find the probability of getting exactly 3 heads.',
      solution: 'n = 5, p = 1/2, q = 1/2, x = 3 \\\\ P(X=3) = {}^5C_3 (1/2)^3 (1/2)^2 = 10 \\times (1/8) \\times (1/4) = \\frac{10}{32} = \\frac{5}{16}'
    }
  },
  {
    id: 'correlation',
    title: 'Correlation Coefficient',
    priority: 'Medium',
    conceptExplanation: 'Correlation measures the strength and direction of the linear relationship between two variables.',
    whenToUse: 'When paired data is given and you need to find the linear relationship.',
    importantFormulas: [
      "r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}"
    ],
    stepByStepMethod: [
      'Create a table for X and Y.',
      'Calculate the means: X̄ and Ȳ.',
      'Calculate deviations: x = X - X̄ and y = Y - Ȳ.',
      'Calculate x², y², and xy for each pair.',
      'Sum all the columns and use the formula.'
    ],
    solvedExamples: [
      {
        title: 'Formula Usage',
        problem: 'Given Σx = 0, Σy = 0, Σxy = 12, Σx² = 10, Σy² = 20. Find r.',
        solution: '\\text{Since } \\Sigma x = 0 \\text{ and } \\Sigma y = 0, \\text{ deviations are already zero-centered.} \\\\ r = \\frac{\\Sigma xy}{\\sqrt{\\Sigma x^2 \\Sigma y^2}} = \\frac{12}{\\sqrt{10 \\times 20}} = \\frac{12}{\\sqrt{200}} \\approx 0.848'
      }
    ],
    commonMistakes: [
      'Sign errors when multiplying negative deviations.',
      'Forgetting the square root in the denominator.'
    ],
    practiceQuestion: {
      id: 'prac-corr-1',
      text: 'If r = 0.8, Cov(X,Y) = 4, and Var(X) = 2.25. Find Var(Y).',
      solution: 'r = \\frac{Cov(X,Y)}{\\sqrt{Var(X)Var(Y)}} \\\\ 0.8 = \\frac{4}{\\sqrt{2.25 \\times Var(Y)}} \\\\ 0.8 = \\frac{4}{1.5 \\times \\sqrt{Var(Y)}} \\\\ \\sqrt{Var(Y)} = \\frac{4}{1.2} = 3.33 \\\\ Var(Y) = 11.11'
    }
  },
  {
    id: 'regression',
    title: 'Regression Lines',
    priority: 'High',
    conceptExplanation: 'Regression lines are the best-fit straight lines used to predict the value of one variable based on another.',
    whenToUse: 'When asked to predict a value, or find the lines of Y on X or X on Y.',
    importantFormulas: [
      "\\text{Line of Y on X: } y - \\bar{y} = b_{yx}(x - \\bar{x}), \\quad b_{yx} = \\frac{\\sum xy}{\\sum x^2}",
      "\\text{Line of X on Y: } x - \\bar{x} = b_{xy}(y - \\bar{y}), \\quad b_{xy} = \\frac{\\sum xy}{\\sum y^2}",
      "r = \\pm \\sqrt{b_{yx} b_{xy}}"
    ],
    stepByStepMethod: [
      'Calculate the means X̄ and Ȳ.',
      'Calculate deviations x = X - X̄ and y = Y - Ȳ, then xy, x², y².',
      'Find coefficients byx and bxy.',
      'Substitute into the regression line equations.'
    ],
    solvedExamples: [
      {
        title: 'Regression Coefficients',
        problem: 'Given b_yx = -0.4 and b_xy = -0.9. Find the correlation coefficient r.',
        solution: '\\text{Since both regression coefficients are negative, r must be negative.} \\\\ r = -\\sqrt{(-0.4)(-0.9)} = -\\sqrt{0.36} = -0.6'
      }
    ],
    commonMistakes: [
      'Using the wrong slope coefficient for the corresponding line.',
      'Giving the wrong sign to r (it must match the sign of the regression coefficients).'
    ],
    practiceQuestion: {
      id: 'prac-reg-1',
      text: 'Two regression lines are 8x - 10y = 66 and 40x - 18y = 214. Find the means of X and Y.',
      solution: '\\text{The regression lines intersect at the means (}\\bar{x}, \\bar{y}\\text{).} \\\\ \\text{Solve the system:} \\\\ 8x - 10y = 66 \\quad \\text{--- (1)} \\\\ 40x - 18y = 214 \\quad \\text{--- (2)} \\\\ \\text{Multiply (1) by 5: } 40x - 50y = 330 \\\\ \\text{Subtract: } 32y = -116 \\Rightarrow y = -3.625 = \\bar{y} \\\\ \\text{Substitute: } 8x - 10(-3.625) = 66 \\Rightarrow 8x + 36.25 = 66 \\Rightarrow 8x = 29.75 \\Rightarrow x = 3.718 = \\bar{x}'
    }
  },
  {
    id: 'rank-correlation',
    title: 'Rank Correlation',
    priority: 'Low',
    conceptExplanation: 'Spearman rank correlation measures the strength and direction of the association between two ranked variables.',
    whenToUse: 'When data is given as ranks, or when data is ordinal/non-linear and needs to be ranked.',
    importantFormulas: [
      "\\rho = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}"
    ],
    stepByStepMethod: [
      'If not already ranked, assign ranks to X and Y values.',
      'Find the difference in ranks for each pair: d = Rx - Ry.',
      'Square each difference: d².',
      'Sum the d² column.',
      'Use the formula where n is the number of pairs.'
    ],
    solvedExamples: [
      {
        title: 'Spearman Calculation',
        problem: 'Given n = 10, Σd² = 33. Find the rank correlation coefficient.',
        solution: '\\rho = 1 - \\frac{6 \\times 33}{10(100 - 1)} = 1 - \\frac{198}{990} = 1 - 0.2 = 0.8'
      }
    ],
    commonMistakes: [
      'Forgetting the "1 -" at the beginning of the formula.',
      'Squaring n incorrectly in the denominator.'
    ],
    practiceQuestion: {
      id: 'prac-rc-1',
      text: 'Two judges rank 5 competitors. The rank differences squared sum to 12. What is the rank correlation?',
      solution: 'n = 5, \\Sigma d^2 = 12 \\\\ \\rho = 1 - \\frac{6(12)}{5(25-1)} = 1 - \\frac{72}{120} = 1 - 0.6 = 0.4'
    }
  }
];
