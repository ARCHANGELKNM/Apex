import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

const configuredUrl = process.env.EXPO_PUBLIC_WEB_URL?.trim();
let siteUrl = null;
let configurationError = null;

if (!configuredUrl) {
  configurationError =
    "Set EXPO_PUBLIC_WEB_URL to the HTTP or HTTPS address of your website.";
} else {
  try {
    const parsedUrl = new URL(configuredUrl);
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      configurationError = "EXPO_PUBLIC_WEB_URL must use HTTP or HTTPS.";
    } else {
      siteUrl = parsedUrl.href;
    }
  } catch {
    configurationError =
      "EXPO_PUBLIC_WEB_URL must be a valid absolute HTTP or HTTPS URL.";
  }
}

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (Platform.OS !== "android" || !siteUrl) {
      return undefined;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!canGoBack) {
          return false;
        }

        webViewRef.current?.goBack();
        return true;
      },
    );

    return () => subscription.remove();
  }, [canGoBack]);

  function retryLoading() {
    setLoadError(null);
    setIsLoading(true);
    setReloadKey((key) => key + 1);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      {siteUrl ? (
        <>
          {loadError ? (
            <View style={styles.messageContainer}>
              <Text style={styles.eyebrow}>CONNECTION ISSUE</Text>
              <Text style={styles.title}>Can’t reach Apex</Text>
              <Text style={styles.body}>
                Check your internet connection and try loading the website
                again.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={retryLoading}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Try again</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <WebView
                key={reloadKey}
                ref={webViewRef}
                source={{ uri: siteUrl }}
                originWhitelist={["http://*", "https://*"]}
                javaScriptEnabled
                domStorageEnabled
                sharedCookiesEnabled
                thirdPartyCookiesEnabled
                allowsBackForwardNavigationGestures
                onNavigationStateChange={(navigation) =>
                  setCanGoBack(navigation.canGoBack)
                }
                onLoadStart={() => {
                  setIsLoading(true);
                  setLoadError(null);
                }}
                onLoadEnd={() => setIsLoading(false)}
                onError={({ nativeEvent }) => {
                  setIsLoading(false);
                  setLoadError(nativeEvent.description || "Page failed to load");
                }}
                style={styles.webView}
              />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={COLORS.ink} />
                  <Text style={styles.loadingText}>Loading Apex…</Text>
                </View>
              )}
            </>
          )}
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.eyebrow}>APP SETUP</Text>
          <Text style={styles.title}>Connect your website</Text>
          <Text style={styles.body}>{configurationError}</Text>
          <Text style={styles.hint}>
            Add the URL to mobile/.env, then restart Expo.
          </Text>
        </View>
      )}
    </View>
  );
}

const COLORS = {
  background: "#f5f0e9",
  ink: "#171411",
  muted: "#5f5245",
  gold: "#d7ba80",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  webView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 14,
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  messageContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  eyebrow: {
    marginBottom: 12,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  title: {
    marginBottom: 10,
    color: COLORS.ink,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
  },
  body: {
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  hint: {
    marginTop: 18,
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  button: {
    marginTop: 24,
    borderWidth: 2,
    borderColor: COLORS.ink,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "900",
  },
});
