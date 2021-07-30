import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cyhjzyoezhdlqybgaldk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTkyMjMyMSwiZXhwIjoxOTM3NDk4MzIxfQ.haVNnBl8b-52vLVHTK4vjdOIhH8LHjGUwM8wz7SKsJg"
);

export default supabase;
