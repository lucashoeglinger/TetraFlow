import { useState, useEffect } from "react";
import supabase from "../backend/createSupaClient";
import { useIsOnline } from "./useIsOnline";

export function useGetHighscores() {
    const [highscores, setHighscores] = useState([]);
    const [error, setError] = useState(null);
    const isOnline = useIsOnline();

    useEffect(() => {
        if (!isOnline) {
            setHighscores([]);
            return;
        }

        const fetchHighscores = async () => {
            try {
                const { data, error } = await supabase
                    .from("Highscores")
                    .select("name, score")
                    .order("score", { ascending: false })
                    .limit(10);

                if (error) throw error;
                if (!data) throw new Error("No data returned");

                setHighscores(data);
            } catch (err) {
                console.error("Error fetching highscores:", err);
                setError(err.message);
                setHighscores([]);
            }
        };

        fetchHighscores();
    }, [isOnline]);

    return [highscores, error];
}
