const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Mail = require('../models/Mail');

// @desc      Delete Mail by ID
// @route     DELETE /api/v1/mail/:id
// @access    Private
exports.deleteMail = asyncHandler(async (req, res, next) => {
  let results;
  console.log(req.params.id);
  results = await Mail.findByIdAndDelete(req.params.id);
  console.log(`Query results ${results}`);

  if (!results) {
    return next(new ErrorResponse('No Mails Found', 404));
  }
  res.status(200).json({ success: true, data: results });
});

// @desc      Get Mail by ID
// @route     GET /api/v1/mail/:id
// @access    Private
exports.getMailByID = asyncHandler(async (req, res, next) => {
  let results;
  console.log(req.param.id);
  results = await Mail.findById(req.params.id);
  console.log(`Query results ${results}`);

  if (!results) {
    return next(new ErrorResponse('No Mails Found', 404));
  }
  res.status(200).json({ success: true, data: results });
});
// @desc      Get all Mails for User
// @route     GET /api/v1/mail/sent
// @access    Private

exports.getSentMail = asyncHandler(async (req, res, next) => {
  let results;
  let email = req.user.email;
  results = await Mail.find({ from: email });
  console.log(`Query results ${results}`);

  if (!results) {
    return next(new ErrorResponse('No Mails Found', 404));
  }
  res.status(200).json({ success: true, data: results });
});

// @desc      Get all Mails for User
// @route     GET /api/v1/mail/inbox
// @access    Private

exports.getInbox = asyncHandler(async (req, res, next) => {
  let results;
  let email = req.user.email;
  results = await Mail.find({ $or: [{ to: email }, { bcc: email }, { cc: email }] });
  console.log(`Query results ${results}`);

  if (!results) {
    return next(new ErrorResponse('No Mails Found', 404));
  }
  res.status(200).json({ success: true, data: results });
});

// // @desc      Create Mail
// // @route     POST /api/v1/mail/createmail
// // @access    Private
exports.createMail = asyncHandler(async (req, res, next) => {
  const mail = await Mail.create(req.body);

  res.status(201).json({
    success: true,
    data: mail,
  });
});

// // @desc      Get all Mails
// // @route     GET /api/v1/auth/inbox
// // @access    Private
// exports.getUsers = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults);
// });

// // @desc      Get single user
// // @route     GET /api/v1/auth/users/:id
// // @access    Private/Admin
// exports.getUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// // @desc      Create user
// // @route     POST /api/v1/auth/users
// // @access    Private/Admin
// exports.createUser = asyncHandler(async (req, res, next) => {
//   const user = await User.create(req.body);

//   res.status(201).json({
//     success: true,
//     data: user,
//   });
// });

// // @desc      Update user
// // @route     PUT /api/v1/auth/users/:id
// // @access    Private/Admin
// exports.updateUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// // @desc      Delete user
// // @route     DELETE /api/v1/auth/users/:id
// // @access    Private/Admin
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//   await User.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: {},
//   });
// });
