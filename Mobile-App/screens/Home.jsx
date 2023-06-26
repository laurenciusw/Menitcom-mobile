import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import Content from "../components/Content";

const FETCH_POSTS = gql`
  query FindPosts {
    findPosts {
      id
      title
      imgUrl
      slug
      content
      Category {
        name
      }
      User {
        email
      }
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const { loading, data, error } = useQuery(FETCH_POSTS);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Something went wrong...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ backgroundColor: "white" }}>
          <Content data={data} navigation={navigation} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
