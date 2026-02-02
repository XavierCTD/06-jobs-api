const getAllObjects = async (req, res) => {
  res.send("Get all objects");
};

const getObject = async (req, res) => {
  res.send("Get single object");
};

const createObject = async (req, res) => {
  res.json(req.user);
};

const updateObject = async (req, res) => {
  res.send("Update object");
};

const deleteObject = async (req, res) => {
  res.send("Delete object");
};

module.exports = {
  getAllObjects,
  getObject,
  createObject,
  updateObject,
  deleteObject,
};
