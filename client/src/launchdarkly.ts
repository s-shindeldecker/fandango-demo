import { initialize, LDClient } from 'launchdarkly-js-client-sdk';
import { config } from './config';

class LaunchDarklyService {
  private client: LDClient;
  private initialized: boolean = false;

  constructor() {
    // Initialize with client-side ID from config
    this.client = initialize(config.launchDarkly.clientSideId, { 
      key: 'anonymous',
      anonymous: true
    });

    this.client.on('ready', () => {
      this.initialized = true;
      console.log('LaunchDarkly client initialized');
    });

    this.client.on('failed', () => {
      console.error('LaunchDarkly client failed to initialize');
    });
  }

  async waitForInitialization(): Promise<void> {
    if (this.initialized) return;
    return this.client.waitForInitialization();
  }

  async getMovieImageUrl(defaultUrl: string): Promise<string> {
    try {
      await this.waitForInitialization();
      return this.client.variation('movie-image-flag', defaultUrl);
    } catch (error) {
      console.error('Error getting movie image flag:', error);
      return defaultUrl;
    }
  }

  onFlagChange(flagKey: string, callback: () => void): void {
    this.client.on(`change:${flagKey}`, callback);
  }

  close(): void {
    this.client.close();
  }
}

export const launchDarkly = new LaunchDarklyService();
