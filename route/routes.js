const express = require("express");
const {
  getAllData,
  addData,
  deleteData,
  updateData,
  getChargersPerUser,
  searchChargers,
} = require("../db");

const router = express.Router();

router.get("/get/:dbtype", async (req, res) => {
  const data = JSON.parse(await getAllData(req.params.dbtype,req.query.id));
  res.send(data);
});

router.post("/:dbtype", async (req, res) => {
  res.send(await addData(req.params.dbtype, req.body, req.query.id));
});

router.delete("/delete/:dbtype", async (req, res) => {
  res.send(await deleteData(req.params.dbtype, req.query.id));
});

router.put("/update/:dbtype", async (req, res) => {
  res.send(await updateData(req.params.dbtype, req.query.id, req.body));
});

router.get("/search/chargers", async (req, res) => {
  res.send(JSON.parse(await searchChargers(req.query)));
});

router.get("/:user/charger", async (req, res) => {
  res.send(JSON.parse(await getChargersPerUser(req.params.user)));
});
module.exports = router;
