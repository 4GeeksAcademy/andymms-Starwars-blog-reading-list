import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CharacterCard } from "../components/CharactersCard.jsx";
import { PlanetsCard } from "../components/PlanetsCard.jsx";
import { VehiclesCard } from "../components/VehiclesCard.jsx";
import { useEffect } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	/* CHARACTERS */

	async function FetchingCharacterDetails(character) {
		try {
			const characterDetails = await fetch(`${character.url}`)
			if (!characterDetails.ok) {
				throw new Error(`Error fetching details for ${character.name}: ${characterDetails.statusText}`);
			}
			const data = await characterDetails.json();

			return data.result.properties;

		} catch (error) {
			console.error(`Error finding the character: ${character.name}`, error)
		}
	}

	async function FetchingCharacterImages(character) {

		const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${character.uid}.jpg`;

		try {
			const response = await fetch(imageUrl, { method: 'HEAD' })

			if (!response.ok) {
				throw new Error(`Image not found or error status: ${response.status} ${response.statusText}`);
			}

			return imageUrl;

		} catch (error) {
			console.error(`Error finding the character's image: ${character.name}`, error);
		}
	}

	async function getPeople() {
		try {
			const characterSummary = await fetch("https://www.swapi.tech/api/people/")
			if (!characterSummary.ok) {
				throw new Error(`Error getting character ${characterSummary.statusText}`)
			}
			const data = await characterSummary.json();
			const SWcharactersSummary = data.results;

			const SWcharactersDetailsPromise = SWcharactersSummary.map(async (character) => {
				const details = await FetchingCharacterDetails(character);

				return { ...character, ...details };
			});

			const SWcharacterDetails = await Promise.all(SWcharactersDetailsPromise)

			const SWcharactersImagesPromise = SWcharacterDetails.map(async (character) => {
				const images = await FetchingCharacterImages(character);

				return {
					...character,
					img_url: images
				};
			});

			const SWcharacterWithImages = await Promise.all(SWcharactersImagesPromise)

			dispatch({
				type: "get_characters",
				payload: { characters: SWcharacterWithImages }
			})

		} catch (error) {
			console.error("Error finding the characters:", error)
		}
	}

	/* PLANETS */

	async function FetchingPlanetsDetails(planet) {
		try {
			const planetDetails = await fetch(`${planet.url}`)
			if (!planetDetails.ok) {
				throw new Error(`Error fetching details for ${planet.name}: ${planetDetails.statusText}`);
			}
			const data = await planetDetails.json();

			return data.result.properties;

		} catch (error) {
			console.error(`Error finding the planet: ${planet.name}`, error)
		}
	}

	async function FetchingPlanetsImages(planet) {

		const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/${planet.uid}.jpg`;

		try {
			const response = await fetch(imageUrl, { method: 'HEAD' })

			if (!response.ok) {
				throw new Error(`Image not found or error status: ${response.status} ${response.statusText}`);
			}

			return imageUrl;

		} catch (error) {
			console.error(`Error finding the planet's image: ${planet.name}`, error);
		}
	}

	async function getPlanets() {
		try {
			const planetSummary = await fetch("https://www.swapi.tech/api/planets/")
			if (!planetSummary.ok) {
				throw new Error(`Error getting planet ${planetSummary.statusText}`)
			}
			const data = await planetSummary.json();
			const SWplanetsSummary = data.results;

			const SWplanetsDetailsPromise = SWplanetsSummary.map(async (planet) => {
				const details = await FetchingPlanetsDetails(planet);

				return { ...planet, ...details };
			});

			const SWplanetDetails = await Promise.all(SWplanetsDetailsPromise)

			const SWplanetsImagesPromise = SWplanetDetails.map(async (planet) => {
				const images = await FetchingPlanetsImages(planet);

				return {
					...planet,
					img_url: images
				};
			});

			const SWplanetWithImages = await Promise.all(SWplanetsImagesPromise)

			dispatch({
				type: "get_planets",
				payload: { planets: SWplanetWithImages }
			})

		} catch (error) {
			console.error("Error finding the characters:", error)
		}
	}

	/* VEHICLES */

	async function FetchingVehiclesDetails(vehicle) {
		try {
			const vehicleDetails = await fetch(`${vehicle.url}`)
			if (!vehicleDetails.ok) {
				throw new Error(`Error fetching details for ${vehicle.name}: ${vehicleDetails.statusText}`);
			}
			const data = await vehicleDetails.json();

			return data.result;

		} catch (error) {
			console.error(`Error finding the vehicle: ${vehicle.name}`, error)
		}
	}

	async function FetchingVehiclesImages(vehicle) {

		const vehicleUrlSplit = vehicle.url.split('/')

		const vehicleId = vehicleUrlSplit[vehicleUrlSplit.length - 2]

		const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles/${vehicleId}.jpg`;

		try {
			const response = await fetch(imageUrl, { method: 'HEAD' })

			if (!response.ok) {
				throw new Error(`Image not found or error status: ${response.status} ${response.statusText}`);
			}

			return imageUrl;

		} catch (error) {
			console.error(`Error finding the vehicle's image: ${vehicle.name}`, error);
		}
	}

	async function getVehicles() {
		try {
			const vehicleSummary = await fetch("https://swapi.dev/api/vehicles/")
			if (!vehicleSummary.ok) {
				throw new Error(`Error getting vehicle ${vehicleSummary.statusText}`)
			}
			const data = await vehicleSummary.json();
			const SWvehiclesSummary = data.results;

			const SWvehiclesDetailsPromise = SWvehiclesSummary.map(async (vehicle) => {
				const details = await FetchingVehiclesDetails(vehicle);

				return { ...vehicle, ...details };
			});

			const SWvehicleDetails = await Promise.all(SWvehiclesDetailsPromise)

			const SWvehiclesImagesPromise = SWvehicleDetails.map(async (vehicle) => {
				const images = await FetchingVehiclesImages(vehicle);

				return {
					...vehicle,
					img_url: images
				};
			});

			const SWvehicleWithImages = await Promise.all(SWvehiclesImagesPromise)

			dispatch({
				type: "get_vehicles",
				payload: { vehicles: SWvehicleWithImages }
			})

		} catch (error) {
			console.error("Error finding the characters:", error)
		}
	}

	useEffect(() => {
		if (store.characters.length === 0) {
			getPeople()
		}
	}, [store.characters.length]);

	useEffect(() => {
		if (store.planets.length === 0) {
			getPlanets()
		}
	}, [store.planets.length]);

	useEffect(() => {
		if (store.vehicles.length === 0) {
			getVehicles()
		}
	}, [store.vehicles.length]);


	return (
		<div className="container mt-5">
			<h1 className="text-danger"><b>Characters</b></h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto">
				{store && store.characters?.map((character, index) => (
					<div key={index} className="col-3 mx-3">
						<CharacterCard {...character} />
					</div>
				))}
			</div>
			<h1 className="text-primary mt-5"><b>Planets</b></h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto">
				{store && store.planets?.map((planet, index) => (
					<div key={index} className="col-3 mx-3">
						<PlanetsCard {...planet} />
					</div>
				))}
			</div>
			<h1 className="text-warning mt-5"><b>Vehicles</b></h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto mb-5">
				{store && store.vehicles?.map((vehicle, index) => (
					<div key={index} className="col-3 mx-3">
						<VehiclesCard {...vehicle} />
					</div>
				))}
			</div>
		</div>
	);
}; 