import psycopg
import random

with psycopg.connect(user = "ffesmtozmpyghm",
                             password = "dc203ed02f12dcc3b402201415eba2ee53a891196a69de65d6494c304b27cffa",
                             host = "0.0.0.0",
                             port = "5442",
                             dbname = "MainSchedular_DB") as conn:

    with conn.cursor() as cur:


        #Classroom Table
        for i in range(1):
            rand = random.randrange(51)
            name = "BIT " + str(rand)
            capacity = random.randrange(151)
            cur.execute("INSERT INTO classroom (capacity, classroom_name) VALUES (%s, %s)",
                    (capacity, name))


        #Course Table
        for i in range(1):
            rand = random.randrange(51)
            num = "CST " + str(rand)

            units = random.randrange(5)
            num_per_week = random.randrange(5)
            capacity = random.randrange(100)
            s = "0" + str(random.randrange(1,10))

            cur.execute("INSERT INTO course (name, units, number_per_week, sync_time, capacity, section, course_group) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        (num, units, num_per_week, True, capacity, s, "TESTING_SCRIPT"))


