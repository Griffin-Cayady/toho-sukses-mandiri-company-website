import { supabase } from './customSupabaseClient';

/**
 * Safely logs environment variables without exposing secrets completely.
 */
export const logEnvironmentVariables = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.group('Supabase Environment Variables Check');
  console.log('VITE_SUPABASE_URL:', url ? `${url.substring(0, 15)}...` : 'NOT SET');
  console.log('VITE_SUPABASE_ANON_KEY:', key ? `${key.substring(0, 10)}...[HIDDEN]` : 'NOT SET');
  console.groupEnd();
};

/**
 * Standardized error logger for Supabase operations.
 */
export const logSupabaseError = (operation, error, context = {}) => {
  const timestamp = new Date().toISOString();
  const errorReport = {
    timestamp,
    operation,
    message: error?.message || 'Unknown error',
    code: error?.code || 'NO_CODE',
    details: error?.details || 'No additional details',
    hint: error?.hint || 'No hint available',
    status: error?.status || 'No status',
    context
  };

  console.group(`🚨 Supabase Error: ${operation}`);
  console.error(JSON.stringify(errorReport, null, 2));
  if (errorReport.message.includes('Failed to fetch') || errorReport.message.includes('NetworkError')) {
    console.warn('💡 HINT: This looks like a network or CORS issue. Please check your Supabase CORS settings and internet connection.');
  }
  console.groupEnd();

  return errorReport;
};

/**
 * Tests the Supabase connection by performing a simple query.
 */
export const testSupabaseConnection = async () => {
  try {
    logEnvironmentVariables();
    console.log('Testing Supabase connection...');
    const startTime = performance.now();
    
    // Simple health check query
    const { data: healthData, error: healthError } = await supabase.from('products').select('id').limit(1);
    
    if (healthError) {
      logSupabaseError('testSupabaseConnection', healthError);
      return { success: false, error: healthError.message, type: 'QUERY_ERROR' };
    }
    
    const endTime = performance.now();
    console.log(`✅ Supabase connection successful! Latency: ${(endTime - startTime).toFixed(2)}ms`);
    return { success: true, latency: endTime - startTime };
    
  } catch (error) {
    logSupabaseError('testSupabaseConnection (Exception)', error);
    return { success: false, error: error.message, type: 'NETWORK_ERROR' };
  }
};