import { useState, useEffect } from "react";
import supabase from "../backend/createSupaClient";

export const useIsOnline = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            const online = navigator.onLine;
            setIsOnline(online);
            console.log("Network status changed:", online);
        };

        document.addEventListener("online", updateOnlineStatus);
        document.addEventListener("offline", updateOnlineStatus);

        const pollInterval = setInterval(() => {
            const currentStatus = navigator.onLine;
            setIsOnline(prev => {
                if (prev !== currentStatus) {
                    console.log("Network polled status changed:", currentStatus);
                }
                return currentStatus;
            });
        }, 1000);

                async function syncDataToDatabase(){
            for (let i = 0; i < localStorage.length ?? 0; i++) {
                const raw = localStorage.getItem(localStorage.key(i));
                if (!raw) continue;
            
                let item;
                try {
                  item = JSON.parse(raw);
                } catch (e) {
                  console.warn(`Skipping malformed localStorage entry at index ${i}`);
                  continue;
                }

                console.log(item)
            
                const { data, error } = await supabase
                  .from("Highscores")
                  .select("score")
                  .order("score", { ascending: false })
                  .limit(10);
                if(error){
                  console.log("error fetching data")
                }
            
                if(item.score < data.Highscore){
                  if (item?.name && typeof item.score === "number") {
                    const { error } = await supabase
                      .from("Highscores")
                      .insert({ name: item.name, score: item.score });
                
                    if (error) {
                      console.error("Failed to sync item to Supabase", error.message);
                    }
                  }
                }
            }     
        }

        return () => {
            document.removeEventListener("online", updateOnlineStatus);
            document.removeEventListener("offline", updateOnlineStatus);
            clearInterval(pollInterval);
        };
    }, []);

    return isOnline;
};
