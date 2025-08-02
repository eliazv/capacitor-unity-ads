# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Capacitor plugin for Unity Ads integration, providing support for rewarded video and interstitial ads across iOS, Android, and web platforms. The plugin follows Capacitor's standard plugin architecture with native implementations for each platform.

## Architecture

- **TypeScript API Layer**: `src/definitions.ts` defines the plugin interface with methods for initializing Unity Ads, loading/showing ads, and managing test mode
- **Plugin Registration**: `src/index.ts` registers the plugin with Capacitor core and exports the UnityAds instance
- **Web Implementation**: `src/web.ts` provides browser fallback functionality
- **Android Native**: `android/src/main/java/com/eliazavatta/plugins/unityads/` contains Java implementations using Unity Ads SDK 4.9.2
- **iOS Native**: `ios/Sources/UnityadsPlugin/` contains Swift implementations (currently has placeholder code that needs completion)

## Common Development Commands

### Building and Development
- `npm run build` - Complete build process (clean, generate docs, compile TypeScript, bundle with rollup)
- `npm run clean` - Remove dist directory
- `npm run watch` - Watch TypeScript files and compile on changes
- `npm run docgen` - Generate API documentation and update README.md

### Code Quality
- `npm run lint` - Run all linting (ESLint, Prettier, SwiftLint)
- `npm run fmt` - Format all code (fix ESLint, run Prettier, fix SwiftLint)
- `npm run eslint` - Run ESLint on TypeScript files
- `npm run prettier` - Check Prettier formatting on CSS, HTML, TypeScript, JavaScript, and Java files
- `npm run swiftlint` - Run SwiftLint on iOS code

### Platform Verification
- `npm run verify` - Run all platform verifications
- `npm run verify:ios` - Build iOS scheme with xcodebuild
- `npm run verify:android` - Build and test Android module with Gradle
- `npm run verify:web` - Verify web build

### Android Development
- `cd android && ./gradlew clean build test` - Build and test Android module
- Android uses Unity Ads SDK version 4.9.2
- Minimum SDK version 23, target SDK version 35

### iOS Development
- Uses xcodebuild with CapacitorUnityAds scheme
- SwiftLint configuration from @ionic/swiftlint-config
- **Note**: iOS implementation appears incomplete - UnityadsPlugin.swift only has placeholder echo method

## Plugin Interface

The plugin exposes these main methods through the UnityAdsPlugin interface:
- `initialize()` - Initialize Unity Ads with game ID and optional test mode
- `loadRewardedVideo()` / `showRewardedVideo()` - Rewarded video ad management
- `loadInterstitial()` / `showInterstitial()` - Interstitial ad management
- `isRewardedVideoLoaded()` / `isInterstitialLoaded()` - Check ad loading status
- `setTestMode()` - Toggle test mode
- `getVersion()` - Get Unity Ads SDK version

## Build Configuration

- TypeScript compilation outputs to `dist/esm/`
- Rollup bundles create `dist/plugin.js` (IIFE) and `dist/plugin.cjs.js` (CommonJS)
- Uses strict TypeScript settings with ES2017 target
- ESLint extends @ionic/eslint-config/recommended
- Prettier uses @ionic/prettier-config with Java plugin support