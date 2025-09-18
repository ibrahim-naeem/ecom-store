import { useEffect, useState } from "react";
import { UserContext } from "./userContext.js";
import { supabase } from "../database/supabase.js";

export const UserContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Fetch current session on mount
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserSession(data.session);
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUserSession(null);
        console.log("User signed out");
        localStorage.removeItem("user");
      }

      if (event === "SIGNED_IN" && session?.user) {
        setUserSession(session);
        const { id, email } = session.user;

        supabase
          .from("users")
          .upsert([{ id, email }], { onConflict: "id" })
          .select()
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error saving user:", error.message);
            } else {
              data?.role === "Admin" && setAdmin(true);
              localStorage.setItem("role", data?.role);
            }
          });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ userSession, setUserSession, loading, admin }}
    >
      {children}
    </UserContext.Provider>
  );
};
