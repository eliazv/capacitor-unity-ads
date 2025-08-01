# Unity Ads Plugin - Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. **"Unity Ads not initialized" Error**

**Problem**: Plugin methods fail with initialization error.

**Solutions**:
```typescript
// ✅ Correct: Initialize before using
await UnityAds.initialize({
  gameId: 'YOUR_UNITY_GAME_ID',
  testMode: true
});

// ❌ Wrong: Using methods without initialization
await UnityAds.loadRewardedVideo({ placementId: 'test' }); // Will fail
```

**Check**:
- Call `initialize()` before any other methods
- Wait for initialization to complete
- Handle initialization errors properly

### 2. **"Game ID is required" Error**

**Problem**: Initialization fails with missing Game ID.

**Solution**:
```typescript
// ✅ Correct
await UnityAds.initialize({
  gameId: 'YOUR_UNITY_GAME_ID', // Get from Unity Dashboard
  testMode: true
});

// ❌ Wrong
await UnityAds.initialize({}); // Missing gameId
await UnityAds.initialize({ gameId: '' }); // Empty gameId
```

**Get Game ID**:
1. Go to [Unity Dashboard](https://dashboard.unity3d.com/)
2. Select your project
3. Project Settings → Game IDs
4. Copy Android Game ID

### 3. **"No ads available" or Ads Not Loading**

**Problem**: Ads fail to load even with correct placement IDs.

**Solutions**:
1. **Use test mode during development**:
   ```typescript
   await UnityAds.initialize({
     gameId: 'YOUR_GAME_ID',
     testMode: true // Enable test mode
   });
   ```

2. **Use default placement IDs**:
   ```typescript
   // Unity's default placement IDs
   const REWARDED_PLACEMENT = 'Rewarded_Video';
   const INTERSTITIAL_PLACEMENT = 'Interstitial_Ad';
   ```

3. **Check Unity Dashboard**:
   - Verify project has Ads enabled
   - Check placement IDs exist
   - Ensure project is active

### 4. **"Placement ID is required" Error**

**Problem**: Methods fail with missing placement ID.

**Solution**:
```typescript
// ✅ Correct
await UnityAds.loadRewardedVideo({
  placementId: 'Rewarded_Video'
});

// ❌ Wrong
await UnityAds.loadRewardedVideo({}); // Missing placementId
await UnityAds.loadRewardedVideo({ placementId: null }); // Null placementId
```

### 5. **Ads Show But No Reward Given**

**Problem**: Rewarded video plays but reward callback not triggered.

**Solutions**:
1. **Check reward handling**:
   ```typescript
   const result = await UnityAds.showRewardedVideo();
   
   if (result.success && result.reward) {
     // ✅ Reward was earned
     console.log('Reward:', result.reward);
   } else {
     // ❌ Ad was closed without completion
     console.log('No reward earned');
   }
   ```

2. **User must watch complete video** for reward
3. **Unity test ads** always give rewards when completed

### 6. **Build Errors with Unity SDK**

**Problem**: Android build fails with Unity SDK conflicts.

**Solutions**:
1. **Check SDK version** in `android/build.gradle`:
   ```gradle
   implementation 'com.unity3d.ads:unity-ads:4.9.2'
   ```

2. **Clean and rebuild**:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

3. **Check for conflicts** with other ad SDKs

### 7. **"Unity Ads is not available on web platform" Error**

**Problem**: Trying to use Unity Ads in web/browser environment.

**Solution**:
```typescript
// ✅ Check platform before using
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  await UnityAds.initialize({ gameId: 'YOUR_GAME_ID' });
} else {
  console.log('Unity Ads not available on web');
}
```

### 8. **Initialization Timeout**

**Problem**: Unity Ads initialization takes too long or fails.

**Solutions**:
1. **Check internet connection**
2. **Verify Game ID is correct**
3. **Try with test mode enabled**:
   ```typescript
   await UnityAds.initialize({
     gameId: 'YOUR_GAME_ID',
     testMode: true // Faster initialization
   });
   ```

### 9. **Ads Not Showing in Production**

**Problem**: Ads work in test mode but not in production.

**Solutions**:
1. **Disable test mode**:
   ```typescript
   await UnityAds.initialize({
     gameId: 'YOUR_GAME_ID',
     testMode: false // Disable for production
   });
   ```

2. **Use production placement IDs**
3. **App must be approved** by Unity
4. **Check Unity Dashboard** for app status

### 10. **Memory Issues or App Crashes**

**Problem**: App crashes or memory issues after showing ads.

**Solutions**:
1. **Don't store ad instances** - let plugin manage them
2. **Handle errors properly**:
   ```typescript
   try {
     await UnityAds.showRewardedVideo();
   } catch (error) {
     console.error('Unity Ad error:', error);
     // Don't crash the app
   }
   ```

3. **Call methods on main thread** only

## 🔍 Debugging Tips

### Enable Verbose Logging

```typescript
// Add this for debugging
console.log('Initializing Unity Ads...');
await UnityAds.initialize({
  gameId: 'YOUR_GAME_ID',
  testMode: true
});
console.log('Unity Ads initialized');

// Check version
const { version } = await UnityAds.getVersion();
console.log('Unity Ads version:', version);
```

### Check Android Logs

```bash
# View Unity Ads logs
adb logcat | grep -i "unity\|ads"
```

### Test Integration

```typescript
// Test basic functionality
async function testUnityIntegration() {
  try {
    await UnityAds.initialize({ gameId: 'test', testMode: true });
    console.log('✅ Initialization works');
    
    await UnityAds.loadRewardedVideo({ placementId: 'Rewarded_Video' });
    console.log('✅ Load method works');
    
    const { loaded } = await UnityAds.isRewardedVideoLoaded();
    console.log('✅ Status check works:', loaded);
    
    const { version } = await UnityAds.getVersion();
    console.log('✅ Version check works:', version);
    
  } catch (error) {
    console.error('❌ Integration issue:', error);
  }
}
```

## 📞 Getting Help

1. **Check Unity Dashboard** for project status
2. **Test with default placement IDs** first
3. **Enable test mode** during development
4. **Check Android logs** for detailed errors
5. **Verify internet connection** for ad loading

## 🔗 Useful Links

- [Unity Ads Documentation](https://docs.unity.com/ads/)
- [Unity Dashboard](https://dashboard.unity3d.com/)
- [Unity Ads Android Integration](https://docs.unity.com/ads/en-us/manual/AndroidSDKIntegration)
- [Unity Monetization](https://docs.unity.com/ads/en-us/manual/MonetizationBasics)

## 📋 Pre-Release Checklist

Before releasing your app:

- [ ] Test with real Game ID
- [ ] Disable test mode
- [ ] Test on multiple devices
- [ ] Verify placement IDs work
- [ ] Check Unity Dashboard analytics
- [ ] Test error handling
- [ ] Verify reward system works
- [ ] Test network connectivity issues
- [ ] Performance test with ads
- [ ] Check Unity app approval status
