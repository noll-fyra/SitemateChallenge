import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/constants/article.interface";
import { NEWS_API_KEY, sitemateBlue } from "@/constants/constants";
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
  const [read, setRead] = useState<string[]>([]);

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

  const markAsRead = (url: string) => {
    setRead(read.concat(url));
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
          placeholder="Search for news"
          clearButtonMode="always"
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
            backgroundColor: sitemateBlue,
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

      {!isSearching && articles.length === 0 && (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Text>No articles found</Text>
          <TouchableOpacity
            onPress={fetchTopHeadlines}
            style={{
              marginTop: 16,
              backgroundColor: sitemateBlue,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "white" }}>See latest headlines</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isRead={read.includes(item.url)}
            markAsRead={markAsRead}
          />
        )}
        keyExtractor={(item) =>
          item.url.concat(item.publishedAt).concat(item.title)
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
