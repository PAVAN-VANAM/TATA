profile {
user_id varchar(100) not null primary key ,
name varchar(255) not null,
password varchar(255) not null,
department varchar(255) not null,
batch_id varchar(255) not null,
FOREIGN KEY (batch_id) REFERENCES batch(batch_id)
}

batch {
batch_id varchar(255) not null PRIMARY KEY,
batch_name varchar(255) not null unique,
faculty varchar(255) not null,
token VARCHAR(255) NOT NULL
}

attendance {
attendance_id varchar(100) not null primary key,
attendance BOOLEAN DEFAULT FALSE,
batch_name varchar(255) not null,
FOREIGN KEY (batch_name) REFERENCES batch(batch_name),
FOREIGN KEY (attendance_id) REFERENCES profile(user_id)
}
