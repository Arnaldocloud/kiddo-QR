
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Updated Supabase URL and key for the kiddo-qr project in Arnaldocloud's Org
const SUPABASE_URL = "https://frgwcpyyjdzrajwtofsi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZ3djcHl5amR6cmFqd3RvZnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzE4ODMsImV4cCI6MjA1OTc0Nzg4M30.uk9WjL6nVPCB1DtxX7HWaMWFLyk2xEkiuhT3HxAdp3c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
