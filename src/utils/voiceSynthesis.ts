
export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export class VoiceSynthesis {
  private synth: SpeechSynthesis;
  private settings: VoiceSettings;

  constructor(settings: VoiceSettings = { rate: 1, pitch: 1, volume: 0.8 }) {
    this.synth = window.speechSynthesis;
    this.settings = settings;
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;
      utterance.volume = this.settings.volume;
      
      if (this.settings.voice) {
        utterance.voice = this.settings.voice;
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
