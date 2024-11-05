import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { OverlayProvider } from "stream-chat-expo";
import ChatProvider from "@/providers/ChatProvider";

const HomeLayout = () => {
  return (
    <OverlayProvider>
      <ChatProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ChatProvider>
    </OverlayProvider>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});
