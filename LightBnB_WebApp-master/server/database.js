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
  console.log(query, 'query inside getAllReservations')
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
  //#1 array to hold  parameters for the query
  const queryParams = [];
  //#2 query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  // #3
  if (options.city) { //check if a city has been passed in as an option
    queryParams.push(`%${options.city}%`); //add  city to the params array 
    // create a WHERE clause for the city
    queryString += `WHERE city LIKE $${queryParams.length} `; //array length as dynamic $n placeholder number
  }
  //filter the minimum price
  if (options.minimum_price_per_night) { //check min/max prices passed in 
    queryParams.push(`${options.minimum_price_per_night}00`); //add  min to the params array 
    // create a WHERE clause for the min
    queryString += `AND cost_per_night >= $${queryParams.length} `; //array length as dynamic $n placeholder number
  }
  //filter the maximum price
  if (options.maximum_price_per_night) { //check min/max prices passed in 
    queryParams.push(`${options.maximum_price_per_night}00`); //add  max  to the params array 
    // create a WHERE clause for the max
    queryString += `AND cost_per_night <= $${queryParams.length} `; //array length as dynamic $n placeholder number
  }
  //filter the minimum rating
  if (options.minimum_rating) { //check min rating 
    queryParams.push(`${options.minimum_rating}`); //add  rating to the params array 
    // create a WHERE clause for the city
    queryString += `AND property_reviews.rating >=$${queryParams.length} `; //array length as dynamic $n placeholder number
  }


  // #4 Add any query that comes after the WHERE clause
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // #5
  console.log(queryString, 'queryString', queryParams, 'queryParams');
  return pool
    .query(queryString, queryParams) //parameterized query here because limit data coming from somewhere else
    .then(res => res.rows); //every .then returns a new promise with whatever was returned inside of it
}




exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryParams = [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code]
  // let queryString = `
  // INSERT INTO properties (
  //   title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night,
  //   parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  //   VALUES ( '${property.title}', '${property.description}', '${property.owner_id}', '${property.cover_photo_url}', '${property.thumbnail_photo_url}', '${property.cost_per_night}', '${property.parking_spaces}', '${property.number_of_bathrooms}', '${property.number_of_bedrooms}', '${property.active}', '${property.province}', '${property.city}', '${property.country}', '${property.street}', '${property.post_code}') 
  //   RETURNING *;
  // `;
  let queryString = `
  INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night,
    parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
    RETURNING *;
  `;
  console.log(queryString, queryParams)
  return pool
    .query(queryString, queryParams) //parameterized query here because limit data coming from somewhere else
    .then(res => res.rows);
}

// addProperty({
//   owner_id: 100,
//   title: 'Koko',
//   description: 'string',
//   thumbnail_photo_url: 'url',
//   cover_photo_url: 'url',
//   cost_per_night: '120',
//   street: 'William',
//   city: 'Moncton',
//   province: 'New Brunswick',
//   post_code: 'E1A1z3',
//   country: 'Canada',
//   parking_spaces: '3',
//   number_of_bathrooms: '1',
//   number_of_bedrooms: '2'
// })

exports.addProperty = addProperty;
