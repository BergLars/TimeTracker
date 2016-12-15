-- Test for Person
insert into person (username, password, percentageofwork, isadmin) values
	('mir', 'Fluance2015*', 0.40, true),
    ('ecek', 'Fluance2015*', 1, true);

select * from person;

-- Test for Project
insert into project (name) values
	('Fluance'), 
	('FTT'),
	('Oxygen');
SELECT * FROM project WHERE name='FTT';
select * from project;

-- Test for Task
insert into task (description, project_id) values
	('Deploy on mojito', 2),
	('Create button', 3),
    ('Update database', 2);

select * from task;

-- Test for Entry in progress....
insert into entry (startdt, enddt, person_id, task_id) values
	('2016-12-06 14:11:32.527865', null, 4, 3),
    ('2016-12-07 14:11:32.527865', null, 3, 2);
    
select '2016-12-01 14:11:32.527865'::timestamp::date;
select * from entry where startdt::date = '2016-12-01'
select '2016-12-01 14:11:32.527865'::timestamp::time;
select clock_timestamp()
select localtime
select * from entry where startdt::date between '2016-12-06' and '2016-12-07' order by startdt desc

select * from entry;

-- Update Person
update person set percentageofwork = '1' where username = 'mir';

-- Delete a person
delete from person where username='clay' and isadmin=false;