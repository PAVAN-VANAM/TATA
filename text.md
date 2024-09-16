profile {
id serial not null primary key,
user_id varchar(100) not null unique ,
name varchar(255) not null,
password varchar(255) not null,
batch_id int unique not null,
FOREIGN KEY (batch_id) REFERENCES batch(batch_id)
}

batch {
batch_id SERIAL PRIMARY KEY,
batch_name varchar(255) not null,
token VARCHAR(255) NOT NULL
}

attendance {
attendance_id SERIAL PRIMARY KEY,
user_id varchar(100) not null unique,
attendance BOOLEAN DEFAULT FALSE,
FOREIGN KEY (user_id) REFERENCES profile(user_id)
}
