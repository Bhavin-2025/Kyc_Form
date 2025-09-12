import MasterData from "../models/masterDataModel.js";

// @desc Get master data by type
// @route GET /api/master/:type
export const getMasterData = async (req, res) => {
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
