import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const VehiclesCard = (props) => {

    const { store, dispatch } = useGlobalReducer()

    const vehicleUrlSplit = props.url.split('/')

	const vehicleId = vehicleUrlSplit[vehicleUrlSplit.length - 2]

    console.log(props);

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src={props.img_url}
                    className="card-img-top" alt={props.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">
                        Cost in credits: {props.cost_in_credits} ᖬ <br />
                        Cargo capacity: {props.cargo_capacity} <br />
                    </p>
                    <div className="d-flex justify-content-between">
                        <Link to={"/properties/vehicle/" + vehicleId}>
                            <button className="btn btn-success">Learn more</button>
                        </Link>
                        <button className="btn btn-outline-warning"><i className="fa-regular fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
};