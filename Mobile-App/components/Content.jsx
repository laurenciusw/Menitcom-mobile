import React, { useRef, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Content({ data, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  if (data.length === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        <Text style={{ color: "black", height: 100 }}>
          There is no content yet...
        </Text>
      </View>
    );
  }

  const mainCard = data.findPosts[0];

  return (
    <ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.push("Detail", { id: mainCard.id })}
        >
          <ImageBackground
            source={{ uri: mainCard.imgUrl }}
            style={styles.cardBox}
          >
            <View style={styles.textContainer}>
              <Text style={styles.imageTitle}>{mainCard.title}</Text>
              <Text style={styles.detail}>
                {mainCard.content.split(" ").slice(0, 10).join(" ")}...
              </Text>
              <Text style={styles.author}>
                {mainCard.User.email} IN {mainCard.Category.name}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {data.findPosts.map((post, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rowContent}
            onPress={() => navigation.push("Detail", { id: post.id })}
          >
            <View style={styles.rowCard}>
              <View style={{ flex: 1 }}>
                <View style={styles.rowCardImageContainer}>
                  <Image source={{ uri: post.imgUrl }} style={{ flex: 1 }} />
                </View>
              </View>
              <View key={index} style={styles.rowCardDetailContainer}>
                <Text style={styles.rowCardTitle}>
                  {post.title.split(" ").slice(0, 6).join(" ")}...
                </Text>
                <Text style={styles.rowCardAuthor}>
                  {post.User.username || post.User.email}
                </Text>
                <Text>Category: {post.Category.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: "center",
    height: 25,
    width: 80,
    marginBottom: 6,
  },
  cardContainer: {
    flex: 1,
    padding: 6,
    paddingTop: 12,
  },
  cardBox: {
    width: "100%",
    height: 550,
    borderRadius: 20,
    overflow: "hidden",
  },

  rowContent: {
    padding: 6,
    margin: 15,
    width: "100%",
    alignSelf: "center",
  },
  rowCard: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  rowCardImageContainer: {
    height: 125,
    width: 125,
    backgroundColor: "white",
  },
  rowCardDetailContainer: {
    flex: 2,
    gap: 12,
    paddingHorizontal: 12,
    paddingLeft: 16,
    paddingTop: 2,
  },
  rowCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 34,
  },
  rowCardAuthor: {
    fontSize: 15,
  },
  textContainer: {
    padding: 20,
    gap: 20,
  },
  imageTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  author: {
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "monospace",
    color: "white",
    marginBottom: 12,
  },
  detail: {
    color: "white",
  },
});
