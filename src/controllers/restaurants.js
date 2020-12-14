const {Pool} = require('pg')

const connectionString = "postgres://prieupafdleajx:0ed0f64c542b224fbba962dd21ebe0b193cb8c18d776159677903e32d40ef3e7@ec2-3-220-98-137.compute-1.amazonaws.com:5432/dfvst9inmj8317"

const pool = new Pool({
    connectionString,
})

const getRestaurants = async (req,res, next) => {
    const response = await pool.query('SELECT * FROM restaurant')
    res.status(200).json(response.rows);
}

const getRestaurantsById = async (req,res, next) => {
    const id = req.params.id
    const response = await pool.query('SELECT * FROM restaurant WHERE id = $1', [id])
    res.status(200).json(response.rows);
}

const insertRest = async (req, res, next) =>{
    const {id, rating, name, site, email, phone, street, city, state, lat, lng } = req.body
    const response = await pool.query('INSERT INTO restaurant (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [id, rating, name, site, email, phone, street, city, state, lat, lng])
    console.log(response)
    res.status(200).json({msg : "Inserted Restaurant", body: {restaurant: {name}}});
}

const deleteRest = async(req, res, next) => {
    const id = req.params.id
    const response = await pool.query('DELETE FROM restaurant WHERE id = $1', [id])
    res.status(200).json(`Restaurant deleted`);
}

const updateRest = async(req, res, next) => {
    const id = req.params.id
    const {rating, name, site, email, phone, street, city, state, lat, lng } = req.body
    const response = await pool.query('UPDATE restaurant SET rating=$1, name=$2, site=$3, email=$4, phone=$5, street=$6, city=$7, state=$8, lat=$9, lng=$10  WHERE id= $11', [rating, name, site, email, phone, street, city, state, lat, lng, id])
    res.status(200).json(`Restaurant updated`);
}



module.exports = {
    getRestaurants,
    insertRest,
    getRestaurantsById,
    deleteRest,
    updateRest
}