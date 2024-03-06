const HttpApiClient = require("./HttpApiClient");
class AllianzApiClient extends HttpApiClient {
  constructor(baseURL, headers) {
    super({
      baseURL,
      headers: headers,
    });
  }

  get auth() {
    return {
      authentication: (payload) =>
        this.post("/uatm/v1/idp/oauth2/authorize", payload),
    };
  }
  get company() {
    return {
      search_companies: (payload) =>
        this.post("/search/uatm-v2/companies/advancedSearch", payload),
      create_company: (payload) =>
        this.post("/company-referential/uatm-v1/companies", payload),
    };
  }
  get cover() {
    return {
      covers: (payload) => this.post("/uatm/riskinfo/v3/covers", payload),
      get_cover_status: (jobId) => this.get(`/uatm/riskinfo/v3/jobs/${jobId}`),
      get_cover_response: (coverID) =>
        this.get(`/uatm/riskinfo/v3/covers/${coverID}`),
    };
  }
}
module.exports = AllianzApiClient;
