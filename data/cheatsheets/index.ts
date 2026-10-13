import type { TrackCheatSheet } from '@/lib/cheatsheet'
import { foundationsCheatSheet } from './foundations'
import { dataEngineeringCheatSheet } from './data-engineering'
import { pythonCheatSheet } from './python'
import { htmlCssCheatSheet } from './html-css'
import { dsaCheatSheet } from './dsa'
import { dbmsCheatSheet } from './dbms'
import { networkingCheatSheet } from './networking'
import { awsCheatSheet } from './aws'
import { azureCheatSheet } from './azure'
import { gcpCheatSheet } from './gcp'
import { kafkaCheatSheet } from './apache-kafka'
import { dbtCheatSheet } from './dbt'
import { snowflakeCheatSheet } from './snowflake'
import { cybersecurityCheatSheet } from './cybersecurity'
import { aiMlCheatSheet } from './ai-ml'
import { dataScienceCheatSheet } from './data-science'

/** Per-track cheat sheets, keyed by track slug. */
export const CHEAT_SHEETS: Record<string, TrackCheatSheet> = {
  foundations: foundationsCheatSheet,
  'data-engineering': dataEngineeringCheatSheet,
  python: pythonCheatSheet,
  'html-css': htmlCssCheatSheet,
  dsa: dsaCheatSheet,
  dbms: dbmsCheatSheet,
  networking: networkingCheatSheet,
  aws: awsCheatSheet,
  azure: azureCheatSheet,
  gcp: gcpCheatSheet,
  'apache-kafka': kafkaCheatSheet,
  dbt: dbtCheatSheet,
  snowflake: snowflakeCheatSheet,
  cybersecurity: cybersecurityCheatSheet,
  'ai-ml': aiMlCheatSheet,
  'data-science': dataScienceCheatSheet,
}
