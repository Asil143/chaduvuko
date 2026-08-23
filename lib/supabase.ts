import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Built lazily (not at module load) so a missing env var only breaks the
// specific request that needs it, instead of crashing the entire build/boot —
// `next build` statically evaluates route module imports during page-data
// collection, and an eager createClient() call here used to abort the whole
// build if NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY were unset.
let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return client
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})
