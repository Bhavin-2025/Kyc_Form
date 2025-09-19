// backend-mern\controllers\masterDataController.js

import MasterData from "../models/masterDataModel.js";

// @desc Get master data by type
// @route GET /api/master/:type
export const getMasterDataByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type) {
      return res.status(400).json({ message: "Type parameter is required" });
    }

    const data = await MasterData.find({ type });

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: `No data found for type: ${type}` });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get states by country
export const getStatesByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params;

    let statesData = [];

    // India
    if (countryCode === "india") {
      statesData = [
        { label: "Maharashtra", value: "maharashtra" },
        { label: "Karnataka", value: "karnataka" },
        { label: "Tamil Nadu", value: "tamil_nadu" },
        { label: "Gujarat", value: "gujarat" },
        { label: "Delhi", value: "delhi" },
      ];
    }
    // USA (only keep states with defined cities)
    else if (countryCode === "usa") {
      statesData = [
        { label: "California", value: "california" },
        { label: "Texas", value: "texas" },
        { label: "New York", value: "new_york" },
      ];
    }
    // UAE
    else if (countryCode === "uae") {
      statesData = [
        { label: "Abu Dhabi", value: "abu_dhabi" },
        { label: "Dubai", value: "dubai" },
        { label: "Sharjah", value: "sharjah" },
      ];
    }

    res.json(statesData);
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get cities by state
export const getCitiesByState = async (req, res) => {
  try {
    const { stateCode } = req.params;

    let citiesData = [];

    switch (stateCode) {
      // India
      case "maharashtra":
        citiesData = [
          { label: "Mumbai", value: "mumbai" },
          { label: "Pune", value: "pune" },
          { label: "Nagpur", value: "nagpur" },
          { label: "Nashik", value: "nashik" },
          { label: "Aurangabad", value: "aurangabad" },
        ];
        break;
      case "karnataka":
        citiesData = [
          { label: "Bangalore", value: "bangalore" },
          { label: "Mysore", value: "mysore" },
          { label: "Mangalore", value: "mangalore" },
          { label: "Hubli", value: "hubli" },
          { label: "Belgaum", value: "belgaum" },
        ];
        break;
      case "tamil_nadu":
        citiesData = [
          { label: "Chennai", value: "chennai" },
          { label: "Coimbatore", value: "coimbatore" },
          { label: "Madurai", value: "madurai" },
          { label: "Salem", value: "salem" },
          { label: "Tiruchirappalli", value: "tiruchirappalli" },
        ];
        break;
      case "gujarat":
        citiesData = [
          { label: "Ahmedabad", value: "ahmedabad" },
          { label: "Surat", value: "surat" },
          { label: "Vadodara", value: "vadodara" },
          { label: "Rajkot", value: "rajkot" },
          { label: "Bhavnagar", value: "bhavnagar" },
        ];
        break;
      case "delhi":
        citiesData = [
          { label: "New Delhi", value: "new_delhi" },
          { label: "North Delhi", value: "north_delhi" },
          { label: "South Delhi", value: "south_delhi" },
          { label: "East Delhi", value: "east_delhi" },
          { label: "West Delhi", value: "west_delhi" },
        ];
        break;

      // USA
      case "california":
        citiesData = [
          { label: "Los Angeles", value: "los_angeles" },
          { label: "San Francisco", value: "san_francisco" },
          { label: "San Diego", value: "san_diego" },
          { label: "Sacramento", value: "sacramento" },
          { label: "San Jose", value: "san_jose" },
        ];
        break;
      case "texas":
        citiesData = [
          { label: "Houston", value: "houston" },
          { label: "Dallas", value: "dallas" },
          { label: "Austin", value: "austin" },
          { label: "San Antonio", value: "san_antonio" },
          { label: "Fort Worth", value: "fort_worth" },
        ];
        break;
      case "new_york":
        citiesData = [
          { label: "New York City", value: "new_york_city" },
          { label: "Buffalo", value: "buffalo" },
          { label: "Rochester", value: "rochester" },
          { label: "Albany", value: "albany" },
          { label: "Syracuse", value: "syracuse" },
        ];
        break;

      // UAE
      case "abu_dhabi":
        citiesData = [
          { label: "Abu Dhabi City", value: "abu_dhabi_city" },
          { label: "Al Ain", value: "al_ain" },
          { label: "Madinat Zayed", value: "madinat_zayed" },
        ];
        break;
      case "dubai":
        citiesData = [
          { label: "Deira", value: "deira" },
          { label: "Bur Dubai", value: "bur_dubai" },
          { label: "Jumeirah", value: "jumeirah" },
          { label: "Dubai Marina", value: "dubai_marina" },
          { label: "Downtown Dubai", value: "downtown_dubai" },
        ];
        break;
      case "sharjah":
        citiesData = [
          { label: "Sharjah City", value: "sharjah_city" },
          { label: "Khor Fakkan", value: "khor_fakkan" },
          { label: "Kalba", value: "kalba" },
        ];
        break;

      // fallback
      default:
        citiesData = [
          { label: "City 1", value: "city1" },
          { label: "City 2", value: "city2" },
          { label: "City 3", value: "city3" },
        ];
    }

    res.json(citiesData);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Server error" });
  }
};
