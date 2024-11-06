import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      try {
        let { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id)
          .single();

        setProfile(data ?? {});
      } catch (error) {
        console.log("🚀 ~ fetchProfile ~ error:", error);
      }
    };

    fetchProfile();
  }, [session?.user.id]);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user || null, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
