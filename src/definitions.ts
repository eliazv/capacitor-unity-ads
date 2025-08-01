export interface UnityAdsPlugin {
  /**
   * Initialize Unity Ads SDK
   */
  initialize(options: { gameId: string; testMode?: boolean }): Promise<void>;

  /**
   * Load a rewarded video ad
   */
  loadRewardedVideo(options: { placementId: string }): Promise<void>;

  /**
   * Show a rewarded video ad
   */
  showRewardedVideo(): Promise<{ success: boolean; reward?: RewardInfo }>;

  /**
   * Check if rewarded video ad is loaded
   */
  isRewardedVideoLoaded(): Promise<{ loaded: boolean }>;

  /**
   * Load an interstitial ad
   */
  loadInterstitial(options: { placementId: string }): Promise<void>;

  /**
   * Show an interstitial ad
   */
  showInterstitial(): Promise<{ success: boolean }>;

  /**
   * Check if interstitial ad is loaded
   */
  isInterstitialLoaded(): Promise<{ loaded: boolean }>;

  /**
   * Set test mode
   */
  setTestMode(options: { enabled: boolean }): Promise<void>;

  /**
   * Get Unity Ads version
   */
  getVersion(): Promise<{ version: string }>;
}

export interface RewardInfo {
  type: string;
  amount: number;
}

export interface UnityAdsEvent {
  type: 'initialized' | 'rewardedVideoLoaded' | 'rewardedVideoFailedToLoad' |
        'rewardedVideoShown' | 'rewardedVideoCompleted' | 'rewardedVideoClosed' |
        'interstitialLoaded' | 'interstitialFailedToLoad' | 'interstitialShown' |
        'interstitialClosed';
  data?: any;
}
