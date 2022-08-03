import os

from dotenv import load_dotenv

import pymysql.cursors

load_dotenv()


def getCursor():
    connection = pymysql.connect(
        host=os.getenv('DATABASE_URL'),
        port=int(os.getenv('DATABASE_PORT')),
        user=os.getenv('DATABASE_USERNAME'),
        password=os.getenv('DATABASE_PASSWORD'),
        database=os.getenv('DATABASE_NAME'),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

    return connection.cursor()
