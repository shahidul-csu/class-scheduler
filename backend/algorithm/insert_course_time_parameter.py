import psycopg
import random

with psycopg.connect(user = "ffesmtozmpyghm",
                             password = "dc203ed02f12dcc3b402201415eba2ee53a891196a69de65d6494c304b27cffa",
                             host = "0.0.0.0",
                             port = "5442",
                             dbname = "MainSchedular_DB") as conn:

    with conn.cursor() as cur:

        # Clean the table
        cur.execute("TRUNCATE TABLE course_time_parameter")

        # Insert data into the course table
        cur.execute("SELECT * FROM course")
        result = cur.fetchall()

        print("Data: ")

        for i in result:
            course_id = i[0]
            name = i[1]
            print(*i, sep=",")

            cur.execute("INSERT INTO course_time_parameter (course_id_id, parameter_id_id, time_slot_id_id) VALUES (%s,%s,%s)", (course_id, 5, 12))
