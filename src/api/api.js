
export const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG14anNzbnB1dGdlc3ZpeWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3NDUwMDMsImV4cCI6MjAyMDMyMTAwM30.xU1TwKIDGWdymgJJQ1H5Bb6zeA_oZf8T9UM5neT_jCQ";

// BASE_URL
export const BASE_URL = "https://mbdmxjssnputgesviyjf.supabase.co/rest/v1";

// AUTH_URL
export const AUTH_URL = "https://mbdmxjssnputgesviyjf.supabase.co/auth/v1/token?grant_type=password";

//   SUB_URL
// >>>>>>> CABINS
export const CABINS_URL = "cabins?select=*";
export const DELETE_CABIN_URL = "cabins?";
export const CREATE_CABIN_URL = 'cabins' ;
export const EDIT_CABIN_URL = "cabins?";

// BOOKINGS
export const BOOKINGS_URL = "bookings?select=*";
export const DELETE_BOOKING_URL = "bookings?";
export const GET_BOOKING_URL = "bookings?";
export const CREATE_BOOKING_URL = 'bookings' ;
export const EDIT_BOOKING_URL = "bookings?";


// >>>>>>> SETTINGS
export const SETTINGS_URL = 'settings?select=*'
export const UPDATE_SETTINGS_URL = 'settings?id=eq.1'




// curl -X POST 'https://mbdmxjssnputgesviyjf.supabase.co/auth/v1/token?grant_type=password' \
// -H "apikey: SUPABASE_KEY" \
// -H "Content-Type: application/json" \
// -d '{
//   "email": "someone@email.com",
//   "password": "YDxWDsAtKjkXQhjquPAE"
// }'




