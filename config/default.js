// default.js is a file in which all configuration settings are exported as a JSON object.
// Each key may have a hard-coded value or a reference to an environment variable.

module.exports = {
  log: "debug",
  conversation: {
    workspace_id: process.env.CONVERSATION_WORKSPACE_ID,
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD
  },
  discovery: {
    username: process.env.DISCOVERY_USERNAME,
    password: process.env.DISCOVERY_PASSWORD,
    environment_id: process.env.DISCOVERY_ENVIRONMENT_ID,
    collection_id: process.env.DISCOVERY_COLLECTION_ID
  },
  mock: {
    url: process.env.MOCK_SERVICE_URL
  }
};
