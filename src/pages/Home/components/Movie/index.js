import { useState, useEffect } from "react";
import "./_index.scss";
import Table from "../../../../components/Table";
import characterHeaders from "./characterHeaders";
import axios from "axios";

const Movie = ({ movie }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCharacters = async () => {
        try {
            setLoading(true);
            const response = await Promise.all(
                movie.characters.map((character) => axios.get(character))
            );
            setCharacters(response.map((character) => character.data));
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
    };

    const totalCharactersHeight = () => {
        return characters.reduce(
            (acc, curr) =>
                acc + Number(curr.height === "unknown" ? 0 : curr.height),
            0
        );
    };

    const toFeet = (value) => {
        return Math.round(value * 0.0328084);
    };

    useEffect(() => {
        fetchCharacters();
    }, [movie]);

    useEffect(() => {
        console.log(characters);
    }, [characters]);
    return (
        <div className="movie">
            <div className="movie__heading">
                <h2 className="fw-700 fs-18 mb-2 text-white ">
                    Episode {movie.episode_id}
                </h2>
                <p className="fs-12">
                    Released on {new Date(movie.created).toLocaleDateString()}
                </p>
            </div>
            <p className="fw-600 fs-30">{movie.title}</p>
            <p class="mb-2">{movie.opening_crawl}</p>

            <p>
                <i className="fs-12 fw-400 text-white">
                    <span className="fw-600">Director:</span> {movie.director},
                    &nbsp;
                </i>
                <i className="fs-12 fw-400 text-white">
                    <span className="fw-600">Producer:</span> {movie.producer}
                </i>
            </p>

            <div className="movie__characters">
                <p className="fw-600 fs-18 title">Characters</p>
                <Table
                    loading={loading}
                    tableData={characters}
                    headers={characterHeaders}
                >
                    {(row) => (
                        <>
                            <td>{row.name}</td>
                            <td className="text-capitalize">{row.gender}</td>
                            <td>{row.height}</td>
                        </>
                    )}
                </Table>
                {!loading && (
                    <div className="flex movie__total fs-20">
                        <p>
                            <span className="fw-600 text-white">
                                Total height:
                            </span>{" "}
                            {totalCharactersHeight()}cm /
                            {toFeet(totalCharactersHeight())}ft
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movie;
