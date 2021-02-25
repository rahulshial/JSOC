use jsoc_db;

INSERT INTO users (email, password, type) VALUES
('calgaryjains@gmail.com', '1234', 'EC'),
('president.jsoc@gmail.com', '1234', 'EC'),
('vicepresident.jsoc@gmail.com', '1234', 'EC'),
('treasurer@gmail.com', '1234', 'EC'),
('events.jsoc@gmail.com', '1234', 'DIR'),
('operations.jsoc@gmail.com', '1234', 'DIR'),
('fundraising.jsoc@gmail.com', '1234', 'DIR'),
('newidea.jsoc@gmail.com', '1234', 'DIR'),
('webcomm.jsoc@gmail.com', '1234', 'DIR'),
('pathshala@gmail.com', '1234', 'DIR'),
('rahul.shial@gmail.com', '1234', 'MEM');

INSERT INTO news_announcements(type, message) VALUES
('PRESMSG', "This is the President's blog area. You can type what ever message you want to pass to the community.");

INSERT INTO events (title, description, venue, start_date, end_date, start_time, end_time) VALUES
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-01-10','2021-01-10', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-01-24','2021-01-24', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-02-07','2021-02-07', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-02-21','2021-02-21', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-03-07','2021-03-07', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-03-21','2021-03-21', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-04-11','2021-04-11', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Kids Pathshala', 'online', '2021-04-25','2021-04-25', '10:00:00', '11:30:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-01-10','2021-01-10', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-01-24','2021-01-24', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-02-07','2021-02-07', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-02-21','2021-02-21', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-03-07','2021-03-07', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-03-21','2021-03-21', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-04-11','2021-04-11', '19:30:00', '21:00:00'),
('Pathshala', 'Bi-Weekly Adults Pathshala', 'online', '2021-04-25','2021-04-25', '19:30:00', '21:00:00');


