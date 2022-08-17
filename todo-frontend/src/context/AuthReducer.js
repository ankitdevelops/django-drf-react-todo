const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				authToken: action.payload.token,
			};
		case "SIGNUP":
			return {
				...state,
				is_authenticated: true,
			};
		default:
			return state;
	}
};

export default authReducer;
