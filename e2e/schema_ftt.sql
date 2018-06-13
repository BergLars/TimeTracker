--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.5
-- Dumped by pg_dump version 9.5.5

-- Started on 2018-03-02 15:52:14 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 147770)
-- Name: timetracker; Type: SCHEMA; Schema: -; Owner: fluance
--

DROP SCHEMA IF EXISTS timetracker CASCADE;
CREATE SCHEMA timetracker;


ALTER SCHEMA timetracker OWNER TO fluance;

SET search_path = timetracker, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 147785)
-- Name: client; Type: TABLE; Schema: timetracker; Owner: fluance
--

CREATE TABLE client (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE client OWNER TO fluance;

--
-- TOC entry 185 (class 1259 OID 147788)
-- Name: client_id_seq; Type: SEQUENCE; Schema: timetracker; Owner: fluance
--

CREATE SEQUENCE client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client_id_seq OWNER TO fluance;

--
-- TOC entry 2439 (class 0 OID 0)
-- Dependencies: 185
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: timetracker; Owner: fluance
--

ALTER SEQUENCE client_id_seq OWNED BY client.id;


--
-- TOC entry 186 (class 1259 OID 147790)
-- Name: project; Type: TABLE; Schema: timetracker; Owner: fluance
--

CREATE TABLE project (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE project OWNER TO fluance;

--
-- TOC entry 187 (class 1259 OID 147793)
-- Name: project_id_seq; Type: SEQUENCE; Schema: timetracker; Owner: fluance
--

CREATE SEQUENCE project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE project_id_seq OWNER TO fluance;

--
-- TOC entry 2442 (class 0 OID 0)
-- Dependencies: 187
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: timetracker; Owner: fluance
--

ALTER SEQUENCE project_id_seq OWNED BY project.id;


--
-- TOC entry 188 (class 1259 OID 147795)
-- Name: task; Type: TABLE; Schema: timetracker; Owner: fluance
--

CREATE TABLE task (
    id integer NOT NULL,
    description text
);


ALTER TABLE task OWNER TO fluance;

--
-- TOC entry 189 (class 1259 OID 147801)
-- Name: task_id_seq; Type: SEQUENCE; Schema: timetracker; Owner: fluance
--

CREATE SEQUENCE task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_id_seq OWNER TO fluance;

--
-- TOC entry 2445 (class 0 OID 0)
-- Dependencies: 189
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: timetracker; Owner: fluance
--

ALTER SEQUENCE task_id_seq OWNED BY task.id;


--
-- TOC entry 190 (class 1259 OID 147803)
-- Name: timeentry; Type: TABLE; Schema: timetracker; Owner: fluance
--

CREATE TABLE timeentry (
    id integer NOT NULL,
    description text,
    userprofile_id integer NOT NULL,
    client_id integer NOT NULL,
    project_id integer NOT NULL,
    task_id integer NOT NULL,
    isbillable boolean NOT NULL,
    startdatetime timestamp without time zone NOT NULL,
    enddatetime timestamp without time zone NOT NULL
);


ALTER TABLE timeentry OWNER TO fluance;

--
-- TOC entry 191 (class 1259 OID 147809)
-- Name: timeentry_id_seq; Type: SEQUENCE; Schema: timetracker; Owner: fluance
--

CREATE SEQUENCE timeentry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE timeentry_id_seq OWNER TO fluance;

--
-- TOC entry 2448 (class 0 OID 0)
-- Dependencies: 191
-- Name: timeentry_id_seq; Type: SEQUENCE OWNED BY; Schema: timetracker; Owner: fluance
--

ALTER SEQUENCE timeentry_id_seq OWNED BY timeentry.id;


--
-- TOC entry 192 (class 1259 OID 147811)
-- Name: userprofile; Type: TABLE; Schema: timetracker; Owner: fluance
--

CREATE TABLE userprofile (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    employmentdegree numeric(3,2) NOT NULL,
    isadmin boolean NOT NULL
);


ALTER TABLE userprofile OWNER TO fluance;

--
-- TOC entry 193 (class 1259 OID 147817)
-- Name: userprofile_id_seq; Type: SEQUENCE; Schema: timetracker; Owner: fluance
--

CREATE SEQUENCE userprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userprofile_id_seq OWNER TO fluance;

--
-- TOC entry 2451 (class 0 OID 0)
-- Dependencies: 193
-- Name: userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: timetracker; Owner: fluance
--

ALTER SEQUENCE userprofile_id_seq OWNED BY userprofile.id;


--
-- TOC entry 2284 (class 2604 OID 147872)
-- Name: id; Type: DEFAULT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY client ALTER COLUMN id SET DEFAULT nextval('client_id_seq'::regclass);


--
-- TOC entry 2285 (class 2604 OID 147873)
-- Name: id; Type: DEFAULT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY project ALTER COLUMN id SET DEFAULT nextval('project_id_seq'::regclass);


--
-- TOC entry 2286 (class 2604 OID 147874)
-- Name: id; Type: DEFAULT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY task ALTER COLUMN id SET DEFAULT nextval('task_id_seq'::regclass);


--
-- TOC entry 2287 (class 2604 OID 147875)
-- Name: id; Type: DEFAULT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry ALTER COLUMN id SET DEFAULT nextval('timeentry_id_seq'::regclass);


--
-- TOC entry 2288 (class 2604 OID 147876)
-- Name: id; Type: DEFAULT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY userprofile ALTER COLUMN id SET DEFAULT nextval('userprofile_id_seq'::regclass);


--
-- TOC entry 2423 (class 0 OID 147785)
-- Dependencies: 184
-- Data for Name: client; Type: TABLE DATA; Schema: timetracker; Owner: fluance
--

COPY client (id, name) FROM stdin;
1	FLUANCE
2	REHA Bern
3	GSMN
4	CLIENT 77
6	XYZ
49	client protractor 2
50	protractor client 1
\.


--
-- TOC entry 2453 (class 0 OID 0)
-- Dependencies: 185
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: timetracker; Owner: fluance
--

SELECT pg_catalog.setval('client_id_seq', 51, true);


--
-- TOC entry 2425 (class 0 OID 147790)
-- Dependencies: 186
-- Data for Name: project; Type: TABLE DATA; Schema: timetracker; Owner: fluance
--

COPY project (id, name) FROM stdin;
1	FTT
2	eHealth
3	Oxygen
4	PROJECT 77
5	PROJECT 78
6	Proj 2017
7	PROJECT TEST
8	PROJECT NAME
16	HAHA
18	BLI project
21	XYZ
90	project protractor 2
91	protractor project 1
\.


--
-- TOC entry 2454 (class 0 OID 0)
-- Dependencies: 187
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: timetracker; Owner: fluance
--

SELECT pg_catalog.setval('project_id_seq', 92, true);


--
-- TOC entry 2427 (class 0 OID 147795)
-- Dependencies: 188
-- Data for Name: task; Type: TABLE DATA; Schema: timetracker; Owner: fluance
--

COPY task (id, description) FROM stdin;
1	Update FE view
2	Update MW web services
3	Drop DB
5	Clean code MW
6	Update script BE
17	TEST 77
18	TASK 78
19	TEST 79
20	TASK 80
37	HAHA
38	HOHO
39	HQHQ
41	popcorn
42	popcorn 2
46	heho
47	clapclap
49	klo
50	Krak
51	toctoc
43	TROLOLO
48	MAT CARD
44	TRIII
52	TAS
55	XYZ
57	abc
58	Ta
53	Task Prot
54	Task Protract
40	Ta
76	Task Protractor
56	Task P
4	blabla
162	protractor task 1
163	task protractor 2
\.


--
-- TOC entry 2455 (class 0 OID 0)
-- Dependencies: 189
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: timetracker; Owner: fluance
--

SELECT pg_catalog.setval('task_id_seq', 165, true);


--
-- TOC entry 2429 (class 0 OID 147803)
-- Dependencies: 190
-- Data for Name: timeentry; Type: TABLE DATA; Schema: timetracker; Owner: fluance
--

COPY timeentry (id, description, userprofile_id, client_id, project_id, task_id, isbillable, startdatetime, enddatetime) FROM stdin;
387	vwv	2	4	18	53	f	2018-01-24 16:49:00	2018-01-26 13:49:00
350	käse	42	4	3	53	f	2017-12-20 10:21:00	2017-12-23 10:21:00
367	2	42	4	18	53	f	2018-01-02 15:50:00	2018-01-02 17:55:00
368	abc	2	4	18	53	f	2018-01-11 11:30:00	2018-01-11 13:30:00
369	wevwev	2	4	18	53	f	2018-01-12 09:02:00	2018-01-12 11:02:00
325	xs	8	4	18	53	f	2017-11-08 22:01:00	2017-11-09 21:02:00
332	wevw	8	4	18	53	f	2017-12-02 14:54:00	2017-12-02 17:54:00
338	1	8	4	18	53	f	2017-12-21 11:32:00	2017-12-22 12:32:00
341	2	2	4	18	53	f	2017-12-03 11:35:00	2017-12-03 12:35:00
356	dédé	42	3	18	42	f	2017-12-20 16:11:00	2017-12-21 02:11:00
65	test 20	2	1	6	1	f	2017-07-19 12:12:00	2017-07-19 12:17:00
114	test 35	2	1	4	1	f	2011-11-11 14:40:00	2011-11-11 14:51:00
457	Protractor test	56	4	18	5	t	2018-02-02 16:19:00	2018-02-02 18:19:00
113	test 35	2	1	18	1	f	2010-10-11 14:40:00	2010-10-11 17:50:00
374	6o	42	2	3	17	f	2018-01-23 11:50:00	2018-01-24 02:15:00
53	test 15	2	3	3	1	f	2017-07-19 08:58:00	2017-07-19 09:08:00
344	4	8	4	18	53	f	2017-12-22 14:52:00	2017-12-22 16:52:00
216	TOO	2	1	1	1	f	2017-08-24 16:51:00	2017-08-24 17:51:00
217	ONE	2	1	1	1	f	2017-08-24 16:51:00	2017-08-24 17:51:00
218	TREE	2	1	1	1	f	2017-08-24 12:00:00	2017-08-24 15:00:00
219	Time Spent	2	1	1	1	f	2017-08-30 09:14:00	2017-08-30 10:14:00
345	5	8	4	18	53	f	2017-12-22 14:52:00	2017-12-24 14:52:00
346	6	8	4	18	53	f	2017-12-22 12:30:00	2017-12-22 17:30:00
76	test 26	2	1	6	54	f	2017-12-12 14:09:00	2017-12-12 14:19:00
334	15	2	4	18	53	f	2017-12-12 15:25:00	2017-12-12 19:25:00
328	xl	8	4	18	47	f	2013-12-08 23:01:00	2013-12-09 10:00:00
401	cs	42	4	18	56	f	2018-01-25 15:00:00	2018-01-25 22:00:00
400	wevew	42	2	18	53	f	2018-01-26 01:00:00	2018-01-24 02:15:00
458	Protractor test 2	56	4	18	5	f	2018-02-02 12:00:00	2018-02-02 13:00:00
40	test 2	2	2	1	4	f	2018-06-07 04:59:00	2018-06-07 05:24:00
371	12	42	4	8	53	f	2018-01-04 10:16:00	2018-01-04 12:45:00
352	545	42	2	2	49	f	2016-12-19 10:22:00	2016-12-19 12:22:00
393	wewe	42	4	18	53	f	2018-01-26 01:00:00	2018-01-26 02:00:00
397	wohbvi	42	4	18	53	f	2018-01-24 12:00:00	2018-01-24 13:00:00
57	test 19	2	1	2	1	f	2017-07-19 09:07:00	2017-07-19 09:08:00
56	test 18	2	1	5	1	f	2017-07-19 09:07:00	2017-07-19 09:11:00
333	14	2	4	18	53	f	2017-12-12 09:25:00	2017-12-13 09:24:00
44	test 6	2	3	3	41	f	2018-06-07 05:22:00	2018-06-07 05:29:00
337	bqivbu	2	4	18	53	f	2017-12-13 14:27:00	2017-12-14 10:27:00
372	4x	42	4	18	53	f	2018-01-20 10:25:00	2018-01-20 23:21:00
330	wevi	8	4	18	53	f	2017-12-11 12:11:00	2017-12-11 22:39:00
354	cad	42	4	3	51	f	2017-12-21 16:10:00	2017-12-22 17:10:00
360	546	42	4	18	53	f	2017-12-27 10:20:00	2017-12-27 16:02:00
109	test 310	2	1	4	1	f	2017-07-07 14:38:00	2017-07-07 14:45:00
82	test 290	2	4	3	1	f	2017-07-21 14:14:00	2017-07-21 14:34:00
388	wjnvj	2	4	18	53	f	2018-01-24 16:50:00	2018-01-26 13:57:00
390	cbhqb	2	4	18	53	f	2018-01-24 16:51:00	2018-01-26 13:58:00
391	dw	2	4	18	53	f	2018-01-24 16:51:00	2018-01-26 14:26:00
331	qec	8	4	18	53	f	2017-02-07 09:11:00	2017-02-07 21:11:00
41	test 3	2	2	4	2	f	2018-06-07 04:59:00	2018-06-07 15:19:00
163	tests 1	2	1	6	4	f	2017-07-27 10:35:00	2017-07-27 11:35:00
69	test 23	2	1	7	42	f	2017-07-21 13:43:00	2017-07-21 17:41:00
71	tests 25	2	1	1	6	f	2017-07-28 12:00:00	2017-07-28 14:12:00
342	3	2	4	18	53	f	2017-12-05 11:37:00	2017-12-05 11:43:00
43	Test 5	2	1	1	1	f	2018-06-07 05:03:00	2018-06-07 05:18:00
348	8	8	4	18	53	f	2017-12-15 14:54:00	2017-12-15 05:24:00
351	y	42	1	7	44	f	2015-12-21 10:21:00	2015-12-21 22:21:00
349	10	8	4	18	52	f	2017-12-13 14:55:00	2017-12-13 10:58:00
339	22	8	4	18	53	f	2017-12-20 11:33:00	2017-12-22 09:08:00
394	cwe	42	4	18	53	f	2018-01-26 01:00:00	2018-01-26 12:00:00
395	wevwe	42	4	18	53	f	2018-01-25 12:00:00	2018-01-26 01:00:00
355	54	42	3	7	5	f	2017-12-22 16:12:00	2017-12-22 18:11:00
335	wevwe	2	4	18	53	f	2017-12-12 15:50:00	2017-12-14 12:53:00
381	12d1	2	4	18	53	f	2018-01-24 16:28:00	2018-01-25 04:28:00
373	56	42	4	18	53	f	2018-01-17 17:45:00	2018-01-18 00:10:00
362	ex	42	1	18	56	f	2017-12-28 10:12:00	2017-12-28 22:12:00
364	342	42	4	18	4	f	2018-01-10 15:56:00	2018-01-10 18:28:00
365	5555	42	6	4	44	f	2018-01-28 10:50:00	2018-01-19 12:22:00
398	xasx	42	4	18	53	f	2018-01-24 12:13:00	2018-01-24 13:00:00
80	test 28	2	1	6	1	f	2012-12-12 14:14:00	2012-12-12 14:24:00
70	test 24	2	1	18	48	f	2017-02-12 13:44:00	2017-02-12 13:54:00
220	test 777	2	1	1	1	f	2017-08-31 11:19:00	2017-08-31 12:19:00
236	descr2	2	4	18	53	f	2017-11-15 10:35:00	2017-11-15 16:35:00
238	test it	2	4	18	53	f	2017-11-15 10:42:00	2017-11-15 16:42:00
54	test 16	2	1	1	2	f	2017-07-19 09:02:00	2017-07-19 09:17:00
353	ql¨	42	2	4	40	f	2017-12-21 10:22:00	2017-12-22 10:22:00
389	qc	2	4	18	53	f	2018-01-24 16:51:00	2018-01-26 14:01:00
392	rer	2	4	18	53	f	2018-01-24 16:52:00	2018-01-27 04:52:00
162	tests	2	1	3	6	f	2017-02-15 12:00:00	2017-02-15 13:00:00
68	test 22	2	1	1	1	f	2017-07-18 13:19:00	2017-07-18 13:21:00
396	hwevuhwe	42	3	18	53	f	2018-01-26 00:00:00	2018-01-26 22:00:00
359	133	42	3	5	6	f	2017-12-27 10:10:00	2017-12-27 14:05:00
108	test 30	2	1	5	6	f	2017-07-07 17:40:00	2017-07-07 20:37:00
336	16	2	4	18	53	f	2017-12-11 16:20:00	2017-12-11 18:20:00
340	1	2	4	18	53	f	2017-12-20 11:35:00	2017-12-20 13:35:00
309	v	8	2	16	53	f	2016-11-22 11:45:00	2016-11-23 08:15:00
270	blick	8	1	18	53	f	2012-11-13 10:23:00	2012-11-13 22:29:00
347	7	8	4	18	53	f	2017-12-15 14:53:00	2017-12-15 18:33:00
399	wev2	42	4	18	53	f	2018-01-25 12:13:00	2018-01-26 01:00:00
386	xq	2	4	18	53	f	2018-01-24 16:45:00	2018-01-26 11:45:00
343	21	8	4	18	46	f	2017-12-16 14:51:00	2017-12-17 15:51:00
308	glad	8	1	2	53	f	2017-11-13 14:45:00	2017-11-13 13:15:00
315	test RESTLET	8	1	18	53	f	2017-11-22 03:24:00	2017-11-22 10:24:00
316	test RESTLET	8	4	6	3	f	2017-04-08 23:01:00	2017-04-12 08:00:00
278	bf	8	3	18	53	f	2017-11-22 10:45:00	2017-11-22 13:15:00
47	test 9	2	2	2	4	f	2018-06-06 05:27:00	2018-06-06 09:32:00
361	55	42	4	1	3	f	2017-12-28 10:06:00	2017-12-28 04:06:00
\.


--
-- TOC entry 2456 (class 0 OID 0)
-- Dependencies: 191
-- Name: timeentry_id_seq; Type: SEQUENCE SET; Schema: timetracker; Owner: fluance
--

SELECT pg_catalog.setval('timeentry_id_seq', 484, true);


--
-- TOC entry 2431 (class 0 OID 147811)
-- Dependencies: 192
-- Data for Name: userprofile; Type: TABLE DATA; Schema: timetracker; Owner: fluance
--

COPY userprofile (id, username, password, employmentdegree, isadmin) FROM stdin;
4	reacher	5533e71346a93615820588323944378db4afe1951318769168ba85d5e00b637f2a77b18d00c67e05b8e299b9b15759a9ad69e923021249f46085f4059ca33ea3	0.20	f
5	trump	726e153fd283216e354c4250f6e30fa2255baa56a01dcf4a966ae790a8172796848a5c5dc54189b7904dc370d2f3865d78360b90de9c44dedafad1126ee1a99b	0.20	f
7	kl	6a10660ccdcb50be4b500c637d90e7f241129cbfb07ba28b73266e58a7919186d8419a1f253aca0bb530fa07a185ad56d2b12345973b6af6dec312a60f975610	1.00	f
8	doe	3321d11ab2b52e99d45b253c4c1ea81bbee760a331544eca0570adccdb459d68ae44f04c8a811b9fd6fa0c5ec164cd1968dde35b8ecc627357cbfea4644c68ea	1.00	t
61	test	3321d11ab2b52e99d45b253c4c1ea81bbee760a331544eca0570adccdb459d68ae44f04c8a811b9fd6fa0c5ec164cd1968dde35b8ecc627357cbfea4644c68ea	1.00	f
32	wock	3321d11ab2b52e99d45b253c4c1ea81bbee760a331544eca0570adccdb459d68ae44f04c8a811b9fd6fa0c5ec164cd1968dde35b8ecc627357cbfea4644c68ea	1.00	f
2	wayne	3321d11ab2b52e99d45b253c4c1ea81bbee760a331544eca0570adccdb459d68ae44f04c8a811b9fd6fa0c5ec164cd1968dde35b8ecc627357cbfea4644c68ea	0.40	t
42	ramah6	3321d11ab2b52e99d45b253c4c1ea81bbee760a331544eca0570adccdb459d68ae44f04c8a811b9fd6fa0c5ec164cd1968dde35b8ecc627357cbfea4644c68ea	1.00	t
56	testuser	5feba926f9eacbe69d195f7c434ccc7320a91e5eccab365cf86bea4ec878d5b8b02a2173b275b4f0d9c4b3a84f33757dfbc39596559fbe5825b0e1e5eceb8d99	1.00	f
60	admintestuser	5feba926f9eacbe69d195f7c434ccc7320a91e5eccab365cf86bea4ec878d5b8b02a2173b275b4f0d9c4b3a84f33757dfbc39596559fbe5825b0e1e5eceb8d99	1.00	t
\.


--
-- TOC entry 2457 (class 0 OID 0)
-- Dependencies: 193
-- Name: userprofile_id_seq; Type: SEQUENCE SET; Schema: timetracker; Owner: fluance
--

SELECT pg_catalog.setval('userprofile_id_seq', 89, true);


--
-- TOC entry 2290 (class 2606 OID 147829)
-- Name: client_pkey; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- TOC entry 2294 (class 2606 OID 147831)
-- Name: project_pkey; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- TOC entry 2297 (class 2606 OID 147833)
-- Name: task_pkey; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- TOC entry 2299 (class 2606 OID 147835)
-- Name: timeentry_pkey; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry
    ADD CONSTRAINT timeentry_pkey PRIMARY KEY (id);


--
-- TOC entry 2302 (class 2606 OID 147837)
-- Name: userprofile_pkey; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY userprofile
    ADD CONSTRAINT userprofile_pkey PRIMARY KEY (id);


--
-- TOC entry 2304 (class 2606 OID 147839)
-- Name: userprofile_username_key; Type: CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY userprofile
    ADD CONSTRAINT userprofile_username_key UNIQUE (username);


--
-- TOC entry 2291 (class 1259 OID 147840)
-- Name: fki_te_cli; Type: INDEX; Schema: timetracker; Owner: fluance
--

CREATE INDEX fki_te_cli ON client USING btree (id);


--
-- TOC entry 2300 (class 1259 OID 147841)
-- Name: fki_te_pers; Type: INDEX; Schema: timetracker; Owner: fluance
--

CREATE INDEX fki_te_pers ON userprofile USING btree (id);


--
-- TOC entry 2292 (class 1259 OID 147842)
-- Name: fki_te_proj; Type: INDEX; Schema: timetracker; Owner: fluance
--

CREATE INDEX fki_te_proj ON project USING btree (id);


--
-- TOC entry 2295 (class 1259 OID 147843)
-- Name: fki_te_task; Type: INDEX; Schema: timetracker; Owner: fluance
--

CREATE INDEX fki_te_task ON task USING btree (id);


--
-- TOC entry 2305 (class 2606 OID 147844)
-- Name: fk_te_clie; Type: FK CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry
    ADD CONSTRAINT fk_te_clie FOREIGN KEY (client_id) REFERENCES client(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2306 (class 2606 OID 147849)
-- Name: fk_te_pers; Type: FK CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry
    ADD CONSTRAINT fk_te_pers FOREIGN KEY (userprofile_id) REFERENCES userprofile(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2307 (class 2606 OID 147854)
-- Name: fk_te_proj; Type: FK CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry
    ADD CONSTRAINT fk_te_proj FOREIGN KEY (project_id) REFERENCES project(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2308 (class 2606 OID 147859)
-- Name: fk_te_task; Type: FK CONSTRAINT; Schema: timetracker; Owner: fluance
--

ALTER TABLE ONLY timeentry
    ADD CONSTRAINT fk_te_task FOREIGN KEY (task_id) REFERENCES task(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2437 (class 0 OID 0)
-- Dependencies: 8
-- Name: timetracker; Type: ACL; Schema: -; Owner: fluance
--

REVOKE ALL ON SCHEMA timetracker FROM PUBLIC;
REVOKE ALL ON SCHEMA timetracker FROM fluance;
GRANT ALL ON SCHEMA timetracker TO fluance;
GRANT USAGE ON SCHEMA timetracker TO dbtimetracker;


--
-- TOC entry 2438 (class 0 OID 0)
-- Dependencies: 184
-- Name: client; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON TABLE client FROM PUBLIC;
REVOKE ALL ON TABLE client FROM fluance;
GRANT ALL ON TABLE client TO fluance;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE client TO dbtimetracker;


--
-- TOC entry 2440 (class 0 OID 0)
-- Dependencies: 185
-- Name: client_id_seq; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON SEQUENCE client_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE client_id_seq FROM fluance;
GRANT ALL ON SEQUENCE client_id_seq TO fluance;
GRANT SELECT,USAGE ON SEQUENCE client_id_seq TO dbtimetracker;


--
-- TOC entry 2441 (class 0 OID 0)
-- Dependencies: 186
-- Name: project; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON TABLE project FROM PUBLIC;
REVOKE ALL ON TABLE project FROM fluance;
GRANT ALL ON TABLE project TO fluance;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE project TO dbtimetracker;


--
-- TOC entry 2443 (class 0 OID 0)
-- Dependencies: 187
-- Name: project_id_seq; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON SEQUENCE project_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE project_id_seq FROM fluance;
GRANT ALL ON SEQUENCE project_id_seq TO fluance;
GRANT SELECT,USAGE ON SEQUENCE project_id_seq TO dbtimetracker;


--
-- TOC entry 2444 (class 0 OID 0)
-- Dependencies: 188
-- Name: task; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON TABLE task FROM PUBLIC;
REVOKE ALL ON TABLE task FROM fluance;
GRANT ALL ON TABLE task TO fluance;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE task TO dbtimetracker;


--
-- TOC entry 2446 (class 0 OID 0)
-- Dependencies: 189
-- Name: task_id_seq; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON SEQUENCE task_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE task_id_seq FROM fluance;
GRANT ALL ON SEQUENCE task_id_seq TO fluance;
GRANT SELECT,USAGE ON SEQUENCE task_id_seq TO dbtimetracker;


--
-- TOC entry 2447 (class 0 OID 0)
-- Dependencies: 190
-- Name: timeentry; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON TABLE timeentry FROM PUBLIC;
REVOKE ALL ON TABLE timeentry FROM fluance;
GRANT ALL ON TABLE timeentry TO fluance;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE timeentry TO dbtimetracker;


--
-- TOC entry 2449 (class 0 OID 0)
-- Dependencies: 191
-- Name: timeentry_id_seq; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON SEQUENCE timeentry_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE timeentry_id_seq FROM fluance;
GRANT ALL ON SEQUENCE timeentry_id_seq TO fluance;
GRANT SELECT,USAGE ON SEQUENCE timeentry_id_seq TO dbtimetracker;


--
-- TOC entry 2450 (class 0 OID 0)
-- Dependencies: 192
-- Name: userprofile; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON TABLE userprofile FROM PUBLIC;
REVOKE ALL ON TABLE userprofile FROM fluance;
GRANT ALL ON TABLE userprofile TO fluance;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE userprofile TO dbtimetracker;


--
-- TOC entry 2452 (class 0 OID 0)
-- Dependencies: 193
-- Name: userprofile_id_seq; Type: ACL; Schema: timetracker; Owner: fluance
--

REVOKE ALL ON SEQUENCE userprofile_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE userprofile_id_seq FROM fluance;
GRANT ALL ON SEQUENCE userprofile_id_seq TO fluance;
GRANT SELECT,USAGE ON SEQUENCE userprofile_id_seq TO dbtimetracker;


--
-- TOC entry 1668 (class 826 OID 147864)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: timetracker; Owner: Michael
--

-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker REVOKE ALL ON SEQUENCES  FROM PUBLIC;
-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker REVOKE ALL ON SEQUENCES  FROM "Michael";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker GRANT SELECT,USAGE ON SEQUENCES  TO dbtimetracker;


--
-- TOC entry 1669 (class 826 OID 147865)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: timetracker; Owner: Michael
--

-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker REVOKE ALL ON TABLES  FROM PUBLIC;
-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker REVOKE ALL ON TABLES  FROM "Michael";
-- ALTER DEFAULT PRIVILEGES FOR ROLE "Michael" IN SCHEMA timetracker GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO dbtimetracker;


-- Completed on 2018-03-02 15:52:14 CET

--
-- PostgreSQL database dump complete
--
