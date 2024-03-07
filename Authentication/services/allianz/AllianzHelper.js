const { Op } = require("sequelize");
const DataSources = require("../../datasources/index");
const AllianzApiClient = require("../AllianzApiClient");
const moment = require("moment");
const { isEmpty } = require("lodash");
const {
  send_slack_notification,
} = require("../../helpers/slack_notifications");
const config = require("../../config/index");

class AllianzHelper {
  constructor(db) {
    this.db = db;
  }

  async searchCompanies(payload, token) {
    try {
      console.log("token in cga", token);

      const allianz = new AllianzApiClient(process.env.ALLIANZ_BASE_URL, {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      });

      const companies = await allianz.company.search_companies(payload);
      console.log(companies);

      return companies;
    } catch (ex) {
      console.log(
        "AllianzHelper@searchCompanies Error while consuming AllianzxHelper.js:",
        ex.toString()
      );
      throw ex;
    }
  }

  async createCompanyId(payload, token) {
    try {
      console.log("token in cga", token);

      const allianz = new AllianzApiClient(process.env.ALLIANZ_BASE_URL, {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      });

      const companies = await allianz.company.create_company(payload);
      console.log(companies);

      return companies;
    } catch (ex) {
      console.log(
        "AllianzHelper@createCompanyId Error while consuming AllianzxHelper.js:",
        ex.toString()
      );
      throw ex;
    }
  }

  async createCover(payload, token) {
    try {
      console.log("token in cga", token);

      const allianz = new AllianzApiClient(process.env.ALLIANZ_BASE_URL, {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      });

      const covers = await allianz.cover.covers(payload);
      console.log(covers);

      return covers;
    } catch (ex) {
      console.log(
        "AllianzHelper@createCover Error while consuming AllianzxHelper.js:",
        ex.toString()
      );
      throw ex;
    }
  }
  async getCoverStatus(jobId, token) {
    try {
      console.log("token in cga", token);

      const allianz = new AllianzApiClient(process.env.ALLIANZ_BASE_URL, {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      });
      const status = await allianz.cover.get_cover_status(jobId);
      return status;
    } catch (ex) {
      console.log(
        "AllianzHelper@getCoverStatus Error while consuming AllianzxHelper.js:",
        ex.toString()
      );
      throw ex;
    }
  }
  async getCoverResponse(coverId, token) {
    try {
      console.log("token in cga", token);

      const allianz = new AllianzApiClient(process.env.ALLIANZ_BASE_URL, {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      });
      const response = await allianz.cover.get_cover_response(coverId);
      return response;
    } catch (ex) {
      console.log(
        "AllianzHelper@getCoverResponse Error while consuming AllianzxHelper.js:",
        ex.toString()
      );
      throw ex;
    }
  }
}

module.exports = AllianzHelper;
