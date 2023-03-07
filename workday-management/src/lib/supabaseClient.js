import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dtrjaardnfrqhkaleiwu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cmphYXJkbmZycWhrYWxlaXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxODE3MjgsImV4cCI6MTk5Mzc1NzcyOH0.qE4alcF7wOgnSI-ySAcCOA0rbkwEzFn4E3h7nmKXW0E"
);
