# auth-service

Internal authentication service handling login, token issuance, and session
validation for ext-hda apps.

## Endpoints

- `POST /login` — authenticate a user and issue a JWT
- `POST /register` — create a new user account
- `GET /verify` — validate a JWT and return the associated user

## Development

npm install
npm test
npm start