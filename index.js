require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");
const { applyMiddleware } = require("graphql-middleware");
const { buildSubgraphSchema } = require("@apollo/federation");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { typeDefs, resolvers } = require("./schema");
const setupCors = require("./services/cors");
const Datasources = require("./datasources");
const { permissions } = require("./permissions");
const { responseHandler, errorHandler } = require("./helpers/response_handler");

const port = process.env.port || 4008;

const allianz_routes = require("./routes/api/allianz");
const payment_routes = require("./routes/api/payment");



//Body Parser Middleware - Should be defined before defining routes
app.use(
  bodyParser.json({
    limit: "400000000",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const server = new ApolloServer({
  schema: applyMiddleware(
    buildSubgraphSchema({
      typeDefs,
      resolvers: resolvers,
    }),
    permissions
  ),
  dataSources: () => {
    return {
      db: Datasources.getDatabase(),
    };
  },
  context: ({ req }) => {
    const { auth = null, token = null } = req.headers;
    return { auth, token };
  },
});
setupCors(app);

// app.use("/api/v1", airwallex_webhook_routes);
app.use("/api/v1", allianz_routes);
app.use("/api/v1", payment_routes);

app.use(responseHandler);
app.use(errorHandler);

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`[App]: Listening on port ${port}`);
  });
  console.log(`🚀 Server ready`);
});
//Pushing a change to porter
