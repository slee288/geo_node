const router = require("express").Router();
const { getStores, addStore } = require("../controllers/stores");

router.route("/")
    .get(getStores)
    .post(addStore);

module.exports = router;
