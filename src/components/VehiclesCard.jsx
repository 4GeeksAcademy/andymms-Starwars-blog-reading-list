import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const VehiclesCard = (props) => {

    const { store, dispatch } = useGlobalReducer()

    const vehicleUrlSplit = props.url.split('/')

    const vehicleId = vehicleUrlSplit[vehicleUrlSplit.length - 2]

    const isCharacterFavorited = store.favorites.some(
        (fav) => fav.id === vehicleId
    );

    const addFavorite = (character, id) => {

        const itemToFavorite = {
            name: character,
            id: id,
            class: props.class
        }

        dispatch({
            type: "item_favorited",
            payload: { favorites: itemToFavorite }
        })
    }

    const HandleFavoriteToggle = (name, id) => {
        if (isCharacterFavorited) {

            const unFavoritedItem = store.favorites.find(item => item.id === id)

            dispatch({
                type: "item_unfavorited",
                payload: { favorites: unFavoritedItem }
            })
        } else if (!isCharacterFavorited) {
            addFavorite(name, id)
        }
    }

    const buttonClass = isCharacterFavorited ? "btn-warning" : "btn-outline-warning";

    return (
        <>
            <div className="card text-bg-dark" style={{ width: "18rem" }}>
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
                       <button className={`btn ${buttonClass} favorite`}
                            onClick={() => HandleFavoriteToggle(props.name, vehicleId)}>
                            <i className={isCharacterFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};