import { View, Text, Image } from "react-native";
import { Article } from "@/constants/article.interface";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 16,
        padding: 16,
        flexDirection: "row",
      }}
    >
      <Image
        style={{ width: 72, height: 72 }}
        source={{ uri: article.urlToImage }}
      />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={{ fontSize: 10, fontWeight: 500, color: "grey" }}>
          {article.source?.name.toLocaleUpperCase()}
        </Text>
        <Text style={{ fontWeight: 700 }}>{article.title}</Text>
        <Text style={{ color: "grey" }}>{article.description}</Text>
      </View>
    </View>
  );
}
