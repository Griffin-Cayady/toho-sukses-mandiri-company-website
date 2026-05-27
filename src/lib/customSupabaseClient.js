import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njydsbakffqaxeejipih.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeWRzYmFrZmZxYXhlZWppcGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTAwNTIsImV4cCI6MjA3NDc4NjA1Mn0.38Ir5gqZP9eYqAQmcjM_j1OP8evPzYtsVHXJ6-Vue4U';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
