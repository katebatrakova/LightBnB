//The file is responsible for all queries to the database

const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect(() => {
  console.log('Client connected 😎')
})


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */



const getUserWithEmail = function (email) { //// accepts an email and returns a promise
  return pool
    .query(`
SELECT * FROM users
WHERE email = $1;`, [email])
    .then(res => res.rows[0]) //return the only object from the array 
    .catch(e => console.log(e));
}
// getUserWithEmail('lilareyes@google.com')

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function (id) {
  return pool
    .query(`
SELECT * FROM users
WHERE id = $1;`, [id])
    .then(res => res.rows[0]) //return the only user object from the array 
    .catch(e => res.send(e));
}
// getUserWithId(66)

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */



const addUser = function (user) {
  const values = [user.name, user.email, user.password]
  return pool.query(`INSERT INTO users (
    name, email, password) 
    VALUES (
    $1, $2, $3)
    RETURNING *`, values) //Returning * for auto generated id
    .then(res => (res.rows))
    .catch(e => console.log(e));
}


exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  console.log(guest_id, 'guest_id inside getAllReservations')
  const query = (`SELECT reservations.*, properties.*, AVG (property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id=reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 
  AND reservations.end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;` )
  return pool.query(query, [guest_id, limit])
    .then(res => res.rows[0]);
}
// getAllReservations(986)

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  return pool
    .query(`
  SELECT * FROM properties
  LIMIT $1
      `, [limit]) //parameterized query here because limit data coming from somewhere else
    .then(res => res.rows); //every .then returns a new promise with whatever was returned inside of it
}


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
