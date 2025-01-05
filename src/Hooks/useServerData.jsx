import { useEffect, useState } from "react";
import { SERVER_URL } from "../Configs/Config"; // Import the URL

function useServerData() {
  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await fetch(SERVER_URL);
        const data = await response.json();
        const attributes = data.data.attributes;
        setServerData({
          playerCount: attributes.players,
          maxPlayers: attributes.maxPlayers,
          ipAddress: attributes.ip,
          port: attributes.port,
          mods: attributes.details.modNames,
        });
      } catch (error) {
        console.error("Error fetching server data:", error);
      }
    };

    fetchServerData();
  }, []);

  return serverData;
}

export default useServerData;
