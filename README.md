#Upute

Skini sve pakete sa npm i
Env podatke prekopiraj te napravi identicni db ili svoje:
PORT = 3001
debug = true

DB_HOST = localhost
DB_PORT = 5432
DB_NAME = cron_job
DB_USER = postgres
DB_PASSWORD = postgres


##Cron job
Primjer gdje se vrti svakih 5 sekundi konstantno /5

Te primjer gdje se vrti samo 9 sekundu u 60 sekundi;

Format je * * * * * * -> sekunde(59) , minute(59) sati(23) ...