# Apex Tutor mobile app

This Expo app packages the existing Next.js site in a native iOS/Android
WebView. The site remains responsible for its pages, sign-in, and server APIs.

## Configure the website URL

From the `mobile` directory, copy `.env.example` to `.env` and set
`EXPO_PUBLIC_WEB_URL` to the website's absolute URL, for example
`https://apex.example.com`:

```powershell
Copy-Item .env.example .env
```

The URL must be reachable from the phone or emulator. For local development,
use your computer's LAN address instead of `localhost` when testing on a
physical phone.

Expo SDK 57 requires Node.js 20.19.4 or later.

## Run on a device

1. From the repository root, start the Next.js app:

   ```powershell
   cd apex
   npm run dev
   ```

2. In another terminal, start Expo:

   ```powershell
   cd apex\mobile
   npx expo start
   ```

3. Scan the QR code with Expo Go on a phone, or press `a` to launch an available
   Android emulator. The iOS simulator and local iOS builds require macOS.

Restart Expo after changing `.env`. Native release builds also need the
`EXPO_PUBLIC_WEB_URL` value set at build time. Use HTTPS for deployed builds.

## Share an installable app

The easiest first share is an Android preview APK. It creates a download link
that you can send to testers; they install the APK directly on Android. This
does not publish the app in Google Play.

1. Install Node.js 20.19.4 or later, create/sign in to a free account at
   [expo.dev](https://expo.dev), and open a terminal in `apex\mobile`.
2. Link the project to your Expo account once:

   ```powershell
   npx eas-cli@latest login
   npx eas-cli@latest build:configure
   ```

3. Add the website URL to EAS for cloud builds. It is public app configuration,
   not a secret:

   ```powershell
   npx eas-cli@latest env:set --name EXPO_PUBLIC_WEB_URL --value https://apex-zd6h.vercel.app/ --environment preview --visibility plaintext
   npx eas-cli@latest env:set --name EXPO_PUBLIC_WEB_URL --value https://apex-zd6h.vercel.app/ --environment production --visibility plaintext
   ```

4. Build the Android APK:

   ```powershell
   npx eas-cli@latest build --platform android --profile preview
   ```

5. When the build finishes, open its EAS build page and share the install link
   with Android testers. The link can be installed without Expo Go. Android may
   ask testers to allow installing apps from their browser.

### Sharing with iPhone users

For a small group of testers, use TestFlight: create an iOS production build,
upload it to App Store Connect, and invite testers there. External TestFlight
testing requires Apple's beta review. Alternatively, EAS internal iOS builds
are limited to registered device IDs, so they are usually less convenient for
sharing broadly.

For a public launch, submit the production build to Google Play and the Apple
App Store. This requires a Google Play developer account (one-time fee) and an
Apple Developer Program membership (annual fee). EAS can build from Windows;
you do not need a Mac to run a cloud iOS build.

`npx eas-cli@latest build --platform all --profile production` creates the
store builds. Upload them with EAS Submit or the store consoles, complete the
store listings, and send them for review. The store listings then provide
permanent links users can share to install the app.

The current native IDs in `app.json` are `com.apextutor.mobile`. Check that
these IDs are yours and available before the first store release; changing
them after publishing creates a different app. Since this app currently wraps
the website, App Store approval is not guaranteed: Apple may reject apps that
offer too little beyond a repackaged website.
