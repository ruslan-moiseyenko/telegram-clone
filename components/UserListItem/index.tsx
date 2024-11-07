import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export function UserListItem({ user }: { user: any }) {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    const channel = client.channel("messaging", {
      members: [me?.id, user?.id] //to find specific chat with the current user and a selected one
    });

    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <Text>{user.full_name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: "lightblue"
  },
  text: {
    fontWeight: 600
  }
});
