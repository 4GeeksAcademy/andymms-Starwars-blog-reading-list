import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const PlanetProperties = () => {

    const { store, dispatch } = useGlobalReducer()
    const { planetId } = useParams();

    const details = store.planets[planetId - 1]

    return (
        <>
            <div className="container mt-5">
                <div className="card mb-3 w-100" style={{ height: "400px" }}>
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img src={details.img_url}
                                className="img-fluid rounded-start" alt="..." style={{ height: "399px" }} />
                        </div>
                        <div className="col-md-7 text-center">
                            <div className="card-body me-5">
                                <h5 className="card-title fs-1">{details.name}</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-borderless text-center text-danger">
                    <thead>
                        <tr>
                            <th scope="col" className="border-end">Climate</th>
                            <th scope="col" className="border-end">Terrain</th>
                            <th scope="col" className="border-end">Gravity</th>
                            <th scope="col" className="border-end">Orbital Period</th>
                            <th scope="col" className="border-end">Population</th>
                            <th scope="col" className="border-end">Diameter</th>
                            <th scope="col">Rotation Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-end">{details.climate}</td>
                            <td className="border-end">{details.terrain}</td>
                            <td className="border-end">{details.gravity} Gs</td>
                            <td className="border-end">{details.orbital_period} days</td>
                            <td className="border-end">{details.population}</td>
                            <td className="border-end">{details.diameter}km</td>
                            <td>{details.rotation_period} hours</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};