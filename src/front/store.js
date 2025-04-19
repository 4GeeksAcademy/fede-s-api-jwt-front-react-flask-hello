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
      },
    ],
    users: [],
    logged_users: [],
    new_user: [],
  };
};


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "logged_in":
      const email = action.payload;

      return {
        ...store,
        logged_users: [...store.logged_users, email],
      };

      case "signup":

      return {
        ...store,
        new_user: [...store.new_user, action.payload.user],
      };

    case "get_users":
      const users = action.payload;

      return {
        ...store,
        users: store.users
      };

    default:
      throw Error("Unknown action.");
  }
}

