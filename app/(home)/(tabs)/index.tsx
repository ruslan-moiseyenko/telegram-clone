import React from "react";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function MainTabScreen() {
  const { user } = useAuth();
  return (
    <ChannelList
      filters={{ members: { $in: [user?.id as string] } }}
      onSelect={(chn) => router.push(`/channel/${chn.cid}`)}
    />
  );
}
