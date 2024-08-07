import axios from "axios";
import { useEffect, useState } from "react";
import Anime from "./Anime";


function Animes() {
  //the fetching code will not exist in the actual assessment
  //fellows will be required to import useState and useEffect to perfomr fetch. Presumably they should use fetch over axios
  //Question: should components be provided given the time constraints
  //what kind of css should they be required to do?

  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/animes`)
      .then((response) => {
        setAnimes(response.data);
      })
      .catch((err) => console.warn("catch", err));
  }, []);
  // empty view
  return (
    <section className="index" id='anime-list'>
      {/* Add anime list here */}
        {animes.length > 0 &&
          animes.map((anime) => {
            return (
              <Anime
                key={crypto.randomUUID()}
                name={anime.name}
                description={anime.description}
              />
            );
          })}
    </section>
  );
}

export default Animes;
