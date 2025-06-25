
export interface OpenVoiceConfig {
  apiUrl?: string;
  model?: string;
  voice?: string;
  speed?: number;
  temperature?: number;
}

export class OpenVoiceService {
  private config: OpenVoiceConfig;
  private isInitialized: boolean = false;

  constructor(config: OpenVoiceConfig = {}) {
    this.config = {
      apiUrl: config.apiUrl || 'http://localhost:8000', // Default OpenVoice API endpoint
      model: config.model || 'v2_en',
      voice: config.voice || 'default',
      speed: config.speed || 1.0,
      temperature: config.temperature || 0.7,
      ...config
    };
  }

  async initialize(): Promise<boolean> {
    try {
      // Check if OpenVoice API is available
      const response = await fetch(`${this.config.apiUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        this.isInitialized = true;
        console.log('OpenVoice service initialized successfully');
        return true;
      } else {
        console.warn('OpenVoice API not available, will use fallback');
        return false;
      }
    } catch (error) {
      console.warn('Failed to connect to OpenVoice API:', error);
      return false;
    }
  }

  async speak(text: string): Promise<void> {
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('OpenVoice service not available');
      }
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model: this.config.model,
          voice: this.config.voice,
          speed: this.config.speed,
          temperature: this.config.temperature,
          format: 'wav'
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenVoice API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };
        
        audio.play().catch(reject);
      });
    } catch (error) {
      console.error('OpenVoice synthesis failed:', error);
      throw error;
    }
  }

  async setVoice(voiceId: string): Promise<void> {
    this.config.voice = voiceId;
  }

  async getAvailableVoices(): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.apiUrl}/voices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.voices || [];
      }
    } catch (error) {
      console.error('Failed to fetch available voices:', error);
    }
    
    return ['default', 'male', 'female', 'child']; // Fallback voice options
  }

  updateConfig(newConfig: Partial<OpenVoiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  stop(): void {
    // Stop any currently playing audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const createOpenVoiceService = (config?: OpenVoiceConfig) => {
  return new OpenVoiceService(config);
};
