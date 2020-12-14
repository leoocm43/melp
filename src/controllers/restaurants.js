const {Pool} = require('pg')
const GeoJSON = require('geojson');
require('dotenv').config();

const pool = new Pool(({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'restaurants',
    port: '5432'
}))

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

const getGeojson = async (req, res, next) => {
    /*let queryLayer = 'SELECT  id,  st_x(geom ) as lng, st_y(geom ) as lat, nombre,  tipo,  cod_mun,  municipio,  provincia FROM alojamientodera;'

    pool.query(queryLayer, (err, res) => {
        if (err) {
            return console.error('Error ejecutando la consulta. ', err.stack)
        }
        let geojson = GeoJSON.parse(res.rows, { Point: ['lat', 'lng'] });

        response.json(geojson);
    })*/

    //const {x,y,z} = req.params
    const response = await pool.query('SELECT id, name, lng, lat FROM restaurant;')
    res.status(200).json(response.rows);
}



module.exports = {
    getRestaurants,
    insertRest,
    getRestaurantsById,
    deleteRest,
    updateRest,
    getGeojson
}