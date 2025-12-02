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
    vehicles: []
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
   
    default:
      throw Error('Unknown action.');
  }
}
