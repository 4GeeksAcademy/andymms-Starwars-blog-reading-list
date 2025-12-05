export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [],
    search: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'get_characters':

      return {
        ...store,
        characters: action.payload.characters
      };

    case 'get_planets':

      return {
        ...store,
        planets: action.payload.planets
      };

    case 'get_vehicles':

      return {
        ...store,
        vehicles: action.payload.vehicles
      };

    case "item_favorited":

      const newFavorite = action.payload.favorites;

      const isDuplicate = store.favorites.some(
        (item) => item.id === newFavorite.id
      );

      if (isDuplicate) {
        return store;
      }

      return {
        ...store,
        favorites: [...store.favorites, action.payload.favorites]
      };

    case "item_unfavorited":

      const itemToRemove = action.payload.favorites;

      return {
        ...store,
        favorites: store.favorites.filter(
          (item) => item.id !== itemToRemove.id
        )
      };

    case 'get_names_for_search':

      return {
        ...store,
        search: action.payload.search
      };

    default:
      throw Error('Unknown action.');
  }
}
