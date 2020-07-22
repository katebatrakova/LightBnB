INSERT INTO users (name, email, password) VALUES ('Eva Stanley', 'EvaStanley@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Lou Mayer', 'lou@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Dominic Parks', 'parks@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Sue Luna', 'luna@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Rose Garza', 'garza@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Etta West', 'west@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Margo Wong', 'wong@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Leroy Hart', 'hart@inbox.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties 
(owner_id, title, description, thumbnail_photo_url, cover_photo_url,
cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms,
country,street, city, province, post_code, active) 
VALUES 
(1, 'Speed Lamp', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$930', '6', '4', '2', 'Canada', '65 Wesley St.', 'Fredericton',  'New Brunswick', 'E1S 1Z4', 'true'), 
(2, 'Round Corner', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$600', '1', '2', '1', 'Canada', '788 Dorington St.', 'Moncton',  'New Brunswick', 'E1A 1ZP', 'true'), 
(3, 'Golden Gates', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$600', '5', '3', '2', 'Canada', '788 Roundy St.', 'Miramichi',  'New Brunswick', 'E1A 13P', 'false'), 
(4, 'Winter Frost', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$880', '1', '1', '1', 'Canada', '3 Londy St.', 'Saint-John',  'New Brunswick', 'E1A 19P', 'false'), 
(5, 'Glass Castle', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$600', '2', '3', '2', 'Canada', '78 Windy St.', 'Moncton',  'New Brunswick', 'E1A 1ZP', 'true'), 
(6, 'Absolutely Gorgeous', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$1100', '3', '4', '3', 'Canada', '78 Moisten St.', 'Montreal',  'Quebec', 'E1O R05', 'true'), 
(7, 'Shine Twenty', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$770', '1', '1', '1', 'Canada', '1998 Twenty St.', 'London',  'Ontario', 'E3D R6I', 'false'), 
(8, 'Game Fill', 'description', 'https://pix10.agoda.net/hotelImages/235414/-1/085ae6893737969841b0117728d7b072.jpg?s=1024x768',
'https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg',
'$1000', '3', '3', '1', 'Canada', '2 Dolphin St.', 'Saint Andrews',  'New Brunswick', 'E5S R8I', 'true');



INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2019-06-01', '2019-06-20', 2, 2),
('2014-02-20', '2014-02-29', 1, 4),
('2016-11-23', '2016-12-03', 3, 5),
('2016-12-11', '2016-12-22', 3, 4),
('2017-01-11', '2017-02-11', 4, 8),
('2018-05-26', '2018-07-11', 5, 1),
('2018-06-21', '2018-07-11', 6, 8),
('2023-08-15', '2023-08-30', 4, 2),
('2015-04-04', '2015-06-11', 8, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2,5,10,3, 'message'), (1,4,1,4, 'message'),
(8,1,2,4, 'message'), (3,8,5,4, 'message'), 
(4,2,7,5, 'message'), (4,3,4,4, 'message'),
(5,6,3,5, 'message');





