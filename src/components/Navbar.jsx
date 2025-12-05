import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const [searchText, setSearchText] = useState("")
	const [suggestions, setSuggestions] = useState([])

	const favorites = store.favorites

	const unFavorited = (itemId) => {

		const unFavoritedItem = favorites.find(item => item.id === itemId)

		dispatch({
			type: "item_unfavorited",
			payload: { favorites: unFavoritedItem }
		})
	}

	const handleChange = (e) => {
		const value = e.target.value
		setSearchText(value)

		if (value.length > 0) {
			const lowerCaseValue = value.toLowerCase()

			const Suggestions = store.search.filter(item => item.name.includes(lowerCaseValue))

			setSuggestions(Suggestions)
		} else {
			setSuggestions([])
		}
	}

	const handleClick = (item) => {
		setSearchText(item.name)
		setSuggestions([])
		navigate(`/properties/${item.class}/${item.id}`);
	}

	const SuggestionList = () => {
		if (suggestions.length === 0) {
			return null
		}

		return (
			<div className="autocompleteItems" >
				{suggestions.map((item, index) => {

					return (
						<div
							key={index}
							className="Suggestions"
							onClick={() => handleClick(item)}
						>
							{item.name}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/">
					<img style={{ maxHeight: "40px", }} src="https://freepngimg.com/save/23290-star-wars-logo-file/1600x738"
						alt="Star Wars" />
				</Link>
				<div className="input-group searchContainer" style={{ width: "250px", position: "relative" }}>
					<span class="input-group-text" id="basic-addon1">
						<i className="fa-solid fa-magnifying-glass"></i>
					</span>
					<input
						type="text"
						className="form-control"
						placeholder="Search wiki"
						id="searchInput"
						value={searchText}
						onChange={handleChange}
					/>
					<SuggestionList />
				</div>
				<div className="dropdown">
					<button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites <span className="badge text-bg-light">{favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-dark">
						{store && favorites.length > 0 ? favorites.map((item) => (
							<li key={item.id} className="d-flex justify-content-between">
								<Link to={`/properties/${item.class}/${item.id}`}>
									<button className="btn text-light">{item.name}</button>
								</Link>
								<i class="fa-solid fa-trash text-danger p-2"
									onClick={() => unFavorited(item.id)}></i>
							</li>
						)) : <p className="text-center m-0">No favorites</p>}
					</ul>
				</div>
			</div>
		</nav>
	);
};