import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const CharacterCard = (props) => {

    const { store, dispatch } = useGlobalReducer()

    const isCharacterFavorited = store.favorites.some(
        (fav) => fav.name === props.name
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
            <div className="card mb-4 text-bg-dark" style={{ width: "18rem" }}>
                <img src={props.img_url}
                    className="card-img-top" alt={props.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">
                        Gender: {props.gender} <br />
                        Height: {props.height}cm <br />
                        Skin color: {props.skin_color}
                    </p>
                    <div className="d-flex justify-content-between">
                        <Link to={"/properties/character/" + props.uid}>
                            <button className="btn btn-success">Learn more</button>
                        </Link>
                        <button className={`btn ${buttonClass} favorite`}
                            onClick={() => HandleFavoriteToggle(props.name, props.uid)}>
                            <i className={isCharacterFavorited ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};