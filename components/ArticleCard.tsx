import { View, Text, Image } from "react-native";
import { Article } from "@/constants/article.interface";
import { Link } from "expo-router";

export default function ArticleCard({
  article,
  isRead,
  markAsRead,
}: {
  article: Article;
  isRead: boolean;
  markAsRead: (url: string) => void;
}) {
  return (
    <Link
      href={{
        pathname: "/article",
        // Params are automatically serialized
        params: {
          title: article.title,
          url: article.url,
        },
      }}
      onPress={() => markAsRead(article.url)}
    >
      <View
        style={{
          flex: 1,
          marginBottom: 16,
          paddingVertical: 8,
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            marginTop: 8,
            backgroundColor: "lightgrey",
          }}
          source={{ uri: article.urlToImage }}
        />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: 500, color: "grey" }}>
            {article.source?.name.toLocaleUpperCase()}
          </Text>
          <Text
            style={{ fontWeight: 600, color: isRead ? "#aaaaaa" : "black" }}
          >
            {article.title}
          </Text>
          <Text style={{ color: isRead ? "#bbbbbb" : "grey" }}>
            {article.description}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 500,
              marginTop: 8,
              color: isRead ? "#aaaaaa" : "black",
            }}
          >
            {article.publishedAt}
          </Text>
        </View>
      </View>
    </Link>
  );
}
