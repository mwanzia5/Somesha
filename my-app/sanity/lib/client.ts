import 'server-only'
import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

// Server-only read client. It reads a private dataset with the read token
// (server env var only) and never reaches the browser.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})