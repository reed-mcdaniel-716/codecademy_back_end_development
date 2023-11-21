require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "me",
  password: process.env.PG_PASSWORD,
  host: "localhost",
  database: "api",
  post: 5432,
});

const getUsers = (request, response) => {
  pool.query("select * from users order by id asc", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("select * from users where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "insert into users (name, email) values ($1, $2) returning *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "update users set name = $1, email = $2 where id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("delete from users where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
