const express = require("express");
const router = express.Router();
const DataSources = require("../../datasources/index");
const db = DataSources.getDatabase();
const responseHandler = require("../../helpers/response_handler");
const AllianzHelper = require("../../services/allianz/AllianzHelper");

router.get("/allianz/health_check", async function (req, res, next) {
  res.send({ status: true });
});

router.post("/allianz/company/search", async function (req, res, next) {
  try {
    // code block to be executed
    const requestToken = req.authToken;
    const allianzHelper = new AllianzHelper(db);
    let payload = req.body;
    const response = await allianzHelper.searchCompanies(payload, requestToken);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post("/allianz/company/register", async function (req, res, next) {
  try {
    // code block to be executed
    const requestToken = req.authToken;
    const allianzHelper = new AllianzHelper(db);
    let payload = req.body;
    const response = await allianzHelper.createCompanyId(payload, requestToken);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post("/allianz/cover", async function (req, res, next) {
  try {
    // code block to be executed
    const requestToken = req.authToken;
    const allianzHelper = new AllianzHelper(db);
    let payload = req.body;
    const response = await allianzHelper.createCover(payload, requestToken);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
router.get("/allianz/cover/status/:jobId", async function (req, res, next) {
  try {
    // code block to be executed
    const requestToken = req.authToken;
    const allianzHelper = new AllianzHelper(db);
    let jobId = req.params.jobId;
    const response = await allianzHelper.getCoverStatus(jobId, requestToken);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
router.get("/allianz/cover/response/:coverId", async function (req, res, next) {
  try {
    // code block to be executed
    const requestToken = req.authToken;
    const allianzHelper = new AllianzHelper(db);
    let coverId = req.params.coverId;
    const response = await allianzHelper.getCoverResponse(
      coverId,
      requestToken
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
