CREATE DATABASE restaurants

CREATE TABLE IF NOT EXISTS restaurant(
    id TEXT PRIMARY KEY, 

            rating INTEGER, 

            name TEXT, 

            site TEXT, 

            email TEXT,

            phone TEXT,

            street TEXT,

            city TEXT,

            state TEXT,

            lat FLOAT, 

            lng FLOAT 
)