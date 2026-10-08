import type { Roadmap } from './types'
import { dataEngineerRoadmap }          from '@/data/roadmaps/role/data-engineer'
import { mlEngineerRoadmap }            from '@/data/roadmaps/role/ml-engineer'
import { aiEngineerRoadmap }            from '@/data/roadmaps/role/ai-engineer'
import { genaiDeveloperRoadmap }        from '@/data/roadmaps/role/genai-developer'
import { dataScientistRoadmap }         from '@/data/roadmaps/role/data-scientist'
import { analyticsEngineerRoadmap }     from '@/data/roadmaps/role/analytics-engineer'
import { fullstackRoadmap }             from '@/data/roadmaps/role/fullstack'
import { frontendRoadmap }              from '@/data/roadmaps/role/frontend'
import { backendDevRoadmap }            from '@/data/roadmaps/role/backend-dev'
import { pythonDeveloperRoadmap }       from '@/data/roadmaps/role/python-developer'
import { javaDeveloperRoadmap }         from '@/data/roadmaps/role/java-developer'
import { mobileAppDeveloperRoadmap }    from '@/data/roadmaps/role/mobile-app-developer'
import { devopsRoadmap }                from '@/data/roadmaps/role/devops'
import { sreRoadmap }                   from '@/data/roadmaps/role/site-reliability-engineer'
import { platformEngineerRoadmap }      from '@/data/roadmaps/role/platform-engineer'
import { cloudArchitectRoadmap }        from '@/data/roadmaps/role/cloud-architect'
import { softwareArchitectRoadmap }     from '@/data/roadmaps/role/software-architect'
import { dbaRoadmap }                   from '@/data/roadmaps/role/database-administrator'
import { cybersecurityAnalystRoadmap }  from '@/data/roadmaps/role/cybersecurity-analyst'
import { cloudSecurityEngineerRoadmap } from '@/data/roadmaps/role/cloud-security-engineer'

// Every role roadmap served at /learn/roadmap/[slug].
export const ROLE_ROADMAPS: Record<string, Roadmap> = {
  'data-engineer':             dataEngineerRoadmap,
  'ml-engineer':               mlEngineerRoadmap,
  'ai-engineer':               aiEngineerRoadmap,
  'genai-developer':           genaiDeveloperRoadmap,
  'data-scientist':            dataScientistRoadmap,
  'analytics-engineer':        analyticsEngineerRoadmap,
  'fullstack':                 fullstackRoadmap,
  'frontend':                  frontendRoadmap,
  'backend-dev':               backendDevRoadmap,
  'python-developer':          pythonDeveloperRoadmap,
  'java-developer':            javaDeveloperRoadmap,
  'mobile-app-developer':      mobileAppDeveloperRoadmap,
  'devops':                    devopsRoadmap,
  'site-reliability-engineer': sreRoadmap,
  'platform-engineer':         platformEngineerRoadmap,
  'cloud-architect':           cloudArchitectRoadmap,
  'software-architect':        softwareArchitectRoadmap,
  'database-administrator':    dbaRoadmap,
  'cybersecurity-analyst':     cybersecurityAnalystRoadmap,
  'cloud-security-engineer':   cloudSecurityEngineerRoadmap,
}
