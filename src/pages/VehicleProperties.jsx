import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const VehicleProperties = () => {

    const { store, dispatch } = useGlobalReducer()
    const { vehicleId } = useParams();

    const findDetails = store.vehicles

    const vehiclesURL = `https://swapi.dev/api/vehicles/${vehicleId}/`

    const details = findDetails.find(vehicle => vehicle.url === vehiclesURL )

    return (
        <>
            <div className="container mt-5">
                <div className="card mb-3 w-100" style={{ height: "400px" }}>
                    <div className="row g-0">
                        <div className="col-md-7">
                            <img src={details.img_url}
                                className="img-fluid rounded-start" alt="..." style={{ height: "399px" }} />
                        </div>
                        <div className="col-md-5 text-center">
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
                            <th scope="col" className="border-end">Model</th>
                            <th scope="col" className="border-end">Vehicle Class</th>
                            <th scope="col" className="border-end">Manufacturer</th>
                            <th scope="col" className="border-end">Length</th>
                            <th scope="col" className="border-end">Cost in Credits</th>
                            <th scope="col" className="border-end">Passengers</th>
                            <th scope="col">Max Atmosphering Speed </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-end">{details.model}</td>
                            <td className="border-end">{details.vehicle_class}</td>
                            <td className="border-end">{details.manufacturer}</td>
                            <td className="border-end">{details.length}m</td>
                            <td className="border-end">{details.cost_in_credits}ᖬ</td>
                            <td className="border-end">{details.passengers}</td>
                            <td>{details.max_atmosphering_speed} MGLT</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};