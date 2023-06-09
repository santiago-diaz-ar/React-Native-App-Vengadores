import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import Comic from "../Comic/Cominc";
import apiParams from "../../config";
import axios from "axios";
import { useState, useEffect } from "react";

const Commics = ({ listComics }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;

  useEffect(() => {
    const promisesArray = listComics.map((c) =>
      axios.get(c.resourceURI, {
        params: {
          ts,
          apikey,
          hash,
        },
      })
    );

    Promise.all(promisesArray)
      .then((responses) =>
        setData(responses.map((r) => r?.data?.data?.results[0]))
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        data.map((c) => (
          <Comic
            key={c.id}
            name={c.title}
            image={`${c?.thumbnail?.path}.${c.thumbnail.extension}`}
          />
        ))
      )}
    </ScrollView>
  );
};
export default Commics;
