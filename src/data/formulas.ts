export interface Formula {
  id: string;
  topicId: string;
  title: string;
  expression: string;
  explanation: string;
  whenToUse: string;
}

export const formulas: Formula[] = [
  {
    id: 'f-bp-1',
    topicId: 'basic-probability',
    title: 'Complement Rule',
    expression: "P(A') = 1 - P(A)",
    explanation: 'The probability of an event NOT happening is 1 minus the probability of it happening.',
    whenToUse: 'When it is easier to calculate the probability of the opposite event.'
  },
  {
    id: 'f-bp-2',
    topicId: 'basic-probability',
    title: 'Addition Rule',
    expression: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
    explanation: 'The probability of A or B occurring. Subtract the intersection to avoid double counting.',
    whenToUse: 'When asked for the probability of A "or" B.'
  },
  {
    id: 'f-bp-3',
    topicId: 'basic-probability',
    title: 'Multiplication Rule (Independent)',
    expression: "P(A \\cap B) = P(A)P(B)",
    explanation: 'For independent events, the probability of both occurring is the product of their individual probabilities.',
    whenToUse: 'When events are stated as independent and you need P(A "and" B).'
  },
  {
    id: 'f-cp-1',
    topicId: 'conditional-probability',
    title: 'Conditional Probability',
    expression: "P(A | B) = \\frac{P(A \\cap B)}{P(B)}",
    explanation: 'Probability of A occurring given that B has already occurred.',
    whenToUse: 'When the question states "given that", "if", or restricts the sample space.'
  },
  {
    id: 'f-bt-1',
    topicId: 'bayes-theorem',
    title: 'Bayes Theorem',
    expression: "P(B_i | A) = \\frac{P(B_i)P(A | B_i)}{\\sum P(B_j)P(A | B_j)}",
    explanation: 'Updates the probability of a hypothesis (Bi) given observed evidence (A).',
    whenToUse: 'When finding a "cause" after observing a "result".'
  },
  {
    id: 'f-pmf-1',
    topicId: 'pmf-pdf-cdf',
    title: 'PMF Total Probability',
    expression: "\\sum p(x) = 1",
    explanation: 'The sum of all probabilities in a Probability Mass Function must equal 1.',
    whenToUse: 'To find an unknown constant in a discrete probability distribution.'
  },
  {
    id: 'f-pdf-1',
    topicId: 'pmf-pdf-cdf',
    title: 'PDF Total Area',
    expression: "\\int_{-\\infty}^{\\infty} f(x) dx = 1",
    explanation: 'The total area under a Probability Density Function curve must equal 1.',
    whenToUse: 'To find an unknown constant in a continuous probability distribution.'
  },
  {
    id: 'f-cdf-1',
    topicId: 'pmf-pdf-cdf',
    title: 'CDF (Continuous)',
    expression: "F(x) = \\int_{-\\infty}^{x} f(t) dt",
    explanation: 'The Cumulative Distribution Function gives the probability that X is less than or equal to x.',
    whenToUse: 'When asked for F(x) from f(x), or P(X ≤ x).'
  },
  {
    id: 'f-ev-1',
    topicId: 'expectation-variance',
    title: 'Discrete Expectation',
    expression: "E(X) = \\sum x p(x)",
    explanation: 'The expected value (mean) of a discrete random variable.',
    whenToUse: 'When asked for the mean of a discrete distribution.'
  },
  {
    id: 'f-ev-2',
    topicId: 'expectation-variance',
    title: 'Variance',
    expression: "V(X) = E(X^2) - [E(X)]^2",
    explanation: 'The variance measures the spread of the distribution.',
    whenToUse: 'When asked for variance or standard deviation (take the square root).'
  },
  {
    id: 'f-bin-1',
    topicId: 'binomial',
    title: 'Binomial Probability',
    expression: "P(X = x) = {}^nC_x p^x q^{n-x}",
    explanation: 'Probability of exactly x successes in n trials, where p is success probability and q is failure (1-p).',
    whenToUse: 'For repeated independent yes/no trials.'
  },
  {
    id: 'f-bin-2',
    topicId: 'binomial',
    title: 'Binomial Mean & Variance',
    expression: "E(X) = np, \\quad V(X) = npq",
    explanation: 'Shortcuts for mean and variance of a Binomial distribution.',
    whenToUse: 'When asked for expected value or variance of a binomial setting.'
  },
  {
    id: 'f-corr-1',
    topicId: 'correlation',
    title: 'Correlation Coefficient',
    expression: "r = \\frac{\\sum xy}{\\sqrt{\\sum x^2 \\sum y^2}}",
    explanation: 'Measures the linear relationship between X and Y. Here x and y are deviations from means.',
    whenToUse: 'When asked to find the correlation coefficient from paired data.'
  },
  {
    id: 'f-reg-1',
    topicId: 'regression',
    title: 'Regression Line of Y on X',
    expression: "y - \\bar{y} = b_{yx}(x - \\bar{x}), \\quad b_{yx} = \\frac{\\sum xy}{\\sum x^2}",
    explanation: 'The line used to predict Y given X.',
    whenToUse: 'When asked for the regression line of Y on X, or to predict Y.'
  },
  {
    id: 'f-reg-2',
    topicId: 'regression',
    title: 'Regression Relation',
    expression: "r = \\pm \\sqrt{b_{yx} b_{xy}}",
    explanation: 'Correlation is the geometric mean of the regression coefficients. Sign matches the coefficients.',
    whenToUse: 'When given regression coefficients and asked for correlation.'
  },
  {
    id: 'f-rc-1',
    topicId: 'rank-correlation',
    title: 'Spearman Rank Correlation',
    expression: "\\rho = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}",
    explanation: 'Correlation based on ranks. d is the difference between ranks for a pair.',
    whenToUse: 'When data is ranked or asked for Spearman correlation.'
  },
  {
    id: 'f-ci-1',
    topicId: 'chebyshev-inequality',
    title: 'Chebyshev\'s Inequality',
    expression: "P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}",
    explanation: 'Calculates the upper bound on the probability that a random variable lies outside k standard deviations from the mean.',
    whenToUse: 'When the underlying probability distribution is unknown, but you have the mean and standard deviation.'
  },
  {
    id: 'f-pn-1',
    topicId: 'poisson-normal',
    title: 'Poisson PMF',
    expression: "P(X = x) = \\frac{e^{-\\lambda}\\lambda^x}{x!}",
    explanation: 'Calculates discrete probabilities for events occurring at a constant average rate λ.',
    whenToUse: 'When events occur independently at a known constant average rate per unit interval.'
  },
  {
    id: 'f-pn-2',
    topicId: 'poisson-normal',
    title: 'Standard Normal Z-Score',
    expression: "z = \\frac{x - \\mu}{\\sigma}",
    explanation: 'Standardizes any normal random variable X into a Standard Normal variable Z with mean 0 and variance 1.',
    whenToUse: 'When performing calculations with normal probability densities.'
  },
  {
    id: 'f-bd-1',
    topicId: 'bivariate-distributions',
    title: 'Conditional Density',
    expression: "f_{X|Y}(x|y) = \\frac{f(x, y)}{f_Y(y)}",
    explanation: 'Calculates the conditional probability density of X given Y has already occurred.',
    whenToUse: 'When calculating conditional probabilities in a bivariate continuous distribution.'
  },
  {
    id: 'f-ctm-1',
    topicId: 'central-tendency-moments',
    title: 'Skewness Coefficient (Beta 1)',
    expression: "\\beta_1 = \\frac{\\mu_3^2}{\\mu_2^3}",
    explanation: 'Measures the degree of asymmetry of a distribution. A value of 0 indicates a symmetrical distribution.',
    whenToUse: 'When analyzing the skewness or asymmetry of data.'
  },
  {
    id: 'f-ctm-2',
    topicId: 'central-tendency-moments',
    title: 'Kurtosis Coefficient (Beta 2)',
    expression: "\\beta_2 = \\frac{\\mu_4}{\\mu_2^2}",
    explanation: 'Measures the tailedness of a probability distribution. A value of 3 indicates a normal (mesokurtic) distribution.',
    whenToUse: 'When analyzing the heaviness of tails or peakedness of a distribution.'
  },
  {
    id: 'f-cf-1',
    topicId: 'curve-fitting',
    title: 'Least Squares Linear Equations',
    expression: "a \\sum x^2 + b \\sum x = \\sum xy, \\quad a \\sum x + nb = \\sum y",
    explanation: 'Normal equations utilized to determine slope "a" and intercept "b" for the best fit line y = ax + b.',
    whenToUse: 'When fitting a straight line to paired coordinates.'
  },
  {
    id: 'f-ls-1',
    topicId: 'large-samples',
    title: 'Single Mean Z-Test',
    expression: "Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}",
    explanation: 'Z-score statistic testing if a sample mean differs significantly from a hypothesized population mean.',
    whenToUse: 'When sample size is large (n ≥ 30) and testing single population mean.'
  },
  {
    id: 'f-ls-2',
    topicId: 'large-samples',
    title: 'Single Proportion Z-Test',
    expression: "Z = \\frac{p - P_0}{\\sqrt{P_0 Q_0 / n}}",
    explanation: 'Z-score statistic testing if a sample proportion differs significantly from a hypothesized population proportion.',
    whenToUse: 'When sample size is large (n ≥ 30) and testing single population proportion.'
  },
  {
    id: 'f-ss-1',
    topicId: 'small-samples',
    title: 'Small Sample t-Test',
    expression: "t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}",
    explanation: 'Student\'s t-statistic utilized for small sample sizes to test single population mean.',
    whenToUse: 'When sample size is small (n < 30) and standard deviation is estimated from the sample.'
  },
  {
    id: 'f-ss-2',
    topicId: 'small-samples',
    title: 'F-Test for Variance Ratio',
    expression: "F = \\frac{S_1^2}{S_2^2}",
    explanation: 'Calculates the ratio of two sample variances to test if the two population variances are equal.',
    whenToUse: 'When comparing variances of two normal populations with small samples (n < 30).'
  },
  {
    id: 'f-cst-1',
    topicId: 'chi-square-tests',
    title: 'Chi-Square Test statistic',
    expression: "\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}",
    explanation: 'Measures the difference between observed frequencies (Oi) and expected frequencies (Ei).',
    whenToUse: 'When performing goodness-of-fit tests or independence-of-attributes tests for categorical data.'
  }
];
