import { useState, useEffect } from "react";
import supabase from "../backend/createSupaClient";

export function useGetHighscores() {
    const [highscores, setHighscores] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighscores = async () => {
            try {
                const { data, error } = await supabase
                    .from("Highscores")
                    .select("name, score")
                    .order("score", { ascending: false })
                    .limit(10);

                if (error) {
                    throw error;
                }

                setHighscores(data);
            } catch (err) {
                console.error("Error fetching highscores:", err);
                setError(err.message);
            }
        };

        fetchHighscores();
    }, []); 

    return [highscores, error];
}
