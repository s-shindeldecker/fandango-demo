import * as LDClient from 'launchdarkly-js-client-sdk';

class LaunchDarklyService {
  private client: LDClient.LDClient;
  private initialized: boolean = false;

  constructor() {
    this.client = LDClient.initialize(
      'your-client-side-sdk-key',  // Replace with your client-side SDK key
      { key: 'anonymous' }
    );

    this.client.on('ready', () => {
      this.initialized = true;
    });
  }

  async waitForInitialization(): Promise<void> {
    if (this.initialized) return;
    return this.client.waitForInitialization();
  }

  async getMovieImageUrl(defaultUrl: string): Promise<string> {
    await this.waitForInitialization();
    return this.client.variation('movie-image-flag', defaultUrl);
  }

  onFlagChange(flagKey: string, callback: () => void): void {
    this.client.on(`change:${flagKey}`, callback);
  }

  close(): void {
    this.client.close();
  }
}

export const launchDarkly = new LaunchDarklyService();
