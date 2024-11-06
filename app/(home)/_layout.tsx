import { StyleSheet } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";

import { OverlayProvider } from "stream-chat-expo";
import ChatProvider from "@/providers/ChatProvider";
import { useAuth } from "@/hooks/useAuth";

const HomeLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
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
