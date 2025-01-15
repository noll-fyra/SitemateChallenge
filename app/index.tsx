import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/constants/article.interface";
import { NEWS_API_KEY } from "@/constants/constants";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   setArticles([]);
  // }, []);

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  const onSearch = () => {
    fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=2025-01-01&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (res) =>
          res.articles &&
          setArticles(
            res.articles.map((a: Article, index: number) => ({ ...a, index }))
          )
      )
      .catch((err) => console.error(err));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text>Articles</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={onChangeText}
          value={query}
          style={{
            flex: 1,
            height: 48,
            borderWidth: 1,
            padding: 10,
          }}
        />
        <TouchableOpacity
          onPress={onSearch}
          style={{
            width: 72,
            height: 48,
            backgroundColor: "rgb(46,129,218)",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={(item) =>
          item.url.concat(item.publishedAt).concat(item.title)
        }
      />
    </View>
  );
}
