const URLS = {
  // user
  register: { path: "/users/entry", version: "5.43" },
  users: { path: "/users", version: "5.43" },
  country: { path: "/country", version: 5.43 },
  state: { path: "/state", version: 5.43 }, // ?country_id=1
  city: { path: "/city", version: 5.43 }, //?country_id=1&state_id=1
  userType: { path: "/user-types?per_page=100", version: 5.43 },

  // vendor
  vendors: { path: "/users/?user_type_id=8", version: "5.43" },
  vendorUsers: { path: "/users/details?user_id=", version: "5.43" },

  // vendor Details
  vendorDetails: { path: "/user-details?user_id=", version: "5.43" },
  addVendorDetails: { path: "/user-details/entry", version: "5.43" },
  vendorAsset: { path: "/asset-types", version: 5.43 },

  // questions
  questions: { path: "/questions", version: "5.43" },
  questionsEntry: { path: "/questions/entry", version: "5.43" },

  // Assets
  assetQuestions: { path: "/questions?asset_type_id=", version: "5.43" },
  assetTypes: { path: "/asset-types", version: 5.43 },
  assetTypeEntry: { path: "/asset-types/entry", version: 5.43 },

  // monitoring
  monitoring: { path: "/monitoring", version: 5.43 },
};

export default URLS;
