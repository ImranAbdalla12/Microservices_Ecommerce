const express = require("express");
const router = express.Router();

const {
  create,
  listAll,
  remove,
  read,
  update,
} = require("../controllers/productController");
// routes
router.post("/product", create);
router.get("/products/total");

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", remove);
router.get("/product/:slug", read);
router.put("/product/:slug", update);

router.post("/products");
// rating
module.exports = router;
