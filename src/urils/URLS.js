const URLS = {
  register: { path: "/users/entry", version: "5.43" },
  users: { path: "/users", version: "5.43" },
  country: { path: "/country", version: 5.43 },
  state: { path: "/state", version: 5.43 }, // ?country_id=1
  city: { path: "/city", version: 5.43 }, //?country_id=1&state_id=1
  userType: { path: "/user-types?per_page=100", version: 5.43 },
};

export default URLS;
