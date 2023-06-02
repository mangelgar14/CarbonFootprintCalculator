
drop table if exists datos_premise; drop table if exists  datos_cloud; drop table if exists  serware; drop table if exists projects;

create table projects( 
id INT NOT NULL AUTO_INCREMENT,
id_accenture INT,
name VARCHAR(64) NOT NULL, 
client VARCHAR(64) NOT NULL, 
description VARCHAR (256), 
lastModified DATE NOT NULL, 
PRIMARY KEY (id)
); 


create table serware( 
id_serware INT AUTO_INCREMENT PRIMARY KEY, 
id_project INT NOT NULL,
serware ENUM('Software','Server') NOT NULL, 
lastModified DATE NOT NULL, 
type ENUM('Premise','Cloud'), 
provider VARCHAR(64) NOT NULL,
location VARCHAR(128), 
energy_consumption INT, consumption_emissions INT, 
embedded_emissions INT, 
carbon_footprint INT, 
FOREIGN KEY (id_project) REFERENCES projects(id) ON DELETE CASCADE
);

create table datos_premise (
id INT AUTO_INCREMENT PRIMARY KEY, 
id_serware INT, 
n_servers SMALLINT NOT NULL CHECK (n_servers > 0),
power_consumption_known BOOLEAN NOT NULL, 
power_consumption  INT CHECK(power_consumption > 0), 
cpu  TINYINT CHECK( cpu BETWEEN 1 and 2),
software_utilization DECIMAL(5,2) NOT NULL CHECK(software_utilization BETWEEN 0 AND 100), 
hours_day TINYINT NOT NULL CHECK(hours_day BETWEEN 1 AND 24), 
renewable BOOLEAN NOT NULL, 
renewable_certification TINYINT CHECK(renewable_certification BETWEEN 1 and 3),
renewable_percentage  DECIMAL(5,2) CHECK(renewable_percentage BETWEEN 0 AND 100), 
location VARCHAR(128) NOT NULL, 
FOREIGN KEY (id_serware) REFERENCES serware(id_serware) ON DELETE CASCADE
);

create table datos_cloud (
id INT AUTO_INCREMENT PRIMARY KEY, 
id_serware INT , 
provider VARCHAR(64) NOT NULL, 
region VARCHAR (128) NOT NULL, 
vcpu_hours TINYINT NOT NULL CHECK(vcpu_hours BETWEEN 1 AND 24), 
vgpu_hours TINYINT NOT NULL CHECK(vgpu_hours BETWEEN 1 AND 24), 
tb_hdd DECIMAL (7,4) NOT NULL CHECK(tb_hdd >=0), 
tb_ssd DECIMAL (7,4) NOT NULL CHECK(tb_ssd >=0),
gb_memory INT NOT NULL CHECK(gb_memory >0),
gb_networking INT NOT NULL CHECK(gb_networking >0), 
FOREIGN KEY (id_serware) REFERENCES serware(id_serware) ON DELETE CASCADE
);