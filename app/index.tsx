import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [articles, setArticles] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setArticles(["hello"]);
  }, []);

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  const onSearch = () => {
    console.log("hey");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Articles</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
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
      {articles.map((art) => (
        <View>
          <Text>{JSON.stringify(art)}</Text>
        </View>
      ))}
    </View>
  );
}
