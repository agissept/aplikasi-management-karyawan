# Program Aplikasi Management Karyawan
Semua file python merupakan aplikasi backend, untuk mengedit frontend silakan buka folder public

## Installation
1. Pastikan Anda telah memiliki python3
2. Masuk ke folder terminal/cmd project ini, contohnya
3. Install dependensi/library yang diperlukan dengan cara jalankan perintah berikut di terminal/cmd
    ```
    pip install -r requerements.txt 
    ```
4. Isi file `.env` sesuai dengan konfigurasi yang Anda miliki, contohnya
    ```
    HOST=localhost
    PORT=8000
    DEBUG=true
        
    DATABASE_URL=localhost
    DATABASE_PORT=3306
    DATABASE_USERNAME=root
    DATABASE_PASSWORD=root
    DATABASE_NAME=kepegawaian
    ```
5. Lakukan migrasi file sql yang berada di folder database
6. Jalankan aplikasi dengan menggunakan perintah
    ```
    python3 main.py
    ```
7. Setelah aplikasi dijalankan lalu buka browser dan ketika alamat dengan format `HOST:PORT`, host dan port diambil dari file .env, contohnya seperti ini
    ```
    localhost:8000
    ```
## Referensi Belajar
- Apa itu rest api https://www.mii.co.id/en/insight/listing/2021/06/21/03/58/konsep-restful-api-programming-bagian-1
- Apa itu flask https://id.wikipedia.org/wiki/Flask
- Dokumentasi Flask https://flask.palletsprojects.com/en/2.2.0/
- Flask Tutorial https://www.youtube.com/watch?v=GMppyAPbLYk&t=2936s
- Rest API Di Flask https://flask-restful.readthedocs.io/en/latest/intermediate-usage.html
- Cara mencoba api menggunakan postman https://www.youtube.com/watch?v=DEO_xM17vsI
- Cara mengambil data dari api menggunakan javascript https://www.proweb.co.id/articles/js/async-await-fetch.html
