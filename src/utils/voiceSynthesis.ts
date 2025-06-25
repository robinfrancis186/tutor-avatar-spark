
export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export class VoiceSynthesis {
  private synth: SpeechSynthesis;
  private settings: VoiceSettings;

  constructor(settings: VoiceSettings = { rate: 0.9, pitch: 1.1, volume: 0.8 }) {
    this.synth = window.speechSynthesis;
    this.settings = settings;
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Clean text for better pronunciation
      const cleanText = text.replace(/[🎉🌟💫✨🚀🌱💡🎯📚🧩⭐🏆🎊🌅⚡🌙😊🤩🤔💪🧠]/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;
      utterance.volume = this.settings.volume;
      
      // Try to use a more natural voice
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Natural') ||
        voice.name.includes('Premium')
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    this.synth.cancel();
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  updateSettings(newSettings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }
}

export const createVoiceSynthesis = (settings?: VoiceSettings) => {
  return new VoiceSynthesis(settings);
};
