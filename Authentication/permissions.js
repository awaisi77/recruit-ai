const { rule, shield } = require("graphql-shield");
const isAuthenticated = rule()((parent, args, { auth }) => {
       return auth !== null;
});
let permissions = shield({
    Query: {
      myInvoice: isAuthenticated
    }
  });
let ignore_permissions  = process.env.ignore_permissions || false;
console.info(process.env);
if(ignore_permissions=='true'){
  console.info("ignore permissions");
  permissions = shield({
  });
}
module.exports = { permissions} ;