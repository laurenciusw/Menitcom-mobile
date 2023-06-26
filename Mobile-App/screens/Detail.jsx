import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params;

  const GET_POST_BY_ID = gql`
    query FindPostById($findPostByIdId: ID!) {
      findPostById(id: $findPostByIdId) {
        Category {
          name
        }
        User {
          email
        }
        content
        id
        imgUrl
        tags {
          name
        }
        title
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      findPostByIdId: id,
    },
  });

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
        <Text>Error bang</Text>
      </View>
    );
  }

  const post = data.findPostById;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentCategory}>{post.Category.name}</Text>
              <Text style={styles.contentTitle}>{post.title}</Text>
              <View
                style={{
                  width: "100%",
                  borderBottomWidth: 2,
                  borderBottomColor: "black",
                }}
              ></View>
              <Text style={styles.contentAuthor}>
                By <Text>{post.User.email}</Text>
              </Text>
            </View>
          </View>
          <Image source={{ uri: post.imgUrl }} style={styles.image} />
          <Text style={styles.content}>{post.content}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
  },
  card: {
    flex: 1,
    marginTop: 18,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 12,
    width: "100%",
  },
  contentCategory: {
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
    marginTop: 12,
    marginBottom: 8,
  },
  contentAuthor: {
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 12,
  },

  image: {
    height: 200,
    flex: 1,
    width: "100%",
    marginBottom: 12,
  },
  content: {
    padding: 12,
    color: "black",
  },
});
