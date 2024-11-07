import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { UserListItem } from "@/components/UserListItem";

const UsersScreen = () => {
  const [users, setUsers] = useState<any[] | null>([]);

  const { user } = useAuth();

  useEffect(() => {
    const getProfiles = async () => {
      try {
        let { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .neq("id", user?.id);

        setUsers(profiles);
      } catch (error) {
        console.error("🚀 ~ getProfiles ~ error:", error);
      }
    };

    getProfiles();
  }, []);

  return (
    <FlatList
      data={users}
      contentContainerStyle={{ width: "100%", gap: 5 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UsersScreen;
