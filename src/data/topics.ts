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
    conceptExplanation: 'Probability is the mathematical measure of the likelihood that an event will occur. Formally, we define a Probability Space $(\\Omega, \\mathcal{F}, P)$ where:\n1. $\\Omega$ is the Sample Space (set of all possible outcomes).\n2. $\\mathcal{F}$ is the Event Space (a sigma-field of subsets of $\\Omega$) satisfying closure under complementation and countable unions.\n3. $P$ is a Probability Measure satisfying the Kolmogorov Axioms:\n   - Axiom 1: Non-negativity. For any event $A \\in \\mathcal{F}$, $P(A) \\ge 0$.\n   - Axiom 2: Normalization. The probability of the entire sample space is 1, i.e., $P(\\Omega) = 1$.\n   - Axiom 3: Countable Additivity. For any sequence of pairwise mutually exclusive events $A_1, A_2, \\dots$, we have $P(\\bigcup A_i) = \\sum P(A_i)$.\n\nKey Theorems and Properties:\n- Complement Rule: $P(A^c) = 1 - P(A)$.\n- Empty Set: $P(\\emptyset) = 0$.\n- Monotonicity: If $A \\subseteq B$, then $P(A) \\le P(B)$ and $P(B \\setminus A) = P(B) - P(A)$.\n- Addition Theorem (Inclusion-Exclusion Principle):\n  - For two events: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.\n  - For three events: $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)$.\n- Boole\'s Inequality (Union Bound): $P(\\bigcup_{i=1}^n A_i) \\le \\sum_{i=1}^n P(A_i)$.\n- Bonferroni\'s Inequality: $P(A \\cap B) \\ge P(A) + P(B) - 1$.',
    whenToUse: 'Use when calculating the probability of simple events, compound events, complementary events, or unions of non-mutually exclusive events using classical or axiomatic methods.',
    importantFormulas: [
      "P(A^c) = 1 - P(A)",
      "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      "P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)",
      "P(A \\cap B) \\ge P(A) + P(B) - 1"
    ],
    stepByStepMethod: [
      'Define the Sample Space Ω and determine the total number of outcomes n(Ω).',
      'Identify the target event A and find the number of favorable outcomes n(A).',
      'If outcomes are equally likely, use classical probability: P(A) = n(A) / n(Ω).',
      'For unions of events, check if they are mutually exclusive. If not, subtract their intersections using the Addition Theorem.'
    ],
    solvedExamples: [
      {
        title: 'Probability of Card Combinations',
        problem: 'A card is drawn from a standard pack of 52 cards. What is the probability that it is either a spade or a king?',
        solution: '\\text{Let } A = \\text{drawing a spade, } B = \\text{drawing a king.} \\\\ \\text{Total cards } n(\\Omega) = 52. \\\\ \\text{Spades } n(A) = 13 \\Rightarrow P(A) = \\frac{13}{52}. \\\\ \\text{Kings } n(B) = 4 \\Rightarrow P(B) = \\frac{4}{52}. \\\\ \\text{Spade and King (King of spades) } n(A \\cap B) = 1 \\Rightarrow P(A \\cap B) = \\frac{1}{52}. \\\\ \\text{By Addition Theorem: } \\\\ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{13}{52} + \\frac{4}{52} - \\frac{1}{52} = \\frac{16}{52} = \\frac{4}{13} \\approx 0.3077'
      },
      {
        title: 'Inclusion-Exclusion for Three Events',
        problem: 'In a class of 100 students, 40 play football, 30 play basketball, and 25 play cricket. 10 play football and basketball, 8 play football and cricket, 6 play basketball and cricket, and 3 play all three. Find the probability that a randomly selected student plays at least one of the three sports.',
        solution: '\\text{Let } F, B, C \\text{ represent Football, Basketball, and Cricket. } n(\\Omega) = 100. \\\\ P(F) = 0.40, \\quad P(B) = 0.30, \\quad P(C) = 0.25. \\\\ P(F \\cap B) = 0.10, \\quad P(F \\cap C) = 0.08, \\quad P(B \\cap C) = 0.06. \\\\ P(F \\cap B \\cap C) = 0.03. \\\\ \\text{Using the Inclusion-Exclusion Principle: } \\\\ P(F \\cup B \\cup C) = P(F) + P(B) + P(C) - P(F \\cap B) - P(F \\cap C) - P(B \\cap C) + P(F \\cap B \\cap C) \\\\ = 0.40 + 0.30 + 0.25 - 0.10 - 0.08 - 0.06 + 0.03 = 0.74'
      },
      {
        title: 'Verification of Bonferroni\'s Inequality',
        problem: 'If $P(A) = 0.8$ and $P(B) = 0.7$, show that the probability of their intersection is at least $0.5$.',
        solution: '\\text{By Bonferroni\'s Inequality: } P(A \\cap B) \\ge P(A) + P(B) - 1. \\\\ \\text{Substituting the values: } \\\\ P(A \\cap B) \\ge 0.8 + 0.7 - 1 = 1.5 - 1 = 0.5. \\\\ \\text{Thus, } P(A \\cap B) \\ge 0.5. \\text{ Verified.}'
      }
    ],
    commonMistakes: [
      'Adding individual probabilities without subtracting their intersection when events are not mutually exclusive.',
      'Assuming all outcomes are equally likely in scenarios with biased devices (e.g., loaded dice).',
      'Forgetting that the maximum possible value of a probability is 1.'
    ],
    practiceQuestion: {
      id: 'prac-bp-1',
      text: 'If two fair dice are rolled, find the probability that the sum of the numbers shown is a multiple of 3 or a multiple of 4.',
      solution: '\\text{Total outcomes } n(\\Omega) = 36. \\\\ \\text{Let } A = \\text{sum is multiple of 3 } \\{3, 6, 9, 12\\}, \\\\ B = \\text{sum is multiple of 4 } \\{4, 8, 12\\}. \\\\ A = \\{(1,2),(2,1),(1,5),(2,4),(3,3),(4,2),(5,1),(3,6),(4,5),(5,4),(6,3),(6,6)\\} \\Rightarrow n(A) = 12 \\Rightarrow P(A) = \\frac{12}{36}. \\\\ B = \\{(1,3),(2,2),(3,1),(2,6),(3,5),(4,4),(5,3),(6,2),(6,6)\\} \\Rightarrow n(B) = 9 \\Rightarrow P(B) = \\frac{9}{36}. \\\\ A \\cap B = \\{\\text{sum is a multiple of 12 } (6,6)\\} \\Rightarrow n(A \\cap B) = 1 \\Rightarrow P(A \\cap B) = \\frac{1}{36}. \\\\ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{12}{36} + \\frac{9}{36} - \\frac{1}{36} = \\frac{20}{36} = \\frac{5}{9} \\approx 0.5556'
    }
  },
  {
    id: 'conditional-probability',
    title: 'Conditional Probability & Independence',
    priority: 'High',
    conceptExplanation: 'Conditional Probability describes the likelihood of an event $A$ occurring given that another event $B$ has already occurred. It restricts the active sample space from $\\Omega$ to $B$.\n\nDefinition:\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad \\text{provided } P(B) > 0$$\n\nMultiplication Theorem of Probability:\n$$P(A \\cap B) = P(B) P(A|B) = P(A) P(B|A)$$\nFor $n$ events: $P(A_1 \\cap A_2 \\cap \\dots \\cap A_n) = P(A_1) P(A_2 | A_1) P(A_3 | A_1 \\cap A_2) \\dots P(A_n | A_1 \\cap \\dots \\cap A_{n-1})$.\n\nIndependence:\nTwo events $A$ and $B$ are independent if the occurrence of one does not affect the probability of the other. Formally:\n$$P(A|B) = P(A) \\iff P(B|A) = P(B) \\iff P(A \\cap B) = P(A)P(B)$$\nNote: Mutually exclusive events are NOT independent (if $A \\cap B = \\emptyset$ and $P(A)P(B) > 0$, then $P(A \\cap B) = 0 \\neq P(A)P(B)$).\n\nPairwise vs. Mutual Independence:\nFor three events $A$, $B$, and $C$, they are:\n- Pairwise Independent if: $P(A \\cap B) = P(A)P(B)$, $P(B \\cap C) = P(B)P(C)$, and $P(A \\cap C) = P(A)P(C)$.\n- Mutually Independent if they are pairwise independent AND: $P(A \\cap B \\cap C) = P(A)P(B)P(C)$.\nPairwise independence does not imply mutual independence.',
    whenToUse: 'Use when the probability of an event must be evaluated under a given restriction or condition (indicated by keywords like "given that", "if", "known that"). Use independence properties to simplify joint probabilities of multiple trials.',
    importantFormulas: [
      "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
      "P(A \\cap B) = P(A)P(B) \\quad \\text{(for independent events)}",
      "P(A \\cap B \\cap C) = P(A)P(B)P(C) \\quad \\text{(for mutually independent events)}"
    ],
    stepByStepMethod: [
      'Identify the event A whose probability is to be calculated.',
      'Identify the conditioning event B that has already occurred.',
      'Calculate P(B) and the joint probability P(A ∩ B).',
      'Substitute these values into the conditional probability formula.',
      'If checking for independence, verify whether P(A ∩ B) equals P(A) * P(B).'
    ],
    solvedExamples: [
      {
        title: 'Conditional Probability from Contingency Data',
        problem: 'A family has two children. What is the probability that both are boys, given that at least one is a boy?',
        solution: '\\text{Sample Space } \\Omega = \\{\\text{BB, BG, GB, GG}\\}. \\text{ Each outcome is equally likely with probability } 1/4. \\\\ \\text{Let } A = \\text{both are boys } \\{BB\\}. \\\\ \\text{Let } B = \\text{at least one boy } \\{BB, BG, GB\\}. \\\\ P(B) = \\frac{3}{4}. \\\\ \\text{The intersection } A \\cap B = \\{BB\\} \\Rightarrow P(A \\cap B) = \\frac{1}{4}. \\\\ \\text{Conditional Probability: } P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{1/4}{3/4} = \\frac{1}{3} \\approx 0.3333'
      },
      {
        title: 'Independent Events Operations',
        problem: 'If A and B are independent events with P(A) = 0.3 and P(B) = 0.4. Find the probability that at least one of them occurs.',
        solution: '\\text{We want to find } P(A \\cup B). \\\\ \\text{By Addition Theorem: } P(A \\cup B) = P(A) + P(B) - P(A \\cap B). \\\\ \\text{Since A and B are independent: } P(A \\cap B) = P(A)P(B) = 0.3 \\times 0.4 = 0.12. \\\\ \\text{Therefore, } P(A \\cup B) = 0.3 + 0.4 - 0.12 = 0.7 - 0.12 = 0.58. \\\\ \\text{Alternatively, using complements: } \\\\ P(A \\cup B) = 1 - P(A^c \\cap B^c) = 1 - P(A^c)P(B^c) = 1 - (0.7)(0.6) = 1 - 0.42 = 0.58.'
      },
      {
        title: 'Pairwise but not Mutual Independence (Bernstein\'s Example)',
        problem: 'A tetrahedron has four faces colored: Red (R), Blue (B), Yellow (Y), and the fourth face has all three colors (RBY). A face is chosen at random. Let $A$, $B$, $C$ be the events that the chosen face contains R, B, and Y respectively. Show that they are pairwise independent but not mutually independent.',
        solution: '\\text{The outcomes on the faces are } \\Omega = \\{R, B, Y, RBY\\}. \\text{ Each face has probability } 1/4. \\\\ \\text{Event } A = \\{R, RBY\\} \\Rightarrow P(A) = 2/4 = 1/2. \\\\ \\text{Event } B = \\{B, RBY\\} \\Rightarrow P(B) = 2/4 = 1/2. \\\\ \\text{Event } C = \\{Y, RBY\\} \\Rightarrow P(C) = 2/4 = 1/2. \\\\ \\text{Intersections: } A \\cap B = \\{RBY\\} \\Rightarrow P(A \\cap B) = 1/4. \\\\ \\text{Check pairwise independence: } P(A)P(B) = (1/2)(1/2) = 1/4 = P(A \\cap B). \\\\ \\text{Similarly, } P(B \\cap C) = 1/4 = P(B)P(C) \\text{ and } P(A \\cap C) = 1/4 = P(A)P(C). \\\\ \\text{So they are pairwise independent.} \\\\ \\text{Now check mutual independence: } A \\cap B \\cap C = \\{RBY\\} \\Rightarrow P(A \\cap B \\cap C) = 1/4. \\\\ \\text{But } P(A)P(B)P(C) = (1/2)(1/2)(1/2) = 1/8. \\\\ \\text{Since } P(A \\cap B \\cap C) = 1/4 \\neq 1/8, \\text{ they are not mutually independent.}'
      }
    ],
    commonMistakes: [
      'Dividing by P(A) instead of P(B) when calculating P(A|B).',
      'Confusing independent events with mutually exclusive events (independent events can happen together, mutually exclusive events cannot).',
      'Assuming pairwise independence automatically guarantees mutual independence.'
    ],
    practiceQuestion: {
      id: 'prac-cp-1',
      text: 'A box contains 5 red and 3 blue marbles. Two marbles are drawn one after the other without replacement. Find the probability that the second marble is blue, given that the first was red.',
      solution: '\\text{Let } R_1 = \\text{first marble is red, } B_2 = \\text{second marble is blue.} \\\\ \\text{Initially, total marbles = 8 (5 red, 3 blue).} \\\\ \\text{If the first marble is red, it is removed. Now, remaining marbles = 7 (4 red, 3 blue).} \\\\ \\text{The probability of drawing a blue marble from the remaining ones is: } \\\\ P(B_2 | R_1) = \\frac{\\text{favorable outcomes}}{\\text{total remaining}} = \\frac{3}{7} \\approx 0.4286'
    }
  },
  {
    id: 'bayes-theorem',
    title: 'Bayes Theorem & Total Probability',
    priority: 'High',
    conceptExplanation: 'Bayes\' Theorem describes the probability of an event based on prior knowledge of conditions related to the event. It is the fundamental law of posterior probability (updating belief given evidence).\n\nLaw of Total Probability:\nLet $B_1, B_2, \\dots, B_n$ be a partition of the sample space $\\Omega$ (i.e. they are pairwise mutually exclusive and exhaustive events, $\\bigcup B_i = \\Omega$ and $\\sum P(B_i) = 1$). For any event $A$:\n$$P(A) = \\sum_{i=1}^{n} P(B_i) P(A|B_i)$$\n\nBayes\' Theorem Formula:\n$$P(B_k|A) = \\frac{P(B_k) P(A|B_k)}{P(A)} = \\frac{P(B_k) P(A|B_k)}{\\sum_{i=1}^{n} P(B_i) P(A|B_i)}$$\nWhere:\n- $P(B_k)$ is the Prior Probability of hypothesis $B_k$ (before observing evidence $A$).\n- $P(A|B_k)$ is the Likelihood of observing evidence $A$ given cause $B_k$.\n- $P(B_k|A)$ is the Posterior Probability of cause $B_k$ given the observed evidence $A$.\n- $P(A)$ is the Marginal Likelihood or total probability of the evidence.',
    whenToUse: 'Use when you observe a final outcome (effect) and want to determine the probability that it was caused by a specific prior event or source (cause).',
    importantFormulas: [
      "P(B_k|A) = \\frac{P(B_k) P(A|B_k)}{\\sum P(B_i) P(A|B_i)} \\quad \\text{(Bayes' Theorem)}",
      "P(A) = \\sum_{i=1}^n P(B_i) P(A | B_i) \\quad \\text{(Law of Total Probability)}"
    ],
    stepByStepMethod: [
      'Identify the final observed event A (the effect or evidence).',
      'Identify the mutually exclusive and exhaustive prior events B_1, B_2, ... B_n (the causes or hypotheses).',
      'Write down the prior probabilities P(B_i) and the conditional likelihoods P(A|B_i) for each cause.',
      'Calculate the total probability of the effect: P(A) = Σ P(B_i)P(A|B_i).',
      'Apply Bayes\' formula to calculate the posterior probability of the target cause P(B_k|A).'
    ],
    solvedExamples: [
      {
        title: 'Diagnostic Test Evaluation',
        problem: 'A disease affects 1% of a population. A diagnostic test is 99% accurate when the disease is present, but has a 2% false-positive rate. If a person tests positive, what is the probability they actually have the disease?',
        solution: '\\text{Let } D = \\text{has disease, } D\' = \\text{healthy, } T = \\text{tests positive.} \\\\ P(D) = 0.01 \\Rightarrow P(D\') = 0.99. \\\\ P(T|D) = 0.99 \\quad (\\text{sensitivity / true positive}). \\\\ P(T|D\') = 0.02 \\quad (\\text{false positive}). \\\\ \\text{By Law of Total Probability: } \\\\ P(T) = P(D)P(T|D) + P(D\')P(T|D\') = (0.01)(0.99) + (0.99)(0.02) = 0.0099 + 0.0198 = 0.0297. \\\\ \\text{By Bayes\' Theorem: } \\\\ P(D|T) = \\frac{P(D)P(T|D)}{P(T)} = \\frac{0.0099}{0.0297} = \\frac{1}{3} \\approx 0.3333'
      },
      {
        title: 'Three-Machine Defect Analysis',
        problem: 'Three machines A, B, and C produce 50%, 30%, and 20% of the items in a factory. The percentage of defective outputs is 3%, 4%, and 5% respectively. A randomly selected item is found to be defective. What is the probability it was produced by machine A?',
        solution: '\\text{Let } A, B, C = \\text{produced by machine A, B, C; } D = \\text{defective.} \\\\ P(A) = 0.50, \\quad P(B) = 0.30, \\quad P(C) = 0.20. \\\\ P(D|A) = 0.03, \\quad P(D|B) = 0.04, \\quad P(D|C) = 0.05. \\\\ P(D) = P(A)P(D|A) + P(B)P(D|B) + P(C)P(D|C) \\\\ = (0.50)(0.03) + (0.30)(0.04) + (0.20)(0.05) = 0.015 + 0.012 + 0.010 = 0.037. \\\\ P(A|D) = \\frac{P(A)P(D|A)}{P(D)} = \\frac{0.015}{0.037} = \\frac{15}{37} \\approx 0.4054'
      },
      {
        title: 'The Bertrand Box Paradox',
        problem: 'Three boxes each have two drawers. Box 1 contains two gold coins, Box 2 contains two silver coins, and Box 3 contains one gold and one silver coin. A box is chosen at random and a drawer is opened to reveal a gold coin. What is the probability that the other drawer of this box also contains a gold coin?',
        solution: '\\text{Let } B_1, B_2, B_3 \\text{ be the events of choosing Box 1, 2, and 3. } P(B_1)=P(B_2)=P(B_3)=1/3. \\\\ \\text{Let } G = \\text{revealing a gold coin.} \\\\ P(G|B_1) = 1.0 \\quad (\\text{both are gold}). \\\\ P(G|B_2) = 0.0 \\quad (\\text{both are silver}). \\\\ P(G|B_3) = 0.5 \\quad (\\text{one gold, one silver}). \\\\ \\text{We want to find the probability that the chosen box is Box 1 given a gold coin, i.e., } P(B_1|G). \\\\ P(G) = P(B_1)P(G|B_1) + P(B_2)P(G|B_2) + P(B_3)P(G|B_3) \\\\ = (1/3)(1) + (1/3)(0) + (1/3)(0.5) = 1/3 + 0 + 1/6 = 1/2. \\\\ P(B_1|G) = \\frac{P(B_1)P(G|B_1)}{P(G)} = \\frac{(1/3)(1)}{1/2} = \\frac{2}{3} \\approx 0.6667'
      }
    ],
    commonMistakes: [
      'Confusing the likelihood P(A|B) with the posterior P(B|A).',
      'Forgetting to verify that the prior probabilities sum to 1.',
      'Incorrectly calculating the total probability in the denominator by omitting one of the partitions.'
    ],
    practiceQuestion: {
      id: 'prac-bt-1',
      text: 'An insurance company claims that 30% of drivers are high-risk, and 70% are low-risk. The probability of an accident in a year is 0.15 for high-risk drivers and 0.05 for low-risk drivers. If a driver has an accident, what is the probability that they are high-risk?',
      solution: '\\text{Let } H = \\text{high-risk, } L = \\text{low-risk, } A = \\text{accident.} \\\\ P(H) = 0.30, \\quad P(L) = 0.70. \\\\ P(A|H) = 0.15, \\quad P(A|L) = 0.05. \\\\ P(A) = P(H)P(A|H) + P(L)P(A|L) = (0.30)(0.15) + (0.70)(0.05) = 0.045 + 0.035 = 0.080. \\\\ P(H|A) = \\frac{P(H)P(A|H)}{P(A)} = \\frac{0.045}{0.080} = 0.5625'
    }
  },
  {
    id: 'pmf-pdf-cdf',
    title: 'PMF, PDF, & CDF (Discrete vs Continuous)',
    priority: 'High',
    conceptExplanation: 'Random variables represent quantitative outcomes of random processes. They are categorized based on their support sets.\n\n1. Probability Mass Function (PMF) - Discrete Random Variables:\nGives the exact probability that $X$ takes the value $x$. Properties:\n- $p(x) = P(X = x) \\ge 0$\n- $\\sum_{all \\, x} p(x) = 1$\n\n2. Probability Density Function (PDF) - Continuous Random Variables:\nRepresents the relative probability density at a given point. The probability of a single point is zero, $P(X = x) = 0$. Probabilities are computed over intervals as areas under the PDF curve. Properties:\n- $f(x) \\ge 0$\n- $\\int_{-\\infty}^{\\infty} f(x) dx = 1 \\quad \\text{(Normalization condition)}$\n- $P(a \\le X \\le b) = \\int_{a}^{b} f(x) dx$\n\n3. Cumulative Distribution Function (CDF):\nAccumulates probability up to value $x$. Defined as $F(x) = P(X \\le x)$.\n- Discrete: $F(x) = \\sum_{t \\le x} p(t)$ (step function)\n- Continuous: $F(x) = \\int_{-\\infty}^{x} f(t) dt$, and by the Fundamental Theorem of Calculus, $f(x) = \\frac{d}{dx} F(x)$ at points of differentiability.\nProperties of CDF:\n- $F(x)$ is non-decreasing: $x_1 < x_2 \\implies F(x_1) \\le F(x_2)$.\n- $F(x)$ is right-continuous: $\\lim_{h \\to 0^+} F(x+h) = F(x)$.\n- Limits at infinity: $F(-\\infty) = 0$ and $F(+\\infty) = 1$.\n- Interval probability: $P(a < X \\le b) = F(b) - F(a)$.',
    whenToUse: 'Use PMF for integer counting variables (e.g. number of items, defect counts). Use PDF for continuous physical measurements (e.g. time, weight, height). Use CDF to compute threshold probabilities (e.g., "value is less than or equal to x", "between a and b").',
    importantFormulas: [
      "\\sum p(x) = 1 \\quad \\text{(PMF normalization)}",
      "\\int_{-\\infty}^{\\infty} f(x) dx = 1 \\quad \\text{(PDF normalization)}",
      "F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t) dt",
      "P(a \\le X \\le b) = F(b) - F(a) \\quad (\\text{or } \\int_a^b f(x)dx)"
    ],
    stepByStepMethod: [
      'To find an unknown constant k in a PMF/PDF, set the sum/integral over all possible values to 1, and solve for k.',
      'To calculate CDF F(x) for a continuous variable, integrate the PDF from the lower limit of its support up to x. Use a dummy integration variable (e.g. t) so that x remains only in the limits.',
      'To find P(a ≤ X ≤ b), either integrate the PDF from a to b, or evaluate F(b) - F(a).'
    ],
    solvedExamples: [
      {
        title: 'Finding Integration Constant & CDF',
        problem: 'A continuous random variable X has PDF f(x) = kx(2 - x) for 0 < x < 2, and 0 otherwise. Find k and the CDF F(x).',
        solution: '\\text{Set total integral to 1:} \\\\ \\int_0^2 k(2x - x^2) dx = 1 \\Rightarrow k \\left[ x^2 - \\frac{x^3}{3} \\right]_0^2 = 1 \\\\ k \\left( 4 - \\frac{8}{3} \\right) = 1 \\Rightarrow k \\left( \\frac{4}{3} \\right) = 1 \\Rightarrow k = \\frac{3}{4} = 0.75. \\\\ \\text{For CDF } F(x) \\text{ in the interval } 0 < x < 2: \\\\ F(x) = \\int_0^x \\frac{3}{4}(2t - t^2) dt = \\frac{3}{4} \\left[ t^2 - \\frac{t^3}{3} \\right]_0^x = \\frac{3}{4}x^2 - \\frac{x^3}{4}. \\\\ \\text{The complete CDF is:} \\\\ F(x) = \\begin{cases} 0 & x \\le 0 \\\\ \\frac{3}{4}x^2 - \\frac{x^3}{4} & 0 < x < 2 \\\\ 1 & x \\ge 2 \\end{cases}'
      },
      {
        title: 'Range Probability using CDF',
        problem: 'For the CDF F(x) = 1 - e^(-2x) for x > 0 (and 0 for x <= 0), find P(1 < X < 2).',
        solution: '\\text{Using the properties of the CDF:} \\\\ P(1 < X < 2) = F(2) - F(1). \\\\ F(2) = 1 - e^{-4}. \\\\ F(1) = 1 - e^{-2}. \\\\ F(2) - F(1) = (1 - e^{-4}) - (1 - e^{-2}) = e^{-2} - e^{-4} \\approx 0.1353 - 0.0183 = 0.1170'
      },
      {
        title: 'Discrete PMF Parameter Evaluation',
        problem: 'A discrete random variable X has PMF P(X = x) = C x^2 for x = 1, 2, 3. Find C and P(X >= 2).',
        solution: '\\text{Set total sum to 1:} \\\\ \\sum_{x=1}^3 P(X = x) = 1 \\Rightarrow C(1^2) + C(2^2) + C(3^2) = 1 \\\\ C(1 + 4 + 9) = 1 \\Rightarrow 14C = 1 \\Rightarrow C = \\frac{1}{14}. \\\\ \\text{Now find } P(X \\ge 2): \\\\ P(X \\ge 2) = P(X = 2) + P(X = 3) = 4C + 9C = 13C = \\frac{13}{14} \\approx 0.9286.'
      }
    ],
    commonMistakes: [
      'Integrating outside the boundaries where the PDF is defined.',
      'Using the variable x as both the limit of integration and the integration variable (always write f(t) dt instead of f(x) dx when finding F(x)).',
      'Forgetting that P(X = x) = 0 for continuous random variables, so P(X < x) is the same as P(X <= x).'
    ],
    practiceQuestion: {
      id: 'prac-pdf-1',
      text: 'A continuous random variable has PDF f(x) = C/x^2 for x > 1, and 0 otherwise. Find the constant C.',
      solution: '\\text{Set total integral to 1:} \\\\ \\int_1^{\\infty} \\frac{C}{x^2} dx = 1 \\Rightarrow C \\left[ -\\frac{1}{x} \\right]_1^{\\infty} = 1 \\\\ C (0 - (-1)) = 1 \\Rightarrow C(1) = 1 \\Rightarrow C = 1'
    }
  },
  {
    id: 'expectation-variance',
    title: 'Mathematical Expectation & Variance',
    priority: 'Medium',
    conceptExplanation: 'Expectation and variance summarize the central tendency and dispersion of a random variable\'s distribution.\n\n1. Mathematical Expectation (Mean):\nRepresents the long-run theoretical average value of a random variable. Defined as $E(X) = \\mu$.\n- Discrete: $E(X) = \\sum x p(x)$\n- Continuous: $E(X) = \\int_{-\\infty}^{\\infty} x f(x) dx$\nProperties of Expectation:\n- Linearity: $E(aX + b) = aE(X) + b$ (always holds).\n- Sum: $E(X + Y) = E(X) + E(Y)$ (always holds, even if variables are dependent).\n- Product: $E(XY) = E(X)E(Y)$ (if $X$ and $Y$ are independent).\n\n2. Variance:\nMeasures the dispersion or spread around the mean. Defined as $Var(X) = \\sigma^2$.\n$$Var(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$$\nProperties of Variance:\n- Scale and Translation: $Var(aX + b) = a^2 Var(X)$ (translation does not affect variance).\n- Sum: $Var(X \\pm Y) = Var(X) + Var(Y) \\pm 2Cov(X, Y)$.\n- Uncorrelated / Independent variables: If $X$ and $Y$ are independent, $Cov(X,Y) = 0 \\Rightarrow Var(X \\pm Y) = Var(X) + Var(Y)$.\n\n3. Covariance:\nMeasures the joint variability of two random variables.\n$$Cov(X, Y) = E[(X - E(X))(Y - E(Y))] = E(XY) - E(X)E(Y)$$',
    whenToUse: 'Use when asked to determine the mean value, expected return, variance, standard deviation, or covariance of random variables in engineering or financial models.',
    importantFormulas: [
      "E(X) = \\sum x p(x) \\quad \\text{or} \\quad \\int_{-\\infty}^{\\infty} x f(x) dx",
      "Var(X) = E(X^2) - [E(X)]^2",
      "Var(aX + b) = a^2 Var(X)",
      "Var(X \\pm Y) = Var(X) + Var(Y) \\pm 2Cov(X, Y)"
    ],
    stepByStepMethod: [
      'Calculate E(X) using the appropriate summation (discrete) or integration (continuous) formula.',
      'Calculate E(X²) by evaluating the sum/integral of x² * p(x) or x² * f(x).',
      'Use the variance identity: Var(X) = E(X²) - [E(X)]².',
      'Take the square root of variance if standard deviation (σ) is requested.',
      'For linear combinations Y = aX + b, use E(Y) = aE(X) + b and Var(Y) = a²Var(X).'
    ],
    solvedExamples: [
      {
        title: 'Continuous Expectation & Variance',
        problem: 'Find the mean and variance for the PDF f(x) = 3x^2 for 0 < x < 1.',
        solution: '\\text{Calculate Expected Value } E(X): \\\\ E(X) = \\int_0^1 x \\cdot (3x^2) dx = \\int_0^1 3x^3 dx = \\left[ \\frac{3x^4}{4} \\right]_0^1 = \\frac{3}{4} = 0.75. \\\\ \\text{Calculate Expected Square } E(X^2): \\\\ E(X^2) = \\int_0^1 x^2 \\cdot (3x^2) dx = \\int_0^1 3x^4 dx = \\left[ \\frac{3x^5}{5} \\right]_0^1 = \\frac{3}{5} = 0.60. \\\\ \\text{Calculate Variance } Var(X): \\\\ Var(X) = E(X^2) - [E(X)]^2 = 0.60 - (0.75)^2 = 0.60 - 0.5625 = 0.0375.'
      },
      {
        title: 'Variance under Linear Transformation',
        problem: 'If X has mean 5 and variance 3, find the expectation and variance of Y = -2X + 4.',
        solution: '\\text{Expectation: } E(Y) = E(-2X + 4) = -2E(X) + 4 = -2(5) + 4 = -6. \\\\ \\text{Variance: } Var(Y) = Var(-2X + 4) = (-2)^2 Var(X) = 4 \\times Var(X) = 4 \\times 3 = 12.'
      },
      {
        title: 'Expected Sum and Variance of Independent Variables',
        problem: 'Let X and Y be independent random variables with E(X) = 2, E(Y) = 3, Var(X) = 1, and Var(Y) = 2. Find E(2X - 3Y) and Var(2X - 3Y).',
        solution: '\\text{Using linearity of expectation: } \\\\ E(2X - 3Y) = 2E(X) - 3E(Y) = 2(2) - 3(3) = 4 - 9 = -5. \\\\ \\text{Since X and Y are independent, } Cov(X,Y) = 0. \\\\ \\text{Using variance properties: } \\\\ Var(2X - 3Y) = Var(2X) + Var(-3Y) = 2^2 Var(X) + (-3)^2 Var(Y) \\\\ = 4Var(X) + 9Var(Y) = 4(1) + 9(2) = 4 + 18 = 22.'
      }
    ],
    commonMistakes: [
      'Forgetting that constant additions do not affect variance: Var(X + c) = Var(X).',
      'Failing to square the coefficient when calculating variance: Var(aX) = a²Var(X) (never negative!).',
      'Adding variances directly for dependent variables without adding the covariance term.'
    ],
    practiceQuestion: {
      id: 'prac-ev-1',
      text: 'A discrete random variable has E(X) = 2 and E(X^2) = 6. Find the standard deviation of 3X + 1.',
      solution: '\\text{First find } Var(X) = E(X^2) - [E(X)]^2 = 6 - 2^2 = 6 - 4 = 2. \\\\ \\text{Let } Y = 3X + 1. \\\\ Var(Y) = Var(3X + 1) = 3^2 Var(X) = 9 \\times 2 = 18. \\\\ \\text{Standard Deviation } \\sigma_Y = \\sqrt{Var(Y)} = \\sqrt{18} \\approx 4.2426'
    }
  },
  {
    id: 'binomial',
    title: 'Binomial Distribution & Bernoulli Trials',
    priority: 'High',
    conceptExplanation: 'The Binomial Distribution models the number of successes in $n$ independent trials (known as Bernoulli trials), where each trial has exactly two mutually exclusive outcomes: Success (with constant probability $p$) and Failure (with probability $q = 1 - p$).\n\nPMF Formula:\n$$P(X = x) = \\binom{n}{x} p^x q^{n-x}, \\quad x = 0, 1, \\dots, n$$\nWhere $\\binom{n}{x} = \\frac{n!}{x!(n-x)!}$ is the binomial coefficient.\n\nKey Parameters and Derivations:\n- Mean ($E(X)$): $np$\n  * Derivation: $E(X) = \\sum_{x=0}^n x \\binom{n}{x} p^x q^{n-x} = \\sum_{x=1}^n x \\frac{n}{x} \\binom{n-1}{x-1} p \\cdot p^{x-1} q^{(n-1)-(x-1)} = np \\sum_{y=0}^{n-1} \\binom{n-1}{y} p^y q^{n-1-y} = np(p+q)^{n-1} = np$.\n- Variance ($Var(X)$): $npq$\n  * Derivation: By using $E(X^2) = E(X(X-1)) + E(X)$, we find $E(X(X-1)) = n(n-1)p^2$. Thus $Var(X) = n(n-1)p^2 + np - (np)^2 = n^2p^2 - np^2 + np - n^2p^2 = np(1-p) = npq$.\n- Moment Generating Function (MGF): $M_X(t) = (q + pe^t)^n$.\n\nProperties:\n- The distribution is symmetric if $p = 0.5$, right-skewed if $p < 0.5$, and left-skewed if $p > 0.5$.\n- Infinite sequence of Bernoulli trials forms a Bernoulli process.',
    whenToUse: 'Use when there are a fixed number of trials (n), each trial has only two outcomes, trials are independent, and the success probability (p) remains constant across all trials.',
    importantFormulas: [
      "P(X = x) = \\binom{n}{x} p^x q^{n-x}",
      "E(X) = np",
      "Var(X) = npq",
      "M_X(t) = (q + pe^t)^n"
    ],
    stepByStepMethod: [
      'Identify the total number of trials n and the success probability p.',
      'Calculate the failure probability q = 1 - p.',
      'Check the boundary parameters of the question (e.g. "exactly x", "at least x", or "at most x").',
      'Substitute the parameters into the PMF formula.',
      'For range probabilities, sum individual probabilities or use the complement rule: P(X >= 1) = 1 - P(X = 0).'
    ],
    solvedExamples: [
      {
        title: 'Range Probability under Binomial',
        problem: 'A machine has a 10% failure rate. If 5 machines are selected, what is the probability that at most 1 fails?',
        solution: '\\text{Here, success is defined as failure of a machine: } n = 5, \\quad p = 0.1, \\quad q = 0.9. \\\\ \\text{We need } P(X \\le 1) = P(X = 0) + P(X = 1). \\\\ P(X = 0) = \\binom{5}{0} (0.1)^0 (0.9)^5 = 1 \\times 1 \\times 0.59049 = 0.59049. \\\\ P(X = 1) = \\binom{5}{1} (0.1)^1 (0.9)^4 = 5 \\times 0.1 \\times 0.6561 = 0.32805. \\\\ P(X \\le 1) = 0.59049 + 0.32805 = 0.91854 \\quad (91.85\\%)'
      },
      {
        title: 'Parameter Evaluation from Mean and Variance',
        problem: 'For a binomial distribution, the mean is 6 and the variance is 2.4. Find the values of n and p.',
        solution: '\\text{We are given: } E(X) = np = 6, \\quad Var(X) = npq = 2.4. \\\\ \\text{Divide variance by mean: } \\frac{npq}{np} = \\frac{2.4}{6} \\Rightarrow q = 0.4. \\\\ \\text{Since } p = 1 - q: \\\\ p = 1 - 0.4 = 0.6. \\\\ \\text{Substitute p back to find n: } n(0.6) = 6 \\Rightarrow n = 10.'
      },
      {
        title: 'Complement Rule in Binomial Trials',
        problem: 'A fair coin is tossed 10 times. Find the probability of obtaining at least one head.',
        solution: '\\text{Here, } n = 10, \\quad p = 0.5, \\quad q = 0.5. \\\\ \\text{We want to find } P(X \\ge 1). \\\\ \\text{Using the complement rule: } P(X \\ge 1) = 1 - P(X = 0). \\\\ P(X = 0) = \\binom{10}{0} (0.5)^0 (0.5)^{10} = 1 \\times 1 \\times \\frac{1}{1024} = \\frac{1}{1024}. \\\\ P(X \\ge 1) = 1 - \\frac{1}{1024} = \\frac{1023}{1024} \\approx 0.9990.'
      }
    ],
    commonMistakes: [
      'Misinterpreting boundaries (e.g., "more than 3 successes" means x = 4, 5, ..., n, and does not include 3).',
      'Confusing the parameters (using success probability where failure belongs).',
      'Calculating binomial coefficients incorrectly (forgetting factorials).'
    ],
    practiceQuestion: {
      id: 'prac-bin-1',
      text: 'A coin is tossed 6 times. Find the probability of getting at least 4 heads.',
      solution: 'n = 6, \\quad p = 0.5, \\quad q = 0.5. \\\\ P(X \\ge 4) = P(X = 4) + P(X = 5) + P(X = 6). \\\\ P(X = 4) = \\binom{6}{4} (0.5)^6 = 15 \\times \\frac{1}{64} = \\frac{15}{64}. \\\\ P(X = 5) = \\binom{6}{5} (0.5)^6 = 6 \\times \\frac{1}{64} = \\frac{6}{64}. \\\\ P(X = 6) = \\binom{6}{6} (0.5)^6 = 1 \\times \\frac{1}{64} = \\frac{1}{64}. \\\\ P(X \\ge 4) = \\frac{15 + 6 + 1}{64} = \\frac{22}{64} = \\frac{11}{32} = 0.34375'
    }
  },
  {
    id: 'correlation',
    title: 'Correlation Coefficient',
    priority: 'Medium',
    conceptExplanation: 'Pearson\'s product-moment correlation coefficient ($r$) measures the strength and direction of the linear relationship between two continuous variables $X$ and $Y$.\n\nDefinition:\n$$r = \\frac{Cov(X, Y)}{\\sigma_X \\sigma_Y} = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sqrt{\\sum (X_i - \\bar{X})^2 \\sum (Y_i - \\bar{Y})^2}}$$\n\nProperties:\n- Bounds: $-1 \\le r \\le 1$.\n  * Proof Outline: Follows from the Cauchy-Schwarz Inequality: $[\\sum (x_i-\\bar{x})(y_i-\\bar{y})]^2 \\le [\\sum (x_i-\\bar{x})^2][\\sum (y_i-\\bar{y})^2]$, which guarantees $r^2 \\le 1$.\n- $r = 1$: Perfect positive linear correlation.\n- $r = -1$: Perfect negative linear correlation.\n- $r = 0$: No linear correlation (uncorrelated). Note: Uncorrelated does NOT imply independent. For example, if $Y = X^2$ and $X \\sim U[-1, 1]$, then $r = 0$ even though they have a deterministic non-linear relationship.\n- Change of Origin and Scale: The coefficient $r$ is independent of the change of origin and scale of measurement. If $U = \\frac{X-a}{h}$ and $V = \\frac{Y-b}{k}$, then $r_{XY} = r_{UV}$ (provided $h, k$ have the same sign).',
    whenToUse: 'Use to evaluate the strength and direction of the linear association between two paired continuous variables.',
    importantFormulas: [
      "r = \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}} \\quad \\text{where } x = X - \\bar{X}, \\, y = Y - \\bar{Y}",
      "r = \\frac{n\\sum XY - \\sum X\\sum Y}{\\sqrt{[n\\sum X^2 - (\\sum X)^2][n\\sum Y^2 - (\\sum Y)^2]}} \\quad \\text{(Product-moment formula)}"
    ],
    stepByStepMethod: [
      'Compute the means X̄ and Ȳ of variables X and Y.',
      'Create a deviation table containing x = X - X̄ and y = Y - Ȳ.',
      'Compute columns for x², y², and the product xy.',
      'Sum these columns to obtain Σx², Σy², and Σxy.',
      'Substitute these sums into the correlation formula: r = Σxy / sqrt(Σx² * Σy²).'
    ],
    solvedExamples: [
      {
        title: 'Manual Pearson Correlation',
        problem: 'Find the correlation coefficient between X and Y: X = [1, 2, 3], Y = [2, 4, 6].',
        solution: '\\bar{X} = \\frac{1+2+3}{3} = 2, \\quad \\bar{Y} = \\frac{2+4+6}{3} = 4. \\\\ \\text{Deviations: } \\\\ x = [1-2, 2-2, 3-2] = [-1, 0, 1] \\\\ y = [2-4, 4-4, 6-4] = [-2, 0, 2] \\\\ x^2 = [1, 0, 1] \\Rightarrow \\sum x^2 = 2 \\\\ y^2 = [4, 0, 4] \\Rightarrow \\sum y^2 = 8 \\\\ xy = [2, 0, 2] \\Rightarrow \\sum xy = 4. \\\\ r = \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}} = \\frac{4}{\\sqrt{2 \\times 8}} = \\frac{4}{\\sqrt{16}} = \\frac{4}{4} = 1.0 \\quad (\\text{Perfect positive})'
      },
      {
        title: 'Correlation from Covariance and Variances',
        problem: 'If Cov(X, Y) = 8, Var(X) = 16, and Var(Y) = 9, calculate the Pearson correlation coefficient.',
        solution: '\\sigma_X = \\sqrt{Var(X)} = \\sqrt{16} = 4. \\\\ \\sigma_Y = \\sqrt{Var(Y)} = \\sqrt{9} = 3. \\\\ r = \\frac{Cov(X, Y)}{\\sigma_X \\sigma_Y} = \\frac{8}{4 \\times 3} = \\frac{8}{12} = \\frac{2}{3} \\approx 0.6667'
      },
      {
        title: 'Demonstrating Uncorrelated but Dependent Variables',
        problem: 'Let $X$ take values $\\{-1, 0, 1\\}$ with equal probability $1/3$, and let $Y = X^2$. Find the correlation coefficient between $X$ and $Y$.',
        solution: '\\text{First find means: } \\\\ E(X) = \\frac{-1 + 0 + 1}{3} = 0. \\\\ Y \\text{ takes values } \\{1, 0, 1\\}. \\\\ E(Y) = \\frac{1 + 0 + 1}{3} = \\frac{2}{3}. \\\\ \\text{Now find Covariance: } Cov(X,Y) = E(XY) - E(X)E(Y). \\\\ XY = X \\cdot X^2 = X^3 \\text{ which takes values } \\{(-1)^3, 0^3, 1^3\\} = \\{-1, 0, 1\\}. \\\\ E(XY) = E(X^3) = \\frac{-1 + 0 + 1}{3} = 0. \\\\ Cov(X,Y) = 0 - 0 \\times \\frac{2}{3} = 0. \\\\ r = \\frac{Cov(X, Y)}{\\sigma_X \\sigma_Y} = 0. \\\\ \\text{Thus, } r = 0 \\text{ (uncorrelated), though } Y \\text{ is completely determined by } X \\text{ (dependent).}'
      }
    ],
    commonMistakes: [
      'Forgetting to take the square root of the variances in the denominator.',
      'Assuming that a correlation coefficient of 0 implies the variables are completely independent (it only rules out linear association).',
      'Confusing the correlation coefficient with the slope of the regression line.'
    ],
    practiceQuestion: {
      id: 'prac-corr-1',
      text: 'Given the sums Σx² = 25, Σy² = 36, and Σxy = -15 (where x and y are deviations from means). Calculate r.',
      solution: 'r = \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}} = \\frac{-15}{\\sqrt{25 \\times 36}} = \\frac{-15}{5 \\times 6} = \\frac{-15}{30} = -0.5'
    }
  },
  {
    id: 'regression',
    title: 'Regression Lines & Analysis',
    priority: 'High',
    conceptExplanation: 'Linear Regression models the linear relationship between a dependent variable and an independent variable by fitting a linear equation to observed data.\n\nEquations of Regression Lines:\n1. Line of Y on X (used to predict Y given X):\n   $$y - \\bar{y} = b_{yx} (x - \\bar{x})$$\n   Where $b_{yx} = r \\frac{\\sigma_Y}{\\sigma_X} = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sum (X_i - \\bar{X})^2}$ is the regression coefficient of Y on X.\n\n2. Line of X on Y (used to predict X given Y):\n   $$x - \\bar{x} = b_{xy} (y - \\bar{y})$$\n   Where $b_{xy} = r \\frac{\\sigma_X}{\\sigma_Y} = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sum (Y_i - \\bar{Y})^2}$ is the regression coefficient of X on Y.\n\nKey Properties of Regression Lines:\n- The intersection of the two regression lines is always at the mean point $(\\bar{x}, \\bar{y})$.\n- Geometric Mean: $r = \\pm \\sqrt{b_{yx} b_{xy}}$. The sign of $r$ must match the sign of both regression coefficients (they must have the same sign).\n- Angle between the regression lines ($\\theta$):\n  $$\\tan \\theta = \\left( \\frac{1 - r^2}{|r|} \\right) \\left( \\frac{\\sigma_X \\sigma_Y}{\\sigma_X^2 + \\sigma_Y^2} \\right)$$\n  * If $r = 0$: $\\tan \\theta \\to \\infty \\Rightarrow \\theta = 90^\\circ$ (lines are perpendicular).\n  * If $r = \\pm 1$: $\\tan \\theta = 0 \\Rightarrow \\theta = 0^circ$ or $180^\\circ$ (lines are coincident).',
    whenToUse: 'Use when you need to predict the value of one variable based on another, calculate regression coefficients, or find the angle of divergence between prediction models.',
    importantFormulas: [
      "y - \\bar{y} = b_{yx}(x - \\bar{x}), \\quad b_{yx} = \\frac{\\sum xy}{\\sum x^2}",
      "x - \\bar{x} = b_{xy}(y - \\bar{y}), \\quad b_{xy} = \\frac{\\sum xy}{\\sum y^2}",
      "r = \\pm \\sqrt{b_{yx} b_{xy}}",
      "\\tan \\theta = \\frac{1-r^2}{|r|} \\left( \\frac{\\sigma_x \\sigma_y}{\\sigma_x^2 + \\sigma_y^2} \\right)"
    ],
    stepByStepMethod: [
      'Compute the means X̄ and Ȳ from the data points.',
      'Formulate deviations x = X - X̄ and y = Y - Ȳ.',
      'Calculate Σxy, Σx², and Σy².',
      'Compute the regression coefficients: byx = Σxy / Σx² and bxy = Σxy / Σy².',
      'Substitute the means and coefficients into the line equations.'
    ],
    solvedExamples: [
      {
        title: 'Determining Line Equations',
        problem: 'Given the means X̄ = 6, Ȳ = 8, and regression coefficients byx = 0.5, bxy = 0.8. Find both regression lines.',
        solution: '\\text{Line of Y on X:} \\\\ y - 8 = 0.5(x - 6) \\Rightarrow y - 8 = 0.5x - 3 \\Rightarrow y = 0.5x + 5. \\\\ \\text{Line of X on Y:} \\\\ x - 6 = 0.8(y - 8) \\Rightarrow x - 6 = 0.8y - 6.4 \\Rightarrow x = 0.8y - 0.4.'
      },
      {
        title: 'Mean Analysis from Regression Lines',
        problem: 'Two regression lines are 2x + 3y = 8 and x + 2y = 5. Find the mean values of X and Y, and the correlation coefficient r.',
        solution: '\\text{Regression lines intersect at the means (}\\bar{x}, \\bar{y}\\text{).} \\\\ \\text{Solve as a system of equations:} \\\\ 2x + 3y = 8 \\quad \\text{--- (1)} \\\\ x + 2y = 5 \\Rightarrow x = 5 - 2y \\quad \\text{--- (2)} \\\\ \\text{Substitute (2) into (1):} \\\\ 2(5 - 2y) + 3y = 8 \\Rightarrow 10 - 4y + 3y = 8 \\Rightarrow y = 2. \\\\ \\text{Find x: } x = 5 - 2(2) = 1. \\\\ \\text{Means: } \\bar{x} = 1, \\quad \\bar{y} = 2. \\\\ \\\\ \\text{Now calculate r. Rearrange (1) to Y on X: } 3y = -2x + 8 \\Rightarrow y = -\\frac{2}{3}x + \\frac{8}{3} \\Rightarrow b_{yx} = -\\frac{2}{3}. \\\\ \\text{Rearrange (2) to X on Y: } x = -2y + 5 \\Rightarrow b_{xy} = -2. \\\\ r = -\\sqrt{b_{yx}b_{xy}} = -\\sqrt{\\left(-\\frac{2}{3}\\right)(-2)} = -\\sqrt{\\frac{4}{3}} \\approx -1.15. \\\\ \\text{Note: Since } |r| > 1 \\text{, the assignment of lines was incorrect.} \\\\ \\text{Let } x + 2y = 5 \\text{ be Y on X: } 2y = -x + 5 \\Rightarrow y = -0.5x + 2.5 \\Rightarrow b_{yx} = -0.5. \\\\ \\text{Let } 2x + 3y = 8 \\text{ be X on Y: } 2x = -3y + 8 \\Rightarrow x = -1.5y + 4 \\Rightarrow b_{xy} = -1.5. \\\\ r = -\\sqrt{(-0.5)(-1.5)} = -\\sqrt{0.75} \\approx -0.866. \\quad (\\text{Correct, as } |r| \\le 1)'
      },
      {
        title: 'Angle Between Regression Lines',
        problem: 'If the standard deviation of Y is double that of X, and the correlation coefficient is 0.5, find the angle between the two regression lines.',
        solution: '\\text{Given: } \\sigma_Y = 2\\sigma_X, \\quad r = 0.5. \\\\ \\text{We use the formula: } \\tan \\theta = \\frac{1-r^2}{r} \\left( \\frac{\\sigma_X \\sigma_Y}{\\sigma_X^2 + \\sigma_Y^2} \\right). \\\\ \\text{Substitute } \\sigma_Y = 2\\sigma_X: \\\\ \\tan \\theta = \\frac{1 - 0.25}{0.5} \\left( \\frac{\\sigma_X (2\\sigma_X)}{\\sigma_X^2 + 4\\sigma_X^2} \\right) = 1.5 \\left( \\frac{2\\sigma_X^2}{5\\sigma_X^2} \\right) = 1.5 \\times 0.4 = 0.6. \\\\ \\theta = \\tan^{-1}(0.6) \\approx 30.96^\\circ.'
      }
    ],
    commonMistakes: [
      'Using the wrong regression coefficient for the line equation (using byx for X on Y).',
      'Incorrectly assuming the geometric mean is always positive (r takes the same sign as the coefficients).',
      'Identifying the regression lines incorrectly, resulting in |r| > 1.'
    ],
    practiceQuestion: {
      id: 'prac-reg-1',
      text: 'If the regression lines are Y on X: y = -0.4x + 6, and X on Y: x = -0.9y + 8. Find the correlation coefficient r.',
      solution: '\\text{The regression coefficients are } b_{yx} = -0.4, \\, b_{xy} = -0.9. \\\\ \\text{Since both coefficients are negative, r must be negative.} \\\\ r = -\\sqrt{b_{yx} b_{xy}} = -\\sqrt{(-0.4) \\times (-0.9)} = -\\sqrt{0.36} = -0.6'
    }
  },
  {
    id: 'rank-correlation',
    title: 'Rank Correlation (Spearman\'s)',
    priority: 'Low',
    conceptExplanation: 'Spearman\'s Rank Correlation Coefficient ($\rho$) measures the strength and direction of the monotonic association between two ranked variables.\n\nFormula for Non-Tied Ranks:\n$$\\rho = 1 - \\frac{6 \\sum d_i^2}{n(n^2 - 1)}$$\nWhere:\n- $d_i$ is the difference between the ranks of the $i$-th pair of observations ($R_{Xi} - R_{Yi}$).\n- $n$ is the number of pairs.\n\nDerivation Summary:\nIt is mathematically equivalent to Pearson\'s $r$ calculated on the ranks. Since ranks are permutations of integers $1$ to $n$, we have $\\bar{R}_X = \\bar{R}_Y = \\frac{n+1}{2}$, and variance is $\\frac{n^2-1}{12}$. Substituting these into Pearson\'s formula yields the simplified Spearman formula.\n\nFormula for Tied Ranks:\nWhen two or more observations have the same value, they are assigned the average rank. A correction factor is added for each tie:\n$$\\rho = 1 - \\frac{6 \\left[\\sum d_i^2 + \\sum \\frac{m_j(m_j^2 - 1)}{12}\\right]}{n(n^2 - 1)}$$\nWhere $m_j$ is the number of observations tied at rank $j$.',
    whenToUse: 'Use when variables are qualitative (ordinal, like beauty or intelligence ranks) or when quantitative data does not follow a linear relationship but is monotonic.',
    importantFormulas: [
      "\\rho = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)} \\quad \\text{(no ties)}",
      "\\text{Correction Factor (CF)} = \\sum \\frac{m(m^2 - 1)}{12}"
    ],
    stepByStepMethod: [
      'Assign ranks to X and Y values from smallest to largest (or largest to smallest).',
      'For equal values (ties), assign the average of the ranks they would have occupied.',
      'Compute the difference d = Rx - Ry for each pair.',
      'Square the differences to get d² and sum them to obtain Σd².',
      'Apply the correction factor if there are ties, and substitute values into Spearman\'s formula.'
    ],
    solvedExamples: [
      {
        title: 'Spearman Rank Correlation Calculation',
        problem: 'Two judges ranked 6 contestants: Judge A = [1, 2, 3, 4, 5, 6], Judge B = [2, 1, 4, 3, 6, 5]. Find the rank correlation.',
        solution: '\\text{Ranks are already given. Calculate differences: } \\\\ d = [-1, 1, -1, 1, -1, 1] \\\\ d^2 = [1, 1, 1, 1, 1, 1] \\Rightarrow \\sum d^2 = 6. \\\\ n = 6. \\\\ \\rho = 1 - \\frac{6 \\sum d^2}{n(n^2 - 1)} = 1 - \\frac{6 \\times 6}{6(36 - 1)} = 1 - \\frac{36}{210} = 1 - 0.1714 = 0.8286.'
      },
      {
        title: 'Handling Tied Ranks',
        problem: 'Given data: X = [10, 15, 10], Y = [12, 18, 12]. Calculate the Spearman rank correlation.',
        solution: '\\text{Rank X: 10 is tied (positions 1 and 2) } \\Rightarrow \\text{Rank } 1.5, 1.5. \\text{ 15 is Rank 3.} \\\\ R_X = [1.5, 3, 1.5], \\quad m_1 = 2. \\\\ \\text{Rank Y: 12 is tied (positions 1 and 2) } \\Rightarrow \\text{Rank } 1.5, 1.5. \\text{ 18 is Rank 3.} \\\\ R_Y = [1.5, 3, 1.5], \\quad m_2 = 2. \\\\ d = R_X - R_Y = [0, 0, 0] \\Rightarrow \\sum d^2 = 0. \\\\ \\text{Correction terms: } \\frac{m(m^2-1)}{12} = \\frac{2(3)}{12} = 0.5. \\text{ We have two such terms: } 0.5 + 0.5 = 1.0. \\\\ \\rho = 1 - \\frac{6[\\sum d^2 + CF]}{n(n^2-1)} = 1 - \\frac{6[0 + 1.0]}{3(9-1)} = 1 - \\frac{6}{24} = 1 - 0.25 = 0.75.'
      },
      {
        title: 'Determining Rank Correlation from Raw Scores',
        problem: 'Given the marks of 5 students in Math (X) and Physics (Y): X = [40, 50, 60, 30, 20], Y = [30, 40, 50, 20, 10]. Calculate rank correlation.',
        solution: '\\text{Rank X (from lowest to highest): } R_X = [3, 4, 5, 2, 1] \\\\ \\text{Rank Y (from lowest to highest): } R_Y = [3, 4, 5, 2, 1] \\\\ \\text{Differences: } d = [0, 0, 0, 0, 0] \\Rightarrow \\sum d^2 = 0. \\\\ \\rho = 1 - \\frac{6(0)}{5(25-1)} = 1.0 \\quad (\\text{Perfect monotonic correlation})'
      }
    ],
    commonMistakes: [
      'Forgetting the "1 -" at the beginning of the Spearman formula.',
      'Assigning simple integers to equal values instead of using their average ranks.',
      'Using the number of ranks n incorrectly (e.g. counting individual variables instead of pairs).'
    ],
    practiceQuestion: {
      id: 'prac-rc-1',
      text: 'Find the rank correlation coefficient when n = 8 and the sum of squared differences is 21.',
      solution: '\\rho = 1 - \\frac{6 \\sum d^2}{n(n^2-1)} = 1 - \\frac{6(21)}{8(64-1)} = 1 - \\frac{126}{504} = 1 - 0.25 = 0.75'
    }
  },
  {
    id: 'chebyshev-inequality',
    title: 'Chebyshev\'s Inequality',
    priority: 'Medium',
    conceptExplanation: 'Chebyshev\'s Inequality bounds the probability that a random variable deviates from its mean by more than a certain threshold. Crucially, it applies to ANY probability distribution with a finite mean and variance, making it a powerful distribution-free tool.\n\nTheorem:\nLet $X$ be a random variable with finite mean $\\mu$ and variance $\\sigma^2$. For any real number $k > 0$:\n$$P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}$$\n\nEquivalently, the probability that the variable lies within $k$ standard deviations of the mean is:\n$$P(|X - \\mu| < k\\sigma) \\ge 1 - \\frac{1}{k^2}$$\n\nIf we express the threshold as an absolute deviation $\\epsilon > 0$ (where $\\epsilon = k\\sigma$):\n$$P(|X - \\mu| \\ge \\epsilon) \\le \\frac{\\sigma^2}{\\epsilon^2}$$\n\nProof Outline:\nFor a continuous random variable X:\n$$\\sigma^2 = \\int_{-\\infty}^{\\infty} (x-\\mu)^2 f(x) dx \\ge \\int_{|x-\\mu| \\ge \\epsilon} (x-\\mu)^2 f(x) dx \\ge \\epsilon^2 \\int_{|x-\\mu| \\ge \\epsilon} f(x) dx = \\epsilon^2 P(|X-\\mu| \\ge \\epsilon)$$\nDividing by $\\epsilon^2$ yields the inequality.',
    whenToUse: 'Use when the exact probability distribution of a variable is unknown, but you are given its mean and variance and need to establish worst-case bounds.',
    importantFormulas: [
      "P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}",
      "P(|X - \\mu| < k\\sigma) \\ge 1 - \\frac{1}{k^2}",
      "P(|X - \\mu| \\ge \\epsilon) \\le \\frac{\\sigma^2}{\\epsilon^2}"
    ],
    stepByStepMethod: [
      'Identify the mean (μ) and variance (σ²) or standard deviation (σ) from the problem.',
      'Translate the given range to an absolute deviation threshold: |X - μ| ≥ ε.',
      'If the range is given in terms of standard deviations, identify the multiplier k.',
      'Substitute k or ε into the appropriate Chebyshev inequality formula.'
    ],
    solvedExamples: [
      {
        title: 'Estimating Probability bounds',
        problem: 'A random variable X has mean 20 and standard deviation 2. Use Chebyshev\'s inequality to find the lower bound for the probability P(14 < X < 26).',
        solution: '\\text{Given: } \\mu = 20, \\quad \\sigma = 2. \\\\ \\text{We want a lower bound for } P(14 < X < 26). \\\\ \\text{Notice: } 14 < X < 26 \\Leftrightarrow 20 - 6 < X < 20 + 6 \\Leftrightarrow |X - 20| < 6. \\\\ \\text{Comparing to } |X - \\mu| < k\\sigma \\text{, we get } k\\sigma = 6 \\Rightarrow k(2) = 6 \\Rightarrow k = 3. \\\\ P(|X - 20| < 6) \\ge 1 - \\frac{1}{k^2} = 1 - \\frac{1}{3^2} = 1 - \\frac{1}{9} = \\frac{8}{9} \\approx 0.8889 \\quad (88.89\\%)'
      },
      {
        title: 'Bounding Deviation Probability',
        problem: 'A random variable X has variance 4. Find the upper bound for the probability that X deviates from its mean by 5 or more.',
        solution: '\\text{Given: } \\sigma^2 = 4, \\quad \\epsilon = 5. \\\\ \\text{We want the upper bound for } P(|X - \\mu| \\ge 5). \\\\ \\text{Using the formula: } P(|X - \\mu| \\ge \\epsilon) \\le \\frac{\\sigma^2}{\\epsilon^2} \\\\ P(|X - \\mu| \\ge 5) \\le \\frac{4}{5^2} = \\frac{4}{25} = 0.16.'
      },
      {
        title: 'Comparison with Exact Probability',
        problem: 'Let $X$ be uniformly distributed over $[0, 10]$. Compare the exact probability that $X$ deviates from its mean by at least $1.5$ standard deviations with Chebyshev\'s bound.',
        solution: '\\text{For a uniform distribution } U(a, b): \\mu = \\frac{a+b}{2} = 5. \\\\ \\sigma = \\frac{b-a}{\\sqrt{12}} = \\frac{10}{\\sqrt{12}} \\approx 2.887. \\\\ \\text{Here, we want } P(|X - \\mu| \\ge 1.5\\sigma). \\\\ \\text{By Chebyshev\'s Inequality: } P(|X - \\mu| \\ge 1.5\\sigma) \\le \\frac{1}{1.5^2} = \\frac{1}{2.25} = \\frac{4}{9} \\approx 0.444. \\\\ \\\\ \\text{Now calculate the exact probability: } \\\\ 1.5\\sigma = 1.5 \\times 2.887 = 4.33. \\\\ P(|X - 5| \\ge 4.33) = P(X \\le 0.67 \\text{ or } X \\ge 9.33) \\\\ = P(X \\le 0.67) + P(X \\ge 9.33) = \\frac{0.67}{10} + \\frac{10 - 9.33}{10} = 0.067 + 0.067 = 0.134. \\\\ \\text{The exact probability is } 0.134 \\text{, which is well below the Chebyshev upper bound of } 0.444.'
      }
    ],
    commonMistakes: [
      'Using the variance in place of standard deviation when determining k (k = ε / σ, not ε / σ²).',
      'Applying the outer region bound (1/k²) when the question asks for the inner region probability (which is 1 - 1/k²).',
      'Using Chebyshev\'s inequality to find an exact probability instead of a bound.'
    ],
    practiceQuestion: {
      id: 'prac-ci-1',
      text: 'The average number of customers per day at a store is 500 with variance 100. Find the upper bound for the probability that the number of customers deviates from the mean by 50 or more.',
      solution: '\\text{Given: } \\mu = 500, \\quad \\sigma^2 = 100. \\quad \\text{We want the upper bound for } P(|X - 500| \\ge 50). \\\\ \\text{Here, } \\epsilon = 50. \\\\ P(|X - 500| \\ge 50) \\le \\frac{\\sigma^2}{\\epsilon^2} = \\frac{100}{50^2} = \\frac{100}{2500} = 0.04'
    }
  },
  {
    id: 'poisson-normal',
    title: 'Poisson, Normal, Exponential, & Gamma Distributions',
    priority: 'High',
    conceptExplanation: 'This module covers key standard probability distributions used to model physical, biological, and engineering systems.\n\n1. Poisson Distribution (Discrete):\nModels the count of events in a fixed interval of time/space. Derived as the limit of the Binomial distribution when $n \\to \\infty$, $p \\to 0$, such that $np = \\lambda$ remains constant.\n$$P(X = x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}, \\quad x = 0, 1, 2, \\dots$$\nProperties: Mean = $\\lambda$, Variance = $\\lambda$. MGF: $M_X(t) = e^{\\lambda(e^t - 1)}$.\n\n2. Normal Distribution (Continuous):\nA symmetric, bell-shaped distribution defined by mean $\\mu$ and variance $\\sigma^2$.\n$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}$$\nProperties:\n- Symmetric about $x = \\mu$.\n- Mean = Median = Mode = $\\mu$.\n- Points of inflection occur at $x = \\mu \\pm \\sigma$.\n- Empirical Rule: 68.27% of data lies within $\\mu \\pm \\sigma$, 95.45% within $\\mu \\pm 2\\sigma$, and 99.73% within $\\mu \\pm 3\\sigma$.\n- Standardization: Convert $X \\sim N(\\mu, \\sigma^2)$ into standard normal $Z \\sim N(0, 1)$ using $z = \\frac{x - \\mu}{\\sigma}$. Area calculations are performed using Z-tables.\n\n3. Exponential Distribution (Continuous):\nModels the time between Poisson events.\n$$f(x) = \\lambda e^{-\\lambda x}, \\quad x \\ge 0$$\nProperties: Mean = $1/\\lambda$, Variance = $1/\\lambda^2$. CDF: $F(x) = 1 - e^{-\\lambda x}$.\n- Memoryless Property: $P(X > s + t | X > s) = P(X > t)$.\n\n4. Gamma Distribution (Continuous):\nGeneralization of the exponential distribution.\n$$f(x) = \\frac{\\lambda^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\lambda x}, \\quad x \\ge 0, \\quad \\alpha, \\lambda > 0$$\nWhere $\\Gamma(\\alpha) = \\int_0^\\infty t^{\\alpha-1} e^{-t} dt$ is the Gamma Function (satisfying $\\Gamma(\\alpha) = (\\alpha - 1)!$ for integers).',
    whenToUse: 'Use Poisson for event counts over a fixed rate. Use Normal for continuous physical metrics subject to multiple additive factors (CLT). Use Exponential for durations or lifespans exhibiting memorylessness. Use Gamma for waiting times of multiple Poisson events.',
    importantFormulas: [
      "P(X = x) = \\frac{e^{-\\lambda} \\lambda^x}{x!} \\quad \\text{(Poisson)}",
      "z = \\frac{x - \\mu}{\\sigma} \\quad \\text{(Z-Score Normalization)}",
      "f(x) = \\lambda e^{-\\lambda x} \\quad \\text{(Exponential PDF)}",
      "\\Gamma(n) = (n-1)! \\quad \\text{(for integers)}"
    ],
    stepByStepMethod: [
      'For Poisson: Identify the average occurrence rate λ. Calculate the probability of exactly x events.',
      'For Normal: Identify the mean μ and standard deviation σ. Transform x into Z-score: z = (x - μ) / σ. Read cumulative area from the standard normal Z-table.',
      'For Exponential: Find rate λ or mean 1/λ. Evaluate CDF F(x) = 1 - e^(-λx).',
      'For Gamma: Determine shape parameter α and scale λ.'
    ],
    solvedExamples: [
      {
        title: 'Poisson Approximation to Binomial',
        problem: 'If 3% of items produced by a machine are defective, find the probability that a sample of 100 items contains exactly 2 defective items using the Poisson approximation.',
        solution: '\\text{Here, } n = 100, \\quad p = 0.03. \\\\ \\text{Calculate } \\lambda = np = 100 \\times 0.03 = 3. \\\\ \\text{By Poisson distribution: } \\\\ P(X = 2) = \\frac{e^{-3} 3^2}{2!} = \\frac{e^{-3} \\times 9}{2} \\approx \\frac{0.0498 \\times 9}{2} \\approx 0.2240.'
      },
      {
        title: 'Normal Range Probability with Z-Score',
        problem: 'The weights of packages are normally distributed with mean 50 kg and standard deviation 5 kg. Find the probability that a package weighs between 45 kg and 55 kg.',
        solution: '\\mu = 50, \\quad \\sigma = 5. \\\\ \\text{Standardize } x_1 = 45 \\Rightarrow z_1 = \\frac{45 - 50}{5} = -1.0. \\\\ \\text{Standardize } x_2 = 55 \\Rightarrow z_2 = \\frac{55 - 50}{5} = 1.0. \\\\ P(45 < X < 55) = P(-1.0 < Z < 1.0) = P(Z < 1.0) - P(Z < -1.0). \\\\ \\text{Using the standard Z-table: } P(Z < 1.0) = 0.8413, \\quad P(Z < -1.0) = 0.1587. \\\\ P(45 < X < 55) = 0.8413 - 0.1587 = 0.6826 \\quad (68.26\\%).'
      },
      {
        title: 'Exponential Distribution Memoryless Proof',
        problem: 'Show mathematically that the exponential distribution PDF $f(x) = \\lambda e^{-\\lambda x}$ is memoryless.',
        solution: '\\text{We need to show } P(X > s + t | X > s) = P(X > t). \\\\ \\text{Note that } P(X > x) = 1 - F(x) = 1 - (1 - e^{-\\lambda x}) = e^{-\\lambda x}. \\\\ \\text{Using the definition of conditional probability: } \\\\ P(X > s + t | X > s) = \\frac{P(X > s + t \\cap X > s)}{P(X > s)} = \\frac{P(X > s + t)}{P(X > s)} \\\\ = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = \\frac{e^{-\\lambda s} e^{-\\lambda t}}{e^{-\\lambda s}} = e^{-\\lambda t} = P(X > t). \\quad \\text{Proof complete.}'
      }
    ],
    commonMistakes: [
      'Using the variance instead of standard deviation in the Z-score denominator.',
      'Forgetting that Z-tables display cumulative probability from the left, requiring subtraction when evaluating right-tailed or interval regions.',
      'Confusing the rate parameter λ of exponential distribution with the mean value (Mean = 1/λ).'
    ],
    practiceQuestion: {
      id: 'prac-pn-1',
      text: 'A telephone switchboard receives an average of 4 calls per minute. Find the probability of receiving at least 2 calls in a minute.',
      solution: '\\lambda = 4. \\quad \\text{We need } P(X \\ge 2) = 1 - P(X < 2) = 1 - [P(X = 0) + P(X = 1)]. \\\\ P(X = 0) = \\frac{e^{-4} 4^0}{0!} = e^{-4} \\approx 0.0183. \\\\ P(X = 1) = \\frac{e^{-4} 4^1}{1!} = 4e^{-4} \\approx 0.0733. \\\\ P(X \\ge 2) = 1 - [0.0183 + 0.0733] = 1 - 0.0916 = 0.9084'
    }
  },
  {
    id: 'bivariate-distributions',
    title: 'Bivariate Distributions',
    priority: 'High',
    conceptExplanation: 'Bivariate Distributions describe the simultaneous probability behavior of two random variables $X$ and $Y$ defined on the same sample space.\n\n1. Joint Probability Density:\n- Discrete Joint PMF: $p(x, y) = P(X = x, Y = y)$, with $\\sum_x \\sum_y p(x, y) = 1$.\n- Continuous Joint PDF: $f(x, y)$, satisfying $f(x, y) \\ge 0$ and $\\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} f(x, y) dx dy = 1$.\n\n2. Marginal Distributions:\nRepresent the individual probability distributions of X or Y, disregarding the other variable.\n- Marginal PDF of X: $f_X(x) = \\int_{-\\infty}^{\\infty} f(x, y) dy$.\n- Marginal PDF of Y: $f_Y(y) = \\int_{-\\infty}^{\\infty} f(x, y) dx$.\n\n3. Conditional Distributions:\nDescribe the distribution of one variable given the exact value of the other.\n- $f_{X|Y}(x|y) = \\frac{f(x, y)}{f_Y(y)}, \\quad f_{Y|X}(y|x) = \\frac{f(x, y)}{f_X(x)}$.\n\n4. Independence of Variables:\n$X$ and $Y$ are independent if and only if their joint distribution equals the product of their marginals:\n- $f(x, y) = f_X(x) f_Y(y)$ for all $(x, y)$.\n\n5. Distribution of Sums (Convolution):\nIf $X$ and $Y$ are independent, the PDF of their sum $Z = X + Y$ is found by convolving their individual PDFs:\n$$f_Z(z) = \\int_{-\\infty}^{\\infty} f_X(x) f_Y(z - x) dx$$',
    whenToUse: 'Use when modeling two variables simultaneously (e.g. height and weight of individuals, or inputs in bivariate systems) and analyzing their dependence, margins, or the distribution of their sums and quotients.',
    importantFormulas: [
      "f_X(x) = \\int_{-\\infty}^{\\infty} f(x, y) dy",
      "f_{X|Y}(x|y) = \\frac{f(x, y)}{f_Y(y)}",
      "f_Z(z) = \\int_{-\\infty}^{\\infty} f_X(x) f_Y(z - x) dx \\quad \\text{(Convolution)}"
    ],
    stepByStepMethod: [
      'Verify the normalization condition by evaluating the double integral over the entire defined region of the joint PDF.',
      'To find the marginal density of X, integrate the joint PDF over all valid ranges of Y.',
      'To compute the conditional density, divide the joint PDF by the corresponding marginal density.',
      'Verify independence by checking if the product of marginals equals the joint PDF across the entire domain.'
    ],
    solvedExamples: [
      {
        title: 'Evaluating Marginal and Conditional Densities',
        problem: 'Given the joint PDF f(x, y) = 2 for 0 < x < y < 1, and 0 otherwise. Find the marginal density of Y and the conditional density f_{X|Y}(x|y).',
        solution: '\\text{First find the marginal of Y. Since } 0 < x < y\\text{, the limits of integration for x are } 0 \\text{ to } y: \\\\ f_Y(y) = \\int_0^y 2 dx = \\left[ 2x \\right]_0^y = 2y \\quad (\\text{for } 0 < y < 1). \\\\ \\text{Conditional density } f_{X|Y}(x|y): \\\\ f_{X|Y}(x|y) = \\frac{f(x,y)}{f_Y(y)} = \\frac{2}{2y} = \\frac{1}{y} \\quad (\\text{for } 0 < x < y < 1).'
      },
      {
        title: 'Verifying Independence',
        problem: 'The joint PDF of X and Y is f(x, y) = e^(-x-y) for x > 0, y > 0. Determine if X and Y are independent.',
        solution: '\\text{Find marginal of X:} \\\\ f_X(x) = \\int_0^{\\infty} e^{-x} e^{-y} dy = e^{-x} \\left[ -e^{-y} \\right]_0^{\\infty} = e^{-x}(0 - (-1)) = e^{-x} \\quad (x > 0). \\\\ \\text{Similarly, the marginal of Y is: } f_Y(y) = e^{-y} \\quad (y > 0). \\\\ \\text{Check product: } f_X(x) \\times f_Y(y) = e^{-x} \\times e^{-y} = e^{-x-y} = f(x,y). \\\\ \\text{Since the product equals the joint PDF, X and Y are independent.}'
      },
      {
        title: 'Convolution of Uniform Variables',
        problem: 'Let $X$ and $Y$ be independent random variables, both uniformly distributed over $[0, 1]$. Find the PDF of $Z = X + Y$.',
        solution: '\\text{Here, } f_X(x) = 1 \\text{ for } 0 \\le x \\le 1, \\text{ and } f_Y(y) = 1 \\text{ for } 0 \\le y \\le 1. \\\\ \\text{Using convolution: } f_Z(z) = \\int_{-\\infty}^{\\infty} f_X(x)f_Y(z-x)dx. \\\\ \\text{Since } 0 \\le x \\le 1 \\text{ and } 0 \\le z-x \\le 1 \\Rightarrow z-1 \\le x \\le z. \\\\ \\text{We split this into two cases based on the value of } z \\in [0, 2]: \\\\ \\\\ \\text{Case 1: } 0 \\le z \\le 1. \\text{ The limits for x are } 0 \\text{ to } z. \\\\ f_Z(z) = \\int_0^z (1)(1) dx = z. \\\\ \\\\ \\text{Case 2: } 1 < z \\le 2. \\text{ The limits for x are } z-1 \\text{ to } 1. \\\\ f_Z(z) = \\int_{z-1}^1 (1)(1) dx = 1 - (z-1) = 2-z. \\\\ \\\\ \\text{Thus, the resulting PDF is triangular:} \\\\ f_Z(z) = \\begin{cases} z & 0 \\le z \\le 1 \\\\ 2-z & 1 < z \\le 2 \\\\ 0 & \\text{otherwise} \\end{cases}'
      }
    ],
    commonMistakes: [
      'Using incorrect boundaries of integration when variables are dependent (e.g. support region is a triangle: 0 < x < y < 1).',
      'Forgetting that marginal density values are zero outside their designated intervals.',
      'Treating dependent variables as independent when performing convolutions.'
    ],
    practiceQuestion: {
      id: 'prac-bd-1',
      text: 'If the joint PDF is f(x, y) = 8xy for 0 < y < x < 1, find the marginal density of X.',
      solution: '\\text{Since } 0 < y < x\\text{, the integration limits for y are } 0 \\text{ to } x. \\\\ f_X(x) = \\int_0^x 8xy dy = \\left[ 4xy^2 \\right]_0^x = 4x^3 \\quad (\\text{for } 0 < x < 1).'
    }
  },
  {
    id: 'central-tendency-moments',
    title: 'Central Tendency, Moments, Skewness, & Kurtosis',
    priority: 'Medium',
    conceptExplanation: 'This module covers calculations to summarize the shape, center, and spread of statistical distributions.\n\n1. Measures of Central Tendency:\n- Mean: Arithmetic average ($E(X)$).\n- Median: The middle score in a sorted distribution (50th percentile).\n- Mode: The most frequently occurring score in a distribution.\n\n2. Moments of a Distribution:\n- Raw Moment about the origin (r-th): $\\mu_r\' = E(X^r)$ (Note that $\\mu_1\'$ is the mean $\\mu$).\n- Central Moment (r-th): $\\mu_r = E[(X - \\mu)^r]$ (Note that $\\mu_2$ is the variance $\\sigma^2$).\nConversion Formulas between Raw and Central Moments:\n- $\\mu_2 = \\mu_2\' - (\\mu_1\')^2$\n- $\\mu_3 = \\mu_3\' - 3\\mu_2\'\\mu_1\' + 2(\\mu_1\')^3$\n- $\\mu_4 = \\mu_4\' - 4\\mu_3\'\\mu_1\' + 6\\mu_2\'(\\mu_1\')^2 - 3(\\mu_1\')^4$\n\n3. Skewness:\nMeasures the lack of symmetry in a distribution.\n- Pearson\'s Moment Coefficient of Skewness:\n  $$\\beta_1 = \\frac{\\mu_3^2}{\\mu_2^3}, \\quad \\gamma_1 = \\frac{\\mu_3}{\\sigma^3} = \\pm \\sqrt{\\beta_1}$$\n- Interpretation: $\\gamma_1 > 0$ (positively/right skewed), $\\gamma_1 < 0$ (negatively/left skewed), $\\gamma_1 = 0$ (symmetric).\n\n4. Kurtosis:\nMeasures the "tailedness" or peak intensity of the distribution.\n- Kurtosis Coefficients:\n  $$\\beta_2 = \\frac{\\mu_4}{\\mu_2^2}, \\quad \\gamma_2 = \\beta_2 - 3 \\quad (\\text{excess kurtosis})$$\n- Classification:\n  * $\\beta_2 = 3$ (\\gamma_2 = 0): Mesokurtic (Normal-like).\n  * $\\beta_2 > 3$ (\\gamma_2 > 0): Leptokurtic (highly peaked, heavy tails).\n  * $\\beta_2 < 3$ (\\gamma_2 < 0): Platykurtic (flat-topped, thin tails).',
    whenToUse: 'Use to summarize data distributions, convert raw moment data, and analyze skewness and kurtosis coefficients during statistical data preparation.',
    importantFormulas: [
      "\\mu_2 = \\mu_2' - (\\mu_1')^2",
      "\\beta_1 = \\frac{\\mu_3^2}{\\mu_2^3}, \\quad \\beta_2 = \\frac{\\mu_4}{\\mu_2^2}",
      "\\gamma_2 = \\beta_2 - 3"
    ],
    stepByStepMethod: [
      'Calculate the raw moments about the origin (μ1\', μ2\', μ3\', μ4\') using summation or integration.',
      'Compute the central moments using the conversion formulas.',
      'Substitute the central moments into the skewness (β1, γ1) and kurtosis (β2, γ2) formulas.',
      'Interpret the shape (skew and tailedness) of the distribution based on the computed coefficients.'
    ],
    solvedExamples: [
      {
        title: 'Raw to Central Moment Conversion',
        problem: 'The first three raw moments about the origin are μ1\' = 1, μ2\' = 4, and μ3\' = 10. Find the variance and the third central moment μ3.',
        solution: '\\text{Variance } \\mu_2 = \\mu_2\' - (\\mu_1\')^2 = 4 - (1)^2 = 3. \\\\ \\text{Third central moment } \\mu_3: \\\\ \\mu_3 = \\mu_3\' - 3\\mu_2\'\\mu_1\' + 2(\\mu_1\')^3 = 10 - 3(4)(1) + 2(1)^3 = 10 - 12 + 2 = 0. \\\\ \\text{Since } \\mu_3 = 0 \\text{, the distribution is perfectly symmetric.}'
      },
      {
        title: 'Evaluating Kurtosis',
        problem: 'Given the central moments μ2 = 2 and μ4 = 16. Calculate the kurtosis coefficient β2 and classify the distribution.',
        solution: '\\beta_2 = \\frac{\\mu_4}{\\mu_2^2} = \\frac{16}{(2)^2} = \\frac{16}{4} = 4.0. \\\\ \\text{Since } \\beta_2 = 4.0 > 3 \\text{, the distribution is leptokurtic (peaked tail, heavy tails).}'
      },
      {
        title: 'Determining Shape Parameters from PDF',
        problem: 'A distribution has PDF $f(x) = e^{-x}$ for $x \\ge 0$. Find the mean, variance, and skewness of the distribution.',
        solution: '\\text{Calculate raw moments: } \\mu_r\' = \\int_0^\\infty x^r e^{-x} dx = \\Gamma(r+1) = r!. \\\\ \\text{Mean: } \\mu_1\' = 1! = 1. \\\\ \\mu_2\' = 2! = 2 \\Rightarrow \\mu_2 = \\mu_2\' - (\\mu_1\')^2 = 2 - 1 = 1. \\quad (\\text{Variance} = 1) \\\\ \\mu_3\' = 3! = 6 \\Rightarrow \\mu_3 = \\mu_3\' - 3\\mu_2\'\\mu_1\' + 2(\\mu_1\')^3 = 6 - 3(2)(1) + 2(1)^3 = 6 - 6 + 2 = 2. \\\\ \\text{Skewness coefficient } \\gamma_1 = \\frac{\\mu_3}{\\mu_2^{3/2}} = \\frac{2}{1^{1.5}} = 2.0. \\\\ \\text{Since } \\gamma_1 = 2 > 0\\text{, the distribution is highly positively skewed.}'
      }
    ],
    commonMistakes: [
      'Confusing raw moments (about origin) with central moments (about mean) in skewness and kurtosis formulas.',
      'Forgetting to raise the mean to appropriate powers in conversion formulas.',
      'Assuming that a distribution is symmetric without calculating μ3 (some distributions with skewed shapes may have accidental zero coefficients, though rare).'
    ],
    practiceQuestion: {
      id: 'prac-ctm-1',
      text: 'Find the skewness coefficient β1 of a distribution that has central moments μ2 = 9 and μ3 = 27.',
      solution: '\\beta_1 = \\frac{\\mu_3^2}{\\mu_2^3} = \\frac{(27)^2}{(9)^3} = \\frac{729}{729} = 1.0'
    }
  },
  {
    id: 'curve-fitting',
    title: 'Curve Fitting (Method of Least Squares)',
    priority: 'Medium',
    conceptExplanation: 'Curve Fitting determines the mathematical equation of best fit (minimizing the sum of squared residuals/errors) for a set of bivariate data points.\n\n1. Fitting a Straight Line ($y = ax + b$):\nMinimize the sum of squared errors $S = \\sum (y_i - (ax_i + b))^2$. Setting partial derivatives with respect to $a$ and $b$ to zero yields the Normal Equations:\n$$\\begin{cases} a \\sum x_i + nb = \\sum y_i \\\\ a \\sum x_i^2 + b \\sum x_i = \\sum x_i y_i \\end{cases}$$\n\n2. Fitting a Second-Degree Parabola ($y = ax^2 + bx + c$):\nThe Normal Equations are:\n$$\\begin{cases} a \\sum x_i^2 + b \\sum x_i + nc = \\sum y_i \\\\ a \\sum x_i^3 + b \\sum x_i^2 + c \\sum x_i = \\sum x_i y_i \\\\ a \\sum x_i^4 + b \\sum x_i^3 + c \\sum x_i^2 = \\sum x_i^2 y_i \\end{cases}$$\n\n3. Fitting Exponential and Power Curves (Linearization by Logarithms):\n- For $y = ae^{bx}$, take natural logarithms: $\\ln y = \\ln a + bx$. Let $Y = \\ln y, A = \\ln a, B = b \\Rightarrow Y = A + Bx$. Fit as a straight line, then retrieve $a = e^A, b = B$.\n- For $y = ax^b$, take logarithms: $\\log y = \\log a + b \\log x$. Let $Y = \\log y, X = \\log x, A = \\log a \\Rightarrow Y = A + bX$. Fit as a straight line.',
    whenToUse: 'Use to establish predictive relationships for scatter plots of bivariate data, fitting linear, parabolic, power, or exponential trends.',
    importantFormulas: [
      "a \\sum x + nb = \\sum y \\quad \\text{and} \\quad a \\sum x^2 + b \\sum x = \\sum xy \\quad \\text{(Line equations)}",
      "Y = \\ln y, \\, A = \\ln a, \\, B = b \\Rightarrow Y = A + Bx \\quad \\text{(Exponential linearization)}"
    ],
    stepByStepMethod: [
      'Create a summation table with columns for x, y, x², x³, x⁴, xy, and x²y as needed.',
      'Sum all values in the columns.',
      'Set up the normal equations using these calculated sums and n.',
      'Solve the system of linear equations for coefficients a, b, and c.',
      'If fitting a non-linear curve, linearize the data using logarithms before computing sums.'
    ],
    solvedExamples: [
      {
        title: 'Fitting a Straight Line',
        problem: 'Fit a straight line y = ax + b to the points (0, 1), (1, 3), (2, 5).',
        solution: '\\text{Data: } \\\\ x = [0, 1, 2] \\Rightarrow \\sum x = 3. \\\\ y = [1, 3, 5] \\Rightarrow \\sum y = 9. \\\\ x^2 = [0, 1, 4] \\Rightarrow \\sum x^2 = 5. \\\\ xy = [0, 3, 10] \\Rightarrow \\sum xy = 13. \\quad n = 3. \\\\ \\text{Normal Equations:} \\\\ a \\sum x + nb = \\sum y \\Rightarrow 3a + 3b = 9 \\Rightarrow a + b = 3 \\quad \\text{--- (1)} \\\\ a \\sum x^2 + b \\sum x = \\sum xy \\Rightarrow 5a + 3b = 13 \\quad \\text{--- (2)} \\\\ \\text{Substitute (1) into (2):} \\\\ 5a + 3(3 - a) = 13 \\Rightarrow 5a + 9 - 3a = 13 \\Rightarrow 2a = 4 \\Rightarrow a = 2. \\\\ \\text{Then } b = 3 - 2 = 1. \\\\ \\text{Equation: } y = 2x + 1'
      },
      {
        title: 'Parabolic Curve Fitting',
        problem: 'Write down and solve the normal equations to fit a parabola y = ax^2 + bx + c for n = 5, Σx = 0, Σx^2 = 10, Σx^3 = 0, Σx^4 = 34, Σy = 20, Σxy = 10, and Σx^2y = 44.',
        solution: '\\text{Normal equations: } \\\\ a \\sum x^2 + b \\sum x + nc = \\sum y \\Rightarrow 10a + 0 + 5c = 20 \\Rightarrow 2a + c = 4 \\quad \\text{--- (1)} \\\\ a \\sum x^3 + b \\sum x^2 + c \\sum x = \\sum xy \\Rightarrow 0 + 10b + 0 = 10 \\Rightarrow b = 1. \\quad \\text{--- (2)} \\\\ a \\sum x^4 + b \\sum x^3 + c \\sum x^2 = \\sum x^2y \\Rightarrow 34a + 0 + 10c = 44 \\Rightarrow 17a + 5c = 22. \\quad \\text{--- (3)} \\\\ \\text{Solve (1) and (3) simultaneously:} \\\\ c = 4 - 2a \\Rightarrow 17a + 5(4 - 2a) = 22 \\Rightarrow 7a + 20 = 22 \\Rightarrow 7a = 2 \\Rightarrow a = 2/7. \\\\ c = 4 - 2(2/7) = 24/7. \\\\ \\text{Fitted equation: } y = \\frac{2}{7}x^2 + x + \\frac{24}{7}.'
      },
      {
        title: 'Fitting an Exponential Curve',
        problem: 'Fit the curve $y = ae^{bx}$ to the following data points: (1, 2.72), (2, 7.39).',
        solution: '\\text{Linearize: } \\ln y = \\ln a + bx \\Rightarrow Y = A + Bx. \\\\ (x_1, y_1) = (1, 2.72) \\Rightarrow Y_1 = \\ln(2.72) \\approx 1.0. \\\\ (x_2, y_2) = (2, 7.39) \\Rightarrow Y_2 = \\ln(7.39) \\approx 2.0. \\\\ \\text{Using the points (1,1) and (2,2) for the line } Y = A + Bx: \\\\ B = \\frac{2 - 1}{2 - 1} = 1.0 \\Rightarrow B = b = 1.0. \\\\ A = Y_1 - B x_1 = 1 - (1)(1) = 0 \\Rightarrow A = \\ln a = 0 \\Rightarrow a = e^0 = 1.0. \\\\ \\text{The fitted curve is: } y = 1.0 \\cdot e^{1.0 x} = e^x.'
      }
    ],
    commonMistakes: [
      'Swapping the independent and dependent variables in the summation calculations (fitting x on y instead of y on x).',
      'Failing to convert exponential variables using logarithms before fitting.',
      'Forgetting to take the exponential of the intercept (a = e^A) when recovering the parameters of $y = ae^{bx}$.'
    ],
    practiceQuestion: {
      id: 'prac-cf-1',
      text: 'Given n = 4, Σx = 6, Σy = 12, Σx² = 14, and Σxy = 22. Find intercept "b" for the fitted line y = ax + b.',
      solution: '\\text{Normal equations:} \\\\ 6a + 4b = 12 \\Rightarrow 3a + 2b = 6 \\Rightarrow 3a = 6 - 2b \\\\ 14a + 6b = 22. \\\\ \\text{Multiply second by 3: } 42a + 18b = 66. \\\\ \\text{Substitute 3a: } 14(6 - 2b) + 18b = 66 \\Rightarrow 84 - 28b + 18b = 66 \\Rightarrow 10b = 18 \\Rightarrow b = 1.8'
    }
  },
  {
    id: 'large-samples',
    title: 'Large Sample Tests (Z-Tests)',
    priority: 'High',
    conceptExplanation: 'Large Sample Tests (Z-Tests) are parametric tests utilized when sample size is large ($n \\ge 30$). They rely on the Central Limit Theorem to assume normal distribution behavior of the test statistics.\n\nHypothesis Testing Framework:\n1. Formulate Null Hypothesis $H_0$ (statement of no difference) and Alternative Hypothesis $H_1$.\n2. Determine Level of Significance $\\alpha$ (typically 5% or 1%). This is the probability of committing a Type I Error (rejecting $H_0$ when it is true).\n3. Calculate the test statistic:\n   $$Z = \\frac{\\text{Sample Statistic} - E(\\text{Statistic})}{\\text{Standard Error (SE)}}$$\n4. Decision Rule: Compare $|Z|$ with critical value $Z_{\\alpha}$ from the Z-table:\n   - 5% level (two-tailed): $Z_{0.05} = 1.96$.\n   - 1% level (two-tailed): $Z_{0.01} = 2.58$.\n   - Reject $H_0$ if $|Z| > Z_{\\alpha}$.\n\nCore Z-Test Statistics:\n- Single Mean: $Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$. (If population standard deviation $\\sigma$ is unknown, use sample standard deviation $s$).\n- Difference of Means: $Z = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}}$.\n- Single Proportion: $Z = \\frac{p - P_0}{\\sqrt{P_0 Q_0 / n}}$ (where $p = x/n$ is sample proportion, and $Q_0 = 1-P_0$).\n- Difference of Proportions: $Z = \\frac{p_1 - p_2}{\\sqrt{\\hat{P}\\hat{Q}(1/n_1 + 1/n_2)}}$ where $\\hat{P} = \\frac{n_1 p_1 + n_2 p_2}{n_1 + n_2}$ is the pooled proportion, and $\\hat{Q} = 1 - \\hat{P}$.\n- Difference of Standard Deviations: $Z = \\frac{s_1 - s_2}{\\sqrt{\\sigma_1^2 / (2n_1) + \\sigma_2^2 / (2n_2)}}$.',
    whenToUse: 'Use when the sample size is 30 or more (n >= 30), and you need to perform hypothesis tests on means, proportions, or standard deviations from one or two populations.',
    importantFormulas: [
      "Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}} \\quad \\text{(Single Mean)}",
      "Z = \\frac{p - P_0}{\\sqrt{P_0 Q_0 / n}} \\quad \\text{(Single Proportion)}",
      "Z = \\frac{p_1 - p_2}{\\sqrt{\\hat{P}\\hat{Q}(\\frac{1}{n_1} + \\frac{1}{n_2})}} \\quad \\text{(Diff of Proportions)}"
    ],
    stepByStepMethod: [
      'State the null (H0) and alternative (H1) hypotheses clearly.',
      'Check if the sample size is large enough (n >= 30) to justify a Z-test.',
      'Identify the appropriate standard error (SE) formula for the test.',
      'Compute the Z-statistic using the sample measurements.',
      'Compare |Z| with the critical value at the chosen level of significance and draw the final conclusion.'
    ],
    solvedExamples: [
      {
        title: 'Testing Single Mean Significance',
        problem: 'A sample of 400 items has a mean weight of 82g. Can it be reasonably regarded as a sample from a large population with mean 80g and standard deviation 10g at the 5% level of significance?',
        solution: 'H_0: \\mu = 80, \\quad H_1: \\mu \\neq 80 \\quad (\\text{Two-tailed test}). \\\\ \\text{Given: } n = 400, \\quad \\bar{x} = 82, \\quad \\sigma = 10. \\\\ \\text{Standard Error (SE) } = \\frac{\\sigma}{\\sqrt{n}} = \\frac{10}{\\sqrt{400}} = \\frac{10}{20} = 0.5. \\\\ Z = \\frac{\\bar{x} - \\mu}{\\text{SE}} = \\frac{82 - 80}{0.5} = \\frac{2}{0.5} = 4.0. \\\\ \\text{Since } |Z| = 4.0 > 1.96 \\text{ (critical value at 5\\% level), we reject } H_0. \\\\ \\text{Conclusion: The sample mean differs significantly from the population mean.}'
      },
      {
        title: 'Testing Difference of Proportions',
        problem: 'In a survey of 500 voters from town A, 300 support a candidate. In town B, 200 out of 400 support the same candidate. Test if there is a significant difference in support levels at the 5% level.',
        solution: 'H_0: P_1 = P_2, \\quad H_1: P_1 \\neq P_2. \\\\ n_1 = 500, \\quad x_1 = 300 \\Rightarrow p_1 = 0.60. \\\\ n_2 = 400, \\quad x_2 = 200 \\Rightarrow p_2 = 0.50. \\\\ \\text{Pooled proportion } \\hat{P} = \\frac{x_1 + x_2}{n_1 + n_2} = \\frac{300 + 200}{500 + 400} = \\frac{500}{900} = 0.556. \\\\ \\hat{Q} = 1 - \\hat{P} = 0.444. \\\\ \\text{Standard Error } = \\sqrt{\\hat{P}\\hat{Q}\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)} = \\sqrt{(0.556)(0.444)\\left(\\frac{1}{500} + \\frac{1}{400}\\right)} \\approx 0.0333. \\\\ Z = \\frac{p_1 - p_2}{\\text{SE}} = \\frac{0.60 - 0.50}{0.0333} = 3.0. \\\\ \\text{Since } |Z| = 3.0 > 1.96\\text{, we reject } H_0. \\text{ Difference is significant.}'
      },
      {
        title: 'Testing Difference of Standard Deviations',
        problem: 'Two random samples of sizes 100 and 150 have standard deviations of 12 and 15 respectively. Test if the standard deviations of the populations differ significantly at the 1% significance level.',
        solution: 'H_0: \\sigma_1 = \\sigma_2, \\quad H_1: \\sigma_1 \\neq \\sigma_2. \\\\ n_1 = 100, \\quad s_1 = 12. \\\\ n_2 = 150, \\quad s_2 = 15. \\\\ \\text{Standard Error (SE) for diff of SDs} = \\sqrt{\\frac{s_1^2}{2n_1} + \\frac{s_2^2}{2n_2}} = \\sqrt{\\frac{144}{200} + \\frac{225}{300}} = \\sqrt{0.72 + 0.75} = \\sqrt{1.47} \\approx 1.212. \\\\ Z = \\frac{s_1 - s_2}{\\text{SE}} = \\frac{12 - 15}{1.212} = \\frac{-3}{1.212} \\approx -2.475. \\\\ \\text{Since } |Z| = 2.475 < 2.58 \\text{ (critical Z at 1\\% level), we fail to reject } H_0. \\\\ \\text{Conclusion: The difference in standard deviations is not significant at the 1\\% level.}'
      }
    ],
    commonMistakes: [
      'Using sample size standard deviation s directly without dividing by sqrt(n) for the Standard Error.',
      'Misidentifying tail characteristics (e.g. using 1.96 for a one-tailed test instead of 1.645).',
      'Confusing the standard error of a proportion with the standard error of a mean.'
    ],
    practiceQuestion: {
      id: 'prac-ls-1',
      text: 'A coin is tossed 900 times and heads appear 490 times. Test if the coin is unbiased at 5% significance.',
      solution: 'H_0: P = 0.5, \\quad H_1: P \\neq 0.5. \\\\ n = 900. \\quad p = 490/900 = 0.544. \\\\ \\text{SE} = \\sqrt{P_0 Q_0 / n} = \\sqrt{0.5 \\times 0.5 / 900} = \\frac{0.5}{30} = 0.0167. \\\\ Z = \\frac{0.544 - 0.5}{0.0167} = \\frac{0.044}{0.0167} \\approx 2.63. \\\\ \\text{Since } |Z| = 2.63 > 1.96\\text{, we reject } H_0. \\text{ The coin is biased.}'
    }
  },
  {
    id: 'small-samples',
    title: 'Small Sample Tests (t-Tests & F-Tests)',
    priority: 'High',
    conceptExplanation: 'Small Sample Tests are utilized when the sample size is small ($n < 30$), and population variances are unknown. These rely on Student\'s t-distribution and the F-distribution.\n\n1. Student\'s t-Test for Single Mean:\nTests if a sample mean differs from a hypothesized population mean.\n$$t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}, \\quad s = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n - 1}} \\quad \\text{with } df = n - 1$$\n\n2. Student\'s t-Test for Difference of Means (Independent Samples):\nUsed to compare the means of two independent groups.\n$$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{1/n_1 + 1/n_2}} \\quad \\text{with } df = n_1 + n_2 - 2$$\nWhere $s_p^2$ is the pooled sample variance:\n$$s_p^2 = \\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}$$\n\n3. Paired t-Test (Dependent Samples):\nUsed when the same subjects are measured twice (e.g., before and after a treatment).\n$$t = \\frac{\\bar{d}}{s_d / \\sqrt{n}} \\quad \\text{with } df = n - 1$$\nWhere $d_i = x_i - y_i$ is the difference for each pair, and $s_d$ is the standard deviation of these differences.\n\n4. F-Test for Equality of Variances:\nTests if two populations have equal variances. The test statistic is the ratio of sample variances:\n$$F = \\frac{S_1^2}{S_2^2} \\quad \\text{where } S_1^2 > S_2^2 \\text{ (larger variance on top)}$$\nDegrees of freedom: $df_1 = n_1 - 1, \\, df_2 = n_2 - 1$.',
    whenToUse: 'Use when sample size is less than 30 (n < 30), variables are normally distributed, and the population standard deviation is unknown.',
    importantFormulas: [
      "t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}} \\quad \\text{(Single Mean)}",
      "s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2} \\quad \\text{(Pooled Variance)}",
      "F = \\frac{S_1^2}{S_2^2} \\quad \\text{(Equality of Variances)}"
    ],
    stepByStepMethod: [
      'Define Null (H0) and Alternative (H1) hypotheses.',
      'Check if the sample size is small (n < 30) and population variance is unknown.',
      'Compute the sample variance with n-1 denominator to ensure an unbiased estimator.',
      'Determine the degrees of freedom (df).',
      'Compute the t or F statistic and compare it against the critical values from the respective tables.'
    ],
    solvedExamples: [
      {
        title: 'Single Mean t-Test',
        problem: 'A sample of 9 observations has mean 48 and standard deviation 3. Test if the population mean is 50 at the 5% significance level.',
        solution: 'H_0: \\mu = 50, \\quad H_1: \\mu \\neq 50. \\\\ n = 9, \\quad \\bar{x} = 48, \\quad s = 3. \\\\ \\text{Degrees of Freedom } df = n - 1 = 8. \\\\ t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}} = \\frac{48 - 50}{3/\\sqrt{9}} = \\frac{-2}{1} = -2.0. \\\\ \\text{Tabular value } t_{0.05, 8} = 2.306. \\\\ \\text{Since } |t| = 2.0 < 2.306\\text{, we fail to reject } H_0. \\text{ The mean is not significantly different.}'
      },
      {
        title: 'F-Test for Equality of Variances',
        problem: 'Two samples of size 8 and 10 have variances 16 and 9. Test if population variances are equal at the 5% level.',
        solution: 'H_0: \\sigma_1^2 = \\sigma_2^2, \\quad H_1: \\sigma_1^2 \\neq \\sigma_2^2. \\\\ S_1^2 = 16, \\quad df_1 = 8 - 1 = 7. \\\\ S_2^2 = 9, \\quad df_2 = 10 - 1 = 9. \\\\ F = \\frac{S_1^2}{S_2^2} = \\frac{16}{9} = 1.778. \\\\ \\text{Critical value } F_{0.05} (7, 9) = 3.29. \\\\ \\text{Since } F = 1.778 < 3.29\\text{, we fail to reject } H_0. \\text{ The variances are equal.}'
      },
      {
        title: 'Paired t-Test for Before/After Effect',
        problem: 'A group of 5 students score [10, 12, 15, 14, 11] before training and [12, 14, 15, 16, 12] after. Test if the training significantly increased scores.',
        solution: 'H_0: \\mu_d = 0 \\quad (\\text{no increase}), \\quad H_1: \\mu_d > 0 \\quad (\\text{one-tailed test}). \\\\ \\text{Compute differences } d_i = \\text{After} - \\text{Before}: \\\\ d = [2, 2, 0, 2, 1]. \\\\ \\bar{d} = \\frac{2+2+0+2+1}{5} = 1.4. \\\\ \\text{Compute deviations from } \\bar{d}: d - \\bar{d} = [0.6, 0.6, -1.4, 0.6, -0.4]. \\\\ (d - \\bar{d})^2 = [0.36, 0.36, 1.96, 0.36, 0.16] \\Rightarrow \\sum(d - \\bar{d})^2 = 3.20. \\\\ s_d^2 = \\frac{\\sum(d - \\bar{d})^2}{n-1} = \\frac{3.20}{4} = 0.80 \\Rightarrow s_d = \\sqrt{0.80} \\approx 0.894. \\\\ t = \\frac{\\bar{d}}{s_d / \\sqrt{n}} = \\frac{1.4}{0.894 / \\sqrt{5}} = \\frac{1.4}{0.40} = 3.5. \\\\ df = 4. \\text{ Tabular } t_{0.05, 4} \\text{ (one-tailed) } = 2.132. \\\\ \\text{Since } t = 3.5 > 2.132\\text{, we reject } H_0. \\text{ The training significantly increased scores.}'
      }
    ],
    commonMistakes: [
      'Using n in the denominator instead of n-1 when calculating sample standard deviation s.',
      'Putting the smaller variance in the numerator of the F-test (F-statistic must always be >= 1).',
      'Confusing independent t-tests with paired t-tests.'
    ],
    practiceQuestion: {
      id: 'prac-ss-1',
      text: 'Find the degrees of freedom for a difference of means t-test with sample sizes n1 = 12 and n2 = 15.',
      solution: 'df = n_1 + n_2 - 2 = 12 + 15 - 2 = 25'
    }
  },
  {
    id: 'chi-square-tests',
    title: 'Chi-Square Tests (Goodness of Fit & Independence)',
    priority: 'High',
    conceptExplanation: 'Chi-Square ($\\chi^2$) tests are non-parametric tests utilized for categorical frequency data analysis.\n\n1. Goodness-of-Fit Test:\nTests if observed frequency counts match expected counts from a theoretical distribution.\n$$\\chi^2 = \\sum_{i=1}^{k} \\frac{(O_i - E_i)^2}{E_i}$$\nDegrees of freedom $df = k - 1 - p$, where $k$ is the number of categories and $p$ is the number of parameters estimated from the sample data to compute expected frequencies.\n\n2. Test of Independence of Attributes:\nTests if two classification criteria in a contingency table are independent.\n$$\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i} \\quad \\text{with } df = (r-1)(c-1)$$\nWhere expected frequency for each cell is:\n$$E = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Grand Total}}$$\n\n3. Yates\' Correction for Continuity:\nFor a $2 \\times 2$ table with small frequencies (expected values < 5), Yates\' correction is applied:\n$$\\chi^2 = \\sum \\frac{(|O_i - E_i| - 0.5)^2}{E_i} = \\frac{N(|ad - bc| - N/2)^2}{(a+b)(c+d)(a+c)(b+d)}$$\n\nKey Rule:\n- Every expected cell frequency $E_i$ should be at least 5. If it is smaller, pool adjacent cells to satisfy this condition.',
    whenToUse: 'Use when analyzing counts or frequencies in category cells rather than continuous measurements, and performing tests of goodness of fit or attribute independence.',
    importantFormulas: [
      "\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}",
      "E = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Grand Total}}",
      "df = (r - 1)(c - 1) \\quad \\text{(Contingency Table df)}"
    ],
    stepByStepMethod: [
      'Define the Null Hypothesis H0 (e.g., the observed distribution matches the theoretical distribution, or attributes are independent).',
      'Compute expected frequencies Ei for all cells.',
      'Check if any expected frequency is less than 5. If so, pool adjacent categories.',
      'Evaluate (Oi - Ei)² / Ei terms and sum them to obtain the χ² statistic.',
      'Compare χ² with the critical value from the Chi-Square table at df degrees of freedom.'
    ],
    solvedExamples: [
      {
        title: 'Chi-Square Independence Test',
        problem: 'Test if vaccine efficacy is independent of sickness outcomes based on this table: SICK [Vaccinated = 20, Unvaccinated = 80], HEALTHY [Vaccinated = 180, Unvaccinated = 120]. Use 5% significance.',
        solution: '\\text{Table representation: } \\\\ \\begin{array}{|c|c|c|c|} \\hline & \\text{Sick} & \\text{Healthy} & \\text{Total} \\\\ \\hline \\text{Vaccinated} & 20 & 180 & 200 \\\\ \\hline \\text{Unvaccinated} & 80 & 120 & 200 \\\\ \\hline \\text{Total} & 100 & 300 & 400 \\\\ \\hline \\end{array} \\\\ \\text{Calculate Expected Frequencies } E = \\frac{\\text{Row Total} \\times \\text{Col Total}}{\\text{Grand Total}}: \\\\ E_{11} = \\frac{200 \\times 100}{400} = 50, \\quad E_{12} = \\frac{200 \\times 300}{400} = 150 \\\\ E_{21} = \\frac{200 \\times 100}{400} = 50, \\quad E_{22} = \\frac{200 \\times 300}{400} = 150. \\\\ \\\\ \\text{Compute Chi-Square: } \\\\ \\chi^2 = \\frac{(20-50)^2}{50} + \\frac{(180-150)^2}{150} + \\frac{(80-50)^2}{50} + \\frac{(120-150)^2}{150} \\\\ = \\frac{900}{50} + \\frac{900}{150} + \\frac{900}{50} + \\frac{900}{150} = 18 + 6 + 18 + 6 = 48.0. \\\\ \\\\ df = (2-1)(2-1) = 1. \\text{ Tabular critical value } \\chi^2_{0.05, 1} = 3.84. \\\\ \\text{Since } \\chi^2 = 48.0 > 3.84\\text{, we reject } H_0. \\\\ \\text{Conclusion: Vaccine efficacy is not independent of sickness outcomes.}'
      },
      {
        title: 'Chi-Square Goodness-of-Fit Test',
        problem: 'A die is rolled 120 times with outcomes: 1 [15], 2 [23], 3 [18], 4 [25], 5 [16], 6 [23]. Test if the die is fair at the 5% level.',
        solution: 'H_0: \\text{The die is fair} \\Rightarrow P(\\text{each face}) = 1/6. \\\\ \\text{Expected frequency for each face: } E_i = 120 \\times \\frac{1}{6} = 20. \\\\ \\text{Observed frequencies: } O = [15, 23, 18, 25, 16, 23]. \\\\ \\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i} = \\frac{(15-20)^2}{20} + \\frac{(23-20)^2}{20} + \\frac{(18-20)^2}{20} + \\frac{(25-20)^2}{20} + \\frac{(16-20)^2}{20} + \\frac{(23-20)^2}{20} \\\\ = \\frac{25 + 9 + 4 + 25 + 16 + 9}{20} = \\frac{88}{20} = 4.4. \\\\ df = 6 - 1 = 5. \\text{ Tabular critical } \\chi^2_{0.05, 5} = 11.07. \\\\ \\text{Since } \\chi^2 = 4.4 < 11.07\\text{, we fail to reject } H_0. \\\\ \\text{Conclusion: The die is fair.}'
      }
    ],
    commonMistakes: [
      'Performing the test when the total count n is small or individual cell expected counts are below 5.',
      'Misinterpreting degrees of freedom as total cells minus 1 instead of using (r-1)(c-1) for tables.',
      'Forgetting to apply Yates\' correction in 2x2 tables with small frequencies.'
    ],
    practiceQuestion: {
      id: 'prac-cst-1',
      text: 'Find the degrees of freedom for a Chi-square independence test using a 3x4 contingency table.',
      solution: 'df = (r - 1)(c - 1) = (3 - 1)(4 - 1) = 2 \\times 3 = 6'
    }
  }
];
