import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { ScrollView, View, Text, Image } from "react-native";

export default function ArticleScreen() {
  // Get the params from the URL
  const params = useLocalSearchParams<{
    title: string;
    url: string;
  }>();

  return <WebView style={{ flex: 1 }} source={{ uri: params.url }} />;
}
