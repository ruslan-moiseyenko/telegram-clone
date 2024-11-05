import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API ?? "");

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png"
        },
        client.devToken("jlahey")
      );
      setIsReady(true);

      // const channel = client.channel("messaging", "the_park", {
      //   name: "The Park"
      // });

      // await channel.watch();
    };

    connect();
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
