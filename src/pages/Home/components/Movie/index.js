import { useState, useEffect } from "react";
import characterHeaders from "./characterHeaders";
import Table from "../../../../components/Table";
import DownArrow from "../../../../assets/icons/down-arrow.svg";
import axios from "axios";
import "./_index.scss";

const GENDERS = ["All", "Male", "Female", "Hermaphrodite", "Unknown"];

const Movie = ({ movie }) => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("Filter by");
    const [loading, setLoading] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [sorting, setSorting] = useState("asc");

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
        if (filteredCharacters.length) {
            return filteredCharacters.reduce(
                (acc, curr) =>
                    acc + Number(curr.height === "unknown" ? 0 : curr.height),
                0
            );
        }

        return characters.reduce(
            (acc, curr) =>
                acc + Number(curr.height === "unknown" ? 0 : curr.height),
            0
        );
    };

    const toFeet = (value) => {
        return Math.round(value * 0.0328084);
    };

    const sortCharacters = ({ key }) => {
        if (filteredCharacters.length) {
            setFilteredCharacters(() => {
                return [...filteredCharacters].sort((a, b) => {
                    if (sorting === "asc") return a[key] < b[key] ? -1 : 1;
                    return a[key] > b[key] ? -1 : 1;
                });
            });
        }

        if (!filteredCharacters.length) {
            setCharacters(() => {
                return [...characters].sort((a, b) => {
                    if (sorting === "asc") return a[key] < b[key] ? -1 : 1;
                    return a[key] > b[key] ? -1 : 1;
                });
            });
        }

        if (sorting === "asc") {
            setSorting("desc");

            return;
        }
        setSorting("asc");
    };

    const filterByGender = (gender) => {
        setSelectedFilter(gender);
        setFilterActive(false);
        if (gender === "All") {
            setFilteredCharacters([]);

            return;
        }

        if (gender === "Unknown") {
            setFilteredCharacters(() => {
                return [...characters].filter(
                    (character) => character.gender.toLowerCase() === "n/a"
                );
            });

            return;
        }

        setFilteredCharacters(() => {
            return [...characters].filter(
                (character) =>
                    character.gender.toLowerCase() === gender.toLowerCase()
            );
        });
    };

    useEffect(() => {
        fetchCharacters();
        //eslint-disable-next-line
    }, [movie]);

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
            <p className="mb-2">{movie.opening_crawl}</p>

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
                <div className="flex justify-between items-center movie__characters-header">
                    <p className="fw-600 fs-18">Characters</p>
                    {!loading && (
                        <div className="dropdown">
                            <div
                                tabIndex={-1}
                                onClick={() =>
                                    setFilterActive((prevState) => !prevState)
                                }
                                onBlur={() => setFilterActive(false)}
                                className="dropdown__button cursor-pointer"
                            >
                                <span className="text-white">
                                    {selectedFilter}
                                </span>
                                <div>
                                    <img src={DownArrow} alt="down-arrow" />
                                </div>
                            </div>
                            <div
                                className={`dropdown__options${
                                    filterActive ? " active" : ""
                                }`}
                            >
                                {GENDERS.map((gender, key) => (
                                    <p
                                        key={key}
                                        onClick={() => filterByGender(gender)}
                                        className="dropdown__options-item"
                                    >
                                        {gender}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Table
                    loading={loading}
                    tableData={
                        filteredCharacters.length
                            ? filteredCharacters
                            : characters
                    }
                    headers={characterHeaders}
                    sortRows={sortCharacters}
                >
                    {(row) => (
                        <>
                            <td>{row.name}</td>
                            <td className="text-capitalize">{row.gender}</td>
                            <td>{row.height}cm</td>
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
