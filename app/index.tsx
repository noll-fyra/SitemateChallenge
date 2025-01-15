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
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  const fetchTopHeadlines = () => {
    setIsSearching(true);
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (res) =>
          res.articles &&
          setArticles(
            // hide any removed articles
            res.articles.filter((a: Article) => !a.url.includes("removed.com"))
          )
      )
      .catch((err) => console.error(err))
      .finally(() => setIsSearching(false));
  };

  const fetchHeadlinesByQuery = () => {
    const earliestDate = "2025-01-01";
    const sortBy = "publishedAt";

    setIsSearching(true);
    fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=${earliestDate}&sortBy=${sortBy}&language=en&apiKey=${NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (res) =>
          res.articles &&
          setArticles(
            // hide any removed articles
            res.articles.filter((a: Article) => !a.url.includes("removed.com"))
          )
      )
      .catch((err) => console.error(err))
      .finally(() => setIsSearching(false));
  };

  const onSearch = () => {
    if (!query) {
      fetchTopHeadlines();
    } else {
      fetchHeadlinesByQuery();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <TextInput
          onSubmitEditing={onSearch}
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

      {isSearching && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 8,
          }}
        >
          <Text>Fetching articles...</Text>
        </View>
      )}

      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={(item) =>
          item.url.concat(item.publishedAt).concat(item.title)
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
