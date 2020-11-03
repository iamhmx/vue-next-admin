const getters = {
	name: (state) => state.user.name,
	roles: (state) => state.user.roles,
	permission_routes: (state) => state.permission.routes
}
export default getters
