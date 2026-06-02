export interface SyllabusTopic {
  name: string;
  topicId?: string; // Links to detail pages if available
}

export interface SyllabusUnit {
  id: string;
  number: number;
  title: string;
  hours?: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  statusLabel?: string;
  topics: SyllabusTopic[];
}

export interface CourseMetadata {
  title: string;
  code: string;
  type: string;
  designation: string;
  semester: string;
  contactHours: string;
  continuousAssessmentMarks: number;
  finalExamMarks: number;
  university: string;
  universitySubText?: string;
  academicSession: string;
  program: string;
}

export const courseDetails: CourseMetadata = {
  title: 'Mathematics IIA',
  code: 'BS-M201',
  type: 'Theory',
  designation: 'Compulsory',
  semester: '2nd',
  contactHours: '3L + 1T per week',
  continuousAssessmentMarks: 25,
  finalExamMarks: 70,
  university: 'Maulana Abul Kalam Azad University of Technology',
  universitySubText: 'Formerly West Bengal University of Technology',
  academicSession: 'Effective from 2023 to 2024',
  program: 'B.Tech in Computer Science and Engineering'
};

export const syllabus: SyllabusUnit[] = [
  {
    id: 'unit-1-basic-probability',
    number: 1,
    title: 'Basic Probability',
    hours: 11,
    status: 'Pending',
    topics: [
      { name: 'Probability spaces', topicId: 'basic-probability' },
      { name: 'Conditional probability', topicId: 'conditional-probability' },
      { name: 'Independence', topicId: 'basic-probability' },
      { name: 'Discrete random variables', topicId: 'pmf-pdf-cdf' },
      { name: 'Independent random variables', topicId: 'bivariate-distributions' },
      { name: 'Multinomial distribution', topicId: 'binomial' },
      { name: 'Poisson approximation to the Binomial distribution', topicId: 'poisson-normal' },
      { name: 'Infinite sequences of Bernoulli trials', topicId: 'binomial' },
      { name: 'Sums of independent random variables', topicId: 'bivariate-distributions' },
      { name: 'Expectation of discrete random variables', topicId: 'expectation-variance' },
      { name: 'Moments', topicId: 'central-tendency-moments' },
      { name: 'Variance of a sum', topicId: 'expectation-variance' },
      { name: 'Correlation coefficient', topicId: 'correlation' },
      { name: 'Chebyshev\'s Inequality', topicId: 'chebyshev-inequality' }
    ]
  },
  {
    id: 'unit-2-continuous-probability',
    number: 2,
    title: 'Continuous Probability Distributions',
    hours: 4,
    status: 'Pending',
    topics: [
      { name: 'Continuous random variables and their properties', topicId: 'pmf-pdf-cdf' },
      { name: 'Distribution functions and densities', topicId: 'pmf-pdf-cdf' },
      { name: 'Normal density', topicId: 'poisson-normal' },
      { name: 'Exponential density', topicId: 'poisson-normal' },
      { name: 'Gamma density', topicId: 'poisson-normal' }
    ]
  },
  {
    id: 'unit-3-bivariate-distributions',
    number: 3,
    title: 'Bivariate Distributions',
    hours: 5,
    status: 'Pending',
    topics: [
      { name: 'Bivariate distributions and their properties', topicId: 'bivariate-distributions' },
      { name: 'Distribution of sums and quotients', topicId: 'bivariate-distributions' },
      { name: 'Conditional densities', topicId: 'bivariate-distributions' },
      { name: 'Bayes\' rule', topicId: 'bayes-theorem' }
    ]
  },
  {
    id: 'unit-4-basic-statistics',
    number: 4,
    title: 'Basic Statistics',
    hours: 8,
    status: 'Pending',
    statusLabel: 'Completed up to Rank Correlation',
    topics: [
      { name: 'Measures of central tendency', topicId: 'central-tendency-moments' },
      { name: 'Moments', topicId: 'central-tendency-moments' },
      { name: 'Skewness and Kurtosis', topicId: 'central-tendency-moments' },
      { name: 'Probability distributions', topicId: 'pmf-pdf-cdf' },
      { name: 'Binomial distribution', topicId: 'binomial' },
      { name: 'Poisson distribution', topicId: 'poisson-normal' },
      { name: 'Normal distribution', topicId: 'poisson-normal' },
      { name: 'Evaluation of statistical parameters for Binomial, Poisson and Normal distributions', topicId: 'poisson-normal' },
      { name: 'Correlation and regression', topicId: 'regression' },
      { name: 'Rank correlation', topicId: 'rank-correlation' }
    ]
  },
  {
    id: 'unit-5-applied-statistics',
    number: 5,
    title: 'Applied Statistics',
    hours: 8,
    status: 'Pending',
    topics: [
      { name: 'Curve fitting by the method of least squares', topicId: 'curve-fitting' },
      { name: 'Fitting of straight lines', topicId: 'curve-fitting' },
      { name: 'Fitting of second degree parabolas', topicId: 'curve-fitting' },
      { name: 'Fitting of more general curves', topicId: 'curve-fitting' },
      { name: 'Test of significance', topicId: 'large-samples' },
      { name: 'Large sample test for single proportion', topicId: 'large-samples' },
      { name: 'Large sample test for difference of proportions', topicId: 'large-samples' },
      { name: 'Large sample test for single mean', topicId: 'large-samples' },
      { name: 'Large sample test for difference of means', topicId: 'large-samples' },
      { name: 'Large sample test for difference of standard deviations', topicId: 'large-samples' }
    ]
  },
  {
    id: 'unit-6-small-samples',
    number: 6,
    title: 'Small Samples',
    status: 'Pending',
    topics: [
      { name: 'Test for single mean', topicId: 'small-samples' },
      { name: 'Test for difference of means', topicId: 'small-samples' },
      { name: 'Test for correlation coefficients', topicId: 'small-samples' },
      { name: 'Test for ratio of variances', topicId: 'small-samples' },
      { name: 'Chi-square test for goodness of fit', topicId: 'chi-square-tests' },
      { name: 'Chi-square test for independence of attributes', topicId: 'chi-square-tests' }
    ]
  }
];
