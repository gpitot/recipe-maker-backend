

create table units (name varchar(100) primary key);

create table ingredients (name varchar(100) primary key, unit varchar(100) not null, foreign key (unit) references units(name) ON DELETE CASCADE);

create table recipe_meta (id SERIAL primary key, name varchar(100), description varchar(300));

create table recipe_ingredients (
    recipe_id BIGINT UNSIGNED not null, ingredient varchar(100), amount integer, 
    primary key(recipe_id, ingredient), 
    foreign key (recipe_id) references recipe_meta(id),
    foreign key (ingredient) references ingredients(name)
);