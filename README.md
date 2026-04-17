# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

### POST /gacha/play

Melakukan gacha
Requirement: user harus sudah melakukan login menggunakan request.user.id dr authentication.
Request: hanya dari user login dan tidak perlu body
Response:
{
"message": "Selamat, kamu mendapatkan hadiah!",
"isWin": true,
"prize": "Smartphone X"
}

### GET /gacha/log

Melihat log gacha/histori dari user
Requirement: User harus sudah login
Request: Tidak ada parameter
Response:
{ "isWin": true,
"prizeId": { "name": "Pulsa Rp50.000" },
"createdAt": "2026-04-17T10:00:00.000Z"
}

### GET /gacha/prizes

Melihat daftar hadiah dan sisa kuota hadiah
Request: Tidak ada parameter
Response:
{
"name": "Emas 10 gram",
"quota": 1
},
{
"name": "Pulsa Rp50.000",
"quota": 500
}

### GET /gacha/winners

Melihat daftar pemenang dengan nama yang disamarkan
Request: Tidak ada parameter
Response:
{
"name": "J* D*e",
"prize": "Smartphone X"
}
