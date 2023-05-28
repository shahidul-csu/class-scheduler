import psycopg

#Connect to Database
with psycopg.connect(user = "ffesmtozmpyghm",
                             password = "dc203ed02f12dcc3b402201415eba2ee53a891196a69de65d6494c304b27cffa",
                             host = "0.0.0.0",
                             port = "5442",
                             dbname = "MainSchedular_DB") as conn:
###########################################################################################################

    #Classroom Table
    print("Data from Classroom Table:")
    with conn.cursor() as cur:

        cur.execute("SELECT * FROM classroom")
        
        result = cur.fetchall()

        print("Data: ")

        for i in result:
            print(*i, sep=',')
    print()

##########################################################################################################



    #Course Table
    print("Data from Course Table:")  
    with conn.cursor() as cur:

        cur.execute("SELECT * FROM course")

        result = cur.fetchall()

        print("Data: ")

        for i in result:
            print(*i, sep=',')


