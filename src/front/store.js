const apiUrl = import.meta.env.VITE_BACKEND_URL;

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
    token: null,
    user: {},
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

    case "login_success":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "signup_success":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "getUsers_success":
      return {
        ...store,
        users: action.payload.users,
      };

    default:
      throw Error("Unknown action.");
  }
}

export const login = async (email, password, dispatch) => {
  try {
    const resp = await fetch(`${apiUrl}api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.msg || "Error de autenticación");

    dispatch({
      type: "login_success",
      payload: { token: data.access_token, user: data.email },
    });
    localStorage.setItem("token", data.access_token);
    return true;
  } catch (error) {
    console.error("No se pudo ingresar: ", error);
    return false;
  }
};

export const signup = async (name, email, password, dispatch) => {
  try {
    const resp = await fetch(`${apiUrl}api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.msg || "Error de registro");

    dispatch({
      type: "signup_success",
      payload: { token: data.access_token, user: data.user },
    });
    localStorage.setItem("token", data.access_token);

    return true;
  } catch (error) {
    console.error("No se pudo registrar: ", error);
  }
};

export const getUsers = async (dispatch) => {
  try {
    const resp = await fetch(`${apiUrl}api/private`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    if (!resp.ok) throw new Error(data.msg || "Error al obtener los datos");

    dispatch({
      type: "getUsers_success",
      payload: { users: data.users },
    });

    return true;
  } catch (error) {
    console.error("No se pudo recuperar los datos: ", error);
  }
};
