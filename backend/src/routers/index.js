const { Router } = require("express");
const jwt = require("jsonwebtoken");

const helpers = require("../lib/helpers");
const pool = require("../database");
const router = Router();

router.post("/registro", async (req, res) => {
  try {
    //const { username, password } = req.body;
    const username = req.body.email;
    const password = req.body.password;
    const passwordss = req.body.password;

    const rows = await pool.query("SELECT * FROM usuarios WHERE username = ?", [
      username,
    ]);
    if (rows.length == 0) {
      newUser = {
        username,
        password,
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO usuarios SET ? ", newUser);
      console.log(result.insertId);
      const token = jwt.sign({ _id: result.insertId }, "secretkey");

      return res.status(200).json({ token });
    } else {
      return res.status(401).send("El Usuario ya existe");
    }
  } catch (error) {
    return res.status(401).send("dara");
  }
});

router.post("/logear", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const rows = await pool.query("SELECT * FROM usuarios WHERE username = ?", [
      username,
    ]);
    console.log(rows);

    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(
        password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign({ _id: user.id }, "secretkey");
        return res.status(200).json({ token });
      } else {
        return res.status(401).send("La Contraseña es Incorrecto");
      }
    } else {
      return res.status(401).send("El correo es Incorrecto");
    }
  } catch (error) {
    return res.status(401).send("dara");
  }
});

module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("No tienes autorizacion uno");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("No tienes autorizacion");
  }

  const payload = jwt.verify(token, "secretkey");

  req.userID = payload._id;
  next();
}
