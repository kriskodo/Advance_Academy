import React from 'react';
import "./Movie.css";
import {MDBBtn, MDBBtnGroup} from "mdb-react-ui-kit";
import {useNavigate} from "react-router";

function Movie({id, description, rating, title, youtubeId, comments, posterUrl}) {
    const navigate = useNavigate();

    return (
        <div className="movie">
            <img src={posterUrl} style={{maxWidth: "500px", maxHeight: "500px"}} alt="poster"/>
            <h2>{title}</h2>

            <p>{description}</p>

            <p>{rating}</p>

            <MDBBtnGroup>
                <MDBBtn onClick={() => navigate(`/movies/${id}`, {
                    state: {
                        id: id,
                        description: description,
                        rating: rating,
                        title: title,
                        youtubeId: youtubeId,
                        comments: comments,
                        posterUrl: posterUrl
                    }
                })}>Edit</MDBBtn>
            </MDBBtnGroup>

            {/*<iframe width="420" height="315"*/}
            {/*        src={`https://www.youtube.com/embed/${youtubeId}`}>*/}
            {/*</iframe>*/}
        </div>
    );
}

export default Movie;
