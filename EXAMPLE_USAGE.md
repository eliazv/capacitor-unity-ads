# Unity Ads Plugin - Example Usage

## Complete Integration Example

### 1. Installation and Setup

```bash
# Install the plugin
npm install capacitor-unity-ads
npx cap sync android
```

### 2. Unity Dashboard Configuration

1. Go to [Unity Dashboard](https://dashboard.unity3d.com/)
2. Create a new project or select existing
3. Enable Unity Ads monetization
4. Get your **Game ID** from Project Settings
5. Create ad placements for rewarded video and interstitial

### 3. TypeScript Implementation

```typescript
import { UnityAds } from 'capacitor-unity-ads';

export class UnityAdManager {
  private isInitialized = false;
  
  // Your Unity Game ID and Placement IDs
  private readonly GAME_ID = 'YOUR_UNITY_GAME_ID';
  private readonly REWARDED_PLACEMENT_ID = 'Rewarded_Video';
  private readonly INTERSTITIAL_PLACEMENT_ID = 'Interstitial_Ad';

  async initialize() {
    try {
      await UnityAds.initialize({
        gameId: this.GAME_ID,
        testMode: true // Set to false in production
      });
      
      this.isInitialized = true;
      console.log('Unity Ads initialized successfully');
      
      // Get SDK version
      const { version } = await UnityAds.getVersion();
      console.log('Unity Ads SDK version:', version);
      
    } catch (error) {
      console.error('Failed to initialize Unity Ads:', error);
    }
  }

  async showRewardedVideo(): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Unity Ads not initialized');
      return false;
    }

    try {
      // Load the ad
      await UnityAds.loadRewardedVideo({
        placementId: this.REWARDED_PLACEMENT_ID
      });

      // Check if loaded
      const { loaded } = await UnityAds.isRewardedVideoLoaded();
      
      if (!loaded) {
        console.error('Rewarded video not loaded');
        return false;
      }

      // Show the ad
      const result = await UnityAds.showRewardedVideo();
      
      if (result.success && result.reward) {
        console.log('Reward earned:', result.reward);
        // Give reward to user
        this.giveRewardToUser(result.reward);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error showing rewarded video:', error);
      return false;
    }
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Unity Ads not initialized');
      return false;
    }

    try {
      // Load the ad
      await UnityAds.loadInterstitial({
        placementId: this.INTERSTITIAL_PLACEMENT_ID
      });

      // Check if loaded
      const { loaded } = await UnityAds.isInterstitialLoaded();
      
      if (!loaded) {
        console.error('Interstitial not loaded');
        return false;
      }

      // Show the ad
      const result = await UnityAds.showInterstitial();
      
      if (result.success) {
        console.log('Interstitial shown successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error showing interstitial:', error);
      return false;
    }
  }

  private giveRewardToUser(reward: { type: string; amount: number }) {
    // Implement your reward logic here
    console.log(`Giving ${reward.amount} ${reward.type} to user`);
    
    // Example: Add coins to user balance
    // UserService.addCoins(reward.amount);
  }

  async preloadAds() {
    if (!this.isInitialized) return;

    try {
      // Preload rewarded video
      await UnityAds.loadRewardedVideo({
        placementId: this.REWARDED_PLACEMENT_ID
      });

      // Preload interstitial
      await UnityAds.loadInterstitial({
        placementId: this.INTERSTITIAL_PLACEMENT_ID
      });

      console.log('Unity Ads preloaded successfully');
    } catch (error) {
      console.error('Error preloading Unity Ads:', error);
    }
  }

  async checkAdAvailability(): Promise<{
    rewardedVideo: boolean;
    interstitial: boolean;
  }> {
    try {
      const [rewardedResult, interstitialResult] = await Promise.all([
        UnityAds.isRewardedVideoLoaded(),
        UnityAds.isInterstitialLoaded()
      ]);

      return {
        rewardedVideo: rewardedResult.loaded,
        interstitial: interstitialResult.loaded
      };
    } catch (error) {
      console.error('Error checking Unity Ads availability:', error);
      return { rewardedVideo: false, interstitial: false };
    }
  }
}
```

### 4. React Component Example

```tsx
import React, { useEffect, useState } from 'react';
import { UnityAdManager } from './UnityAdManager';

const GameScreen: React.FC = () => {
  const [unityAdManager] = useState(new UnityAdManager());
  const [coins, setCoins] = useState(100);
  const [adsAvailable, setAdsAvailable] = useState({
    rewardedVideo: false,
    interstitial: false
  });

  useEffect(() => {
    // Initialize Unity Ads when component mounts
    unityAdManager.initialize().then(() => {
      // Preload ads for better user experience
      unityAdManager.preloadAds();
      
      // Check ad availability periodically
      const checkAds = async () => {
        const availability = await unityAdManager.checkAdAvailability();
        setAdsAvailable(availability);
      };
      
      checkAds();
      const interval = setInterval(checkAds, 30000); // Check every 30s
      
      return () => clearInterval(interval);
    });
  }, []);

  const handleWatchUnityAd = async () => {
    const success = await unityAdManager.showRewardedVideo();
    if (success) {
      setCoins(prev => prev + 15); // Give 15 coins as reward
    }
  };

  const handleShowUnityInterstitial = async () => {
    await unityAdManager.showInterstitial();
  };

  return (
    <div className="game-screen">
      <div className="coins">Coins: {coins}</div>
      
      <button 
        onClick={handleWatchUnityAd}
        disabled={!adsAvailable.rewardedVideo}
      >
        Watch Unity Ad for 15 Coins
        {!adsAvailable.rewardedVideo && ' (Loading...)'}
      </button>
      
      <button 
        onClick={handleShowUnityInterstitial}
        disabled={!adsAvailable.interstitial}
      >
        Show Unity Interstitial
        {!adsAvailable.interstitial && ' (Loading...)'}
      </button>
    </div>
  );
};

export default GameScreen;
```

### 5. Combined Meta + Unity Ad Manager

```typescript
import { MetaAds } from 'capacitor-meta-ads';
import { UnityAds } from 'capacitor-unity-ads';

export class CombinedAdManager {
  private metaInitialized = false;
  private unityInitialized = false;

  async initializeAll() {
    try {
      // Initialize both ad networks
      await Promise.all([
        this.initializeMeta(),
        this.initializeUnity()
      ]);
      
      console.log('All ad networks initialized');
    } catch (error) {
      console.error('Error initializing ad networks:', error);
    }
  }

  private async initializeMeta() {
    try {
      await MetaAds.initialize({
        appId: 'YOUR_META_APP_ID',
        testMode: true
      });
      this.metaInitialized = true;
    } catch (error) {
      console.error('Meta Ads initialization failed:', error);
    }
  }

  private async initializeUnity() {
    try {
      await UnityAds.initialize({
        gameId: 'YOUR_UNITY_GAME_ID',
        testMode: true
      });
      this.unityInitialized = true;
    } catch (error) {
      console.error('Unity Ads initialization failed:', error);
    }
  }

  async showBestRewardedVideo(): Promise<boolean> {
    // Try Unity first (usually higher eCPM for games)
    if (this.unityInitialized) {
      try {
        const unityResult = await this.showUnityRewarded();
        if (unityResult) return true;
      } catch (error) {
        console.warn('Unity rewarded failed, trying Meta:', error);
      }
    }

    // Fallback to Meta
    if (this.metaInitialized) {
      try {
        return await this.showMetaRewarded();
      } catch (error) {
        console.error('Meta rewarded also failed:', error);
      }
    }

    return false;
  }

  private async showUnityRewarded(): Promise<boolean> {
    await UnityAds.loadRewardedVideo({ placementId: 'Rewarded_Video' });
    const { loaded } = await UnityAds.isRewardedVideoLoaded();
    if (loaded) {
      const result = await UnityAds.showRewardedVideo();
      return result.success;
    }
    return false;
  }

  private async showMetaRewarded(): Promise<boolean> {
    await MetaAds.loadRewardedVideo({ placementId: 'YOUR_META_PLACEMENT_ID' });
    const { loaded } = await MetaAds.isRewardedVideoLoaded();
    if (loaded) {
      const result = await MetaAds.showRewardedVideo();
      return result.success;
    }
    return false;
  }
}
```

### 6. Unity Dashboard Setup

1. **Create Unity Project**:
   - Go to Unity Dashboard
   - Create new project or select existing
   - Enable Ads monetization

2. **Get Game ID**:
   - Project Settings → Game IDs
   - Copy Android Game ID

3. **Create Placements**:
   - Monetization → Placements
   - Create "Rewarded_Video" placement
   - Create "Interstitial_Ad" placement

4. **Test Mode**:
   - Use test mode during development
   - Unity provides test ads automatically

### 7. Production Checklist

- [ ] Get real Unity Game ID from dashboard
- [ ] Create production ad placements
- [ ] Set `testMode: false` in initialize
- [ ] Test on real devices
- [ ] Verify reward system works
- [ ] Check Unity Dashboard for analytics
- [ ] Test with AdMob mediation
- [ ] Performance test with ads

### 8. Default Placement IDs

Unity Ads uses these default placement IDs:
- **Rewarded Video**: `"Rewarded_Video"`
- **Interstitial**: `"Interstitial_Ad"`
- **Banner**: `"Banner_Ad"` (future feature)

You can create custom placement IDs in Unity Dashboard.
