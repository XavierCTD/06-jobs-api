const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Form = require("../models/Form");

const getAllForms = async (req, res) => {
  const objects = await Form.find({ createdBy: req.user.userId }).sort(
    "createdAt",
  );
  res.status(StatusCodes.OK).json({ objects, count: objects.length });
};

const getForm = async (req, res) => {
  const {
    user: { userId },
    params: { id: formId },
  } = req;
  const form = await Form.findOne({ _id: formId, createdBy: userId });
  if (!form) {
    throw new NotFoundError(`No form with id ${formId}`);
  }
  res.status(StatusCodes.OK).json({ form });
};

const createForm = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const form = await Form.create(req.body);
  res.status(StatusCodes.CREATED).json({ form });
};

const updateForm = async (req, res) => {
  const {
    body: { username, password },
    user: { userId },
    params: { id: formId },
  } = req;
  if (username === "" || password === "") {
    throw new BadRequestError("Username or Password fields cannot be empty");
  }
  const form = await Form.findOneAndUpdate(
    { _id: formId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!form) {
    throw new NotFoundError(`No form with id ${formId}`);
  }
  res.status(StatusCodes.OK).json({ form });
};

const deleteForm = async (req, res) => {
  const {
    user: { userId },
    params: { id: formId },
  } = req;
  const form = await Form.findOneAndDelete({ _id: formId, createdBy: userId });
  if (!form) {
    throw new NotFoundError(`No form with id ${formId}`);
  }
  res.status(StatusCodes.OK).json({ message: "Form deleted successfully" });
};

module.exports = {
  getAllForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
};
