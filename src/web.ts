import { WebPlugin } from '@capacitor/core';

import type { UnityAdsPlugin, RewardInfo } from './definitions';

export class UnityAdsWeb extends WebPlugin implements UnityAdsPlugin {
  async initialize(options: { gameId: string; testMode?: boolean }): Promise<void> {
    console.log('UnityAds Web: initialize', options);
    // Web implementation not available for Unity Ads
    throw new Error('Unity Ads is not available on web platform');
  }

  async loadRewardedVideo(options: { placementId: string }): Promise<void> {
    console.log('UnityAds Web: loadRewardedVideo', options);
    throw new Error('Unity Ads is not available on web platform');
  }

  async showRewardedVideo(): Promise<{ success: boolean; reward?: RewardInfo }> {
    console.log('UnityAds Web: showRewardedVideo');
    throw new Error('Unity Ads is not available on web platform');
  }

  async isRewardedVideoLoaded(): Promise<{ loaded: boolean }> {
    console.log('UnityAds Web: isRewardedVideoLoaded');
    return { loaded: false };
  }

  async loadInterstitial(options: { placementId: string }): Promise<void> {
    console.log('UnityAds Web: loadInterstitial', options);
    throw new Error('Unity Ads is not available on web platform');
  }

  async showInterstitial(): Promise<{ success: boolean }> {
    console.log('UnityAds Web: showInterstitial');
    throw new Error('Unity Ads is not available on web platform');
  }

  async isInterstitialLoaded(): Promise<{ loaded: boolean }> {
    console.log('UnityAds Web: isInterstitialLoaded');
    return { loaded: false };
  }

  async setTestMode(options: { enabled: boolean }): Promise<void> {
    console.log('UnityAds Web: setTestMode', options);
    // No-op on web
  }

  async getVersion(): Promise<{ version: string }> {
    console.log('UnityAds Web: getVersion');
    return { version: 'web-mock' };
  }
}
