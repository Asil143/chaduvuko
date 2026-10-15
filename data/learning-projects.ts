export interface LearningProject {
  id: string
  title: string
  href: string
  track: string
  milestones: string[]
}

export const LEARNING_PROJECTS: LearningProject[] = [
  {
    id: 'azure-batch-pipeline',
    title: 'Copy a CSV file to Azure Data Lake',
    href: '/learn/projects/azure-batch-pipeline',
    track: 'Azure',
    milestones: [
      'Create the storage account and landing/raw containers',
      'Configure source and destination linked services',
      'Build the dataset and copy pipeline',
      'Run a debug test and fix any errors',
      'Publish the pipeline and verify the destination file',
    ],
  },
  {
    id: 'azure-projects-02',
    title: 'Copy multiple files with a ForEach loop',
    href: '/learn/projects/azure-projects-02',
    track: 'Azure',
    milestones: [
      'Prepare multiple source files',
      'Parameterize the source dataset',
      'Build a ForEach pipeline with a Copy activity',
      'Run the pipeline and confirm every file arrived',
    ],
  },
  {
    id: 'azure-project-03',
    title: 'Parameterized pipeline with a run date',
    href: '/learn/projects/azure-project-03',
    track: 'Azure',
    milestones: [
      'Add a run-date parameter',
      'Use the parameter in source and destination paths',
      'Test with a date different from today',
      'Configure and verify the scheduled trigger',
    ],
  },
  {
    id: 'azure-project-04',
    title: 'Ingest data from a public HTTP URL',
    href: '/learn/projects/azure-project-04',
    track: 'Azure',
    milestones: [
      'Configure an HTTP linked service and source dataset',
      'Copy the public data into ADLS',
      'Validate the downloaded file and schema',
      'Test a repeatable pipeline run',
    ],
  },
  {
    id: 'azure-project-05',
    title: 'Organize files with date stamps',
    href: '/learn/projects/azure-project-05',
    track: 'Azure',
    milestones: [
      'Check whether the expected source file exists',
      'Create a date-stamped destination path',
      'Handle missing files without a silent success',
      'Run tests for both present and missing file cases',
    ],
  },
  {
    id: 'azure-project-06',
    title: 'Pull weather data from a REST API',
    href: '/learn/projects/azure-project-06',
    track: 'Azure',
    milestones: [
      'Configure the REST source and request parameters',
      'Ingest weather responses for multiple cities',
      'Write and inspect the resulting JSON files',
      'Schedule a run and check pipeline monitoring',
    ],
  },
]
