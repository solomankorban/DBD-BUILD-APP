CREATE DATABASE dbdbuildapp;

CREATE TABLE builds(
    build_id SERIAL PRIMARY KEY,
    description VARCHAR,
    role VARCHAR,
    character json,
    perk1 json,
    perk2 json,
    perk3 json,
    perk4 json,
    item json,
    addon1 json,
    addon2 json,
    offering json,
    likes INTEGER DEFAULT 0,
    created date DEFAULT NOW()
);


INSERT INTO builds (description, role, character, perk1, perk2, perk3, perk4, item, addon1, addon2, offering) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);