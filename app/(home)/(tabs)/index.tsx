import React from "react";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";

export default function MainTabScreen() {
  return <ChannelList onSelect={(chn) => router.push(`/channel/${chn.cid}`)} />;
}
