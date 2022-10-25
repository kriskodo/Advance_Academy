import React, {memo, useEffect, useState} from 'react';
import Movie from "../Movie/Movie";
import apiMovies from "../../api/movies";
import {MDBInput} from "mdb-react-ui-kit";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiMovies.getAll();
            if (isLoading) {
                setMovies(response);
            }
        }

        fetchData();
        console.log("fetched movies");

        return () => {
            setIsLoading(false);
        }
    }, [isLoading]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <MDBInput type="text" value={search} onChange={handleSearch} placeholder="Search for a movie"/>

            <div style={{maxWidth: "800px", margin: "auto", padding: "20px"}}>
                {isLoading ?
                    <div>Loading</div> :
                    movies.filter(x => x.title.toLowerCase().includes(search)).map(movie => (
                        <div key={movie.id}>
                            <Movie {...movie} />
                        </div>
                    ))
                }
            </div>

        </>
    );
}


// Should I?
export default memo(Movies);
