import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mbdmxjssnputgesviyjf.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG14anNzbnB1dGdlc3ZpeWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3NDUwMDMsImV4cCI6MjAyMDMyMTAwM30.xU1TwKIDGWdymgJJQ1H5Bb6zeA_oZf8T9UM5neT_jCQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
