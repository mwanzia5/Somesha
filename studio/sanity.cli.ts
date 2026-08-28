import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'please-set-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  typegen: {
    enabled: true,
    path: ['../my-app/sanity/**/*.{ts,tsx}', '../my-app/app/**/*.{ts,tsx}'],
    schema: 'schema.json',
    generates: '../my-app/sanity.types.ts',
    overloadClientMethods: true,
  },
})