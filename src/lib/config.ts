export const config = {
    youtube: {
      apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
      channelId: 'UCOT01XvBSj12xQsANtTeAcQ',
      maxResults: 10
    }
  } as const
  
  export function validateConfig() {
    const missingEnvVars: string[] = []
    
    if (!config.youtube.apiKey) {
      missingEnvVars.push('NEXT_PUBLIC_YOUTUBE_API_KEY')
    }
    
    return {
      isValid: missingEnvVars.length === 0,
      missingEnvVars
    }
  }
  