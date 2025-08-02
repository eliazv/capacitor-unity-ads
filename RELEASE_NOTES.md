# Release Notes - Capacitor Unity Ads Plugin

## Version 1.0.0 (2024-08-02)

### 🎉 Initial Release

Complete Capacitor plugin for Unity Ads integration with full platform support.

### ✅ Features

#### Core Functionality
- **Unity Ads SDK Integration**: Android 4.9.2, iOS 4.9.2
- **Rewarded Video Ads**: Load and show with reward tracking
- **Interstitial Ads**: Full support for interstitial ad formats
- **Ad Status Checking**: Real-time loading status monitoring
- **Test Mode Support**: Development and production mode switching
- **Version Information**: SDK version retrieval

#### Platform Support
- ✅ **Android**: Complete implementation with Unity Ads SDK 4.9.2
- ✅ **iOS**: Complete implementation with Unity Ads SDK 4.9.2
- ✅ **Web**: Graceful fallback (Unity Ads not supported on web)

#### API Methods
- `initialize()` - Initialize Unity Ads with Game ID and test mode
- `loadRewardedVideo()` - Load rewarded video ad
- `showRewardedVideo()` - Show rewarded video with reward tracking
- `isRewardedVideoLoaded()` - Check if rewarded video is ready
- `loadInterstitial()` - Load interstitial ad
- `showInterstitial()` - Show interstitial ad
- `isInterstitialLoaded()` - Check if interstitial is ready
- `setTestMode()` - Toggle test mode
- `getVersion()` - Get Unity Ads SDK version

### 🛠 Technical Implementation

#### Android
- Unity Ads SDK 4.9.2 via Gradle
- Comprehensive error handling and logging
- Proper lifecycle management
- Thread-safe callback implementation

#### iOS
- Unity Ads SDK 4.9.2 via CocoaPods and Swift Package Manager
- Native Swift implementation with delegate pattern
- Memory-safe weak references
- Main thread callback handling

#### TypeScript
- Full TypeScript definitions
- Promise-based API
- Comprehensive error types
- Event interface definitions

### 📚 Documentation

- **README.md**: Auto-generated API documentation
- **EXAMPLE_USAGE.md**: Complete integration examples
- **TROUBLESHOOTING.md**: Common issues and solutions
- **CONTRIBUTING.md**: Development guidelines
- **CLAUDE.md**: Development assistant guidance

### 🔧 Development Tools

- ESLint + Prettier for code formatting
- SwiftLint for iOS code quality
- Automated build and verification scripts
- TypeScript compilation with strict settings
- Rollup bundling for distribution

### 🤝 AdMob Mediation

- **Full AdMob Mediation Support**: Verified compatibility with Google AdMob
- **Waterfall Integration**: Standard mediation support
- **Bidding Support**: Unity Ads bidding integration (beta)
- **Latest Adapters**: Compatible with Unity adapter 4.11.3.0+

### 📦 Installation

```bash
npm install capacitor-unity-ads
npx cap sync
```

### 🎯 Unity Dashboard Setup Required

1. Create Unity project at [Unity Dashboard](https://dashboard.unity3d.com/)
2. Enable Unity Ads monetization
3. Get Game ID from Project Settings
4. Create ad placements (Rewarded_Video, Interstitial_Ad)

### 🚨 Important Notes

- Requires Unity Dashboard configuration
- Test mode recommended during development
- Android requires ANDROID_HOME for building
- iOS requires Xcode for building
- Web platform shows appropriate fallback messages

### 🔄 Migration

This is the initial release - no migration required.

### 🐛 Known Issues

- Android build requires ANDROID_HOME environment variable
- iOS build requires Xcode on macOS
- SwiftLint not available on Windows during development

### 🔗 Links

- [GitHub Repository](https://github.com/eliazv/capacitor-unity-ads)
- [Unity Ads Documentation](https://docs.unity.com/ads/)
- [Unity Dashboard](https://dashboard.unity3d.com/)
- [AdMob Mediation Guide](https://developers.google.com/admob/android/mediation/unity)

### 👥 Contributors

- **eliazavatta** - Initial implementation and documentation

---

**Ready for production use with proper Unity Dashboard configuration.**