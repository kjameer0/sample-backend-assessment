import axios from "axios";
import { useEffect, useState } from "react";
import Anime from "./Anime";

const API = process.env.REACT_APP_API_URL;

function Animes() {
    const [animes, setAnimes] = useState([]);
    useEffect(() => {
        axios.get(`${API}/animes`).then((response) => {
            setAnimes(response.data.payload);
            // console.log(response)
        }).catch((err) => console.warn("catch", err));

        // fetch()
    }, []);

    return (
        <section className="index">
            {/* <h1>Animes</h1> */}
            <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {animes.map((anime) => {
                                return <Anime anime={anime}/>
                            })}
                        </tbody>
            </table>
        </section>
    )
};

export default Animes;