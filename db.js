const { json, query } = require("express");
const fapp = require("firebase/app");
const fdb = require("firebase/database");
const {
  ref,
  getDatabase,
  get,
  push,
  child,
  set,
  remove,
  update,
  orderByChild,
  equalTo,
  startAt,
} = fdb;
const firebaseConfig = {
  databaseURL: process.env.databaseURL,
};
const app = fapp.initializeApp(firebaseConfig);
const db = getDatabase(app);
async function getAllData(database) {
  const snapshot = await get(ref(db, database));
  return JSON.stringify(snapshot.val());
}
async function addData(database, data, id) {
  if (id == undefined) {
    const res = await push(ref(db, database + "/"), data).key;
    return JSON.stringify({ key: res });
  } else {
    const res = await get(ref(db, database + "/" + id));
    if (res.exists()) {
      return JSON.stringify({ msg: "Key already exists" });
    } else {
      const res = await set(ref(db, database + "/" + id), data);
      return JSON.stringify(res);
    }
  }
}
async function deleteData(database, id) {
  if (id == undefined) {
    return JSON.stringify({
      msg: "Please specify data to be deleted",
    });
  }
  const dbRef = await get(ref(db, database + "/" + id));
  if (dbRef.exists()) {
    remove(ref(db, database + "/" + id));
    return JSON.stringify({
      msg: "Data deleted",
    });
  } else {
    return JSON.stringify({ msg: "Data doesn't exists at specified path" });
  }
}

async function updateData(database, id, data) {
  if (id == undefined) {
    return JSON.stringify({
      msg: "Please specify the data to update",
    });
  }
  const dbRef = await get(ref(db, database + "/" + id));
  if (dbRef.exists()) {
    await update(ref(db, database + "/" + id), data);
    return JSON.stringify({
      msg: "Data updated successfully",
    });
  } else {
    return JSON.stringify({
      msg: "Data doesn't exists at specified path",
    });
  }
}

async function getChargersPerUser(username) {
  const chargerRef = ref(db, "chargers/");
  const queryRef = fdb.query(
    chargerRef,
    orderByChild("owner"),
    equalTo(String(username))
  );

  const snapshot = await get(queryRef);
  if (snapshot.exists()) {
    return JSON.stringify(snapshot.val());
  } else {
    return JSON.stringify({ msg: "Data doesn't exists" });
  }
}

async function searchChargers(filter) {
  let res=[];
  if (filter.orderBy == undefined) {
    const snapshot = await get(ref(db, "chargers"));
    return JSON.stringify(snapshot.val());
  } else if (filter.orderBy == "price") {
    const queryRef = fdb.query(
      ref(db, "chargers" + "/"),
      orderByChild("price")
    );
    const snapshot = await get(queryRef);
    snapshot.forEach((doc) => {
      res.push(doc.val())
    });
    return JSON.stringify(res);
  } else if (filter.orderBy == "rating") {
    let res=[];
    const queryRef = fdb.query(ref(db, "chargers"), orderByChild("rating"));
    const snapshot = await get(queryRef);
    snapshot.forEach((doc) => {
      res.push(doc.val())
    });
    return JSON.stringify(res);
  } else {
    return JSON.stringify({
      msg:"Invalid filter constraint"
    });
  }
}

module.exports = {
  getAllData,
  addData,
  deleteData,
  updateData,
  getChargersPerUser,
  searchChargers,
};
