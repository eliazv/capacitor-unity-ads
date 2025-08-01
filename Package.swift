// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorUnityAds",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorUnityAds",
            targets: ["UnityadsPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "UnityadsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/UnityadsPlugin"),
        .testTarget(
            name: "UnityadsPluginTests",
            dependencies: ["UnityadsPlugin"],
            path: "ios/Tests/UnityadsPluginTests")
    ]
)