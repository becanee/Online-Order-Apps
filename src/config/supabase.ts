
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl: any = "https://ekuljgfjglwypvropowi.supabase.co"
export const supabaseKey: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdWxqZ2ZqZ2x3eXB2cm9wb3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MDY5MDIsImV4cCI6MjA0MDA4MjkwMn0.qFb8ANeU-wf0qN80kJTSFDRHJiYHCqaLb2BA59moS_A"
export const supabase = createClient(supabaseUrl, supabaseKey)