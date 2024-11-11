import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { tokenProvider } from "@/utils/tokenProvider";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API ?? "");

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    const connect = async () => {
      try {
        if (profile) {
          await client.connectUser(
            {
              id: profile?.id ?? "",
              name: profile?.full_name ?? "",
              image: supabase.storage
                .from("avatars")
                .getPublicUrl(profile?.avatar_url).data.publicUrl
            },
            tokenProvider
          );

          setIsReady(true);
        }
      } catch (error) {
        console.error("🚀 ~ connect ~ error:", error);
      }

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park"
      // });

      // await channel.watch();
    };

    connect();

    // return () => {
    //   client.disconnectUser();
    //   setIsReady(false);
    // };
  }, [profile?.id]);

  useEffect(() => {
    return () => {
      client.disconnectUser();
      setIsReady(false);
    };
  }, []);

  return !isReady ? (
    <ActivityIndicator />
  ) : (
    <Chat client={client}>{children}</Chat>
  );
}
