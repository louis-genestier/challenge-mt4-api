# MT4 Challenge API

This was our final MT4 project. We had to design an API to handle different kind of challenges (shell, SGBDR etc...).  
This project uses VSCode's Devcontainer & Prettier, ESLint with Husky to ensure code quality.

## How to start the project ?

Once you have started the container in VSCode, you simply need to run:

```shell
npm run dev
```

And the API will be available at: `http://localhost:5050/`

## API documentation

### Authentication

| Method | Endpoint                                    | Body                                                                                                                | Headers                 | Response                                                       |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------- |
| POST   | /auth                                       | `first_name`: string <br> `last_name`: string<br> `email`: string<br> `password`: string<br> promotion_id: `number` |                         | User entity<br>`refreshToken`: string<br>`accessToken`: string |
| POST   | /auth/login                                 | `email`: string <br> `password`: string                                                                             |                         | User entity<br>`refreshToken`: string<br>`accessToken`: string |
| POST   | /auth/refresh_token                         |                                                                                                                     | `refresh-token`: string | `refreshToken`: string<br>`accessToken`: string                |
| POST   | /admin/auth/login (need to have admin role) | `email`: string <br> `password`: string                                                                             |                         | User entity<br>`refreshToken`: string<br>`accessToken`: string |

### Promotions

| Method | Endpoint                                                                          | Body | Headers                 | Response      |
| ------ | --------------------------------------------------------------------------------- | ---- | ----------------------- | ------------- |
| GET    | /promotions/:promotion_id/challenges/:challenge_id/grades.xlsx (need to be admin) |      | `Authorization`: string | xlsx document |

### Instances

| Method | Endpoint                                     | Body                           | Headers                 | Response        |
| ------ | -------------------------------------------- | ------------------------------ | ----------------------- | --------------- |
| POST   | /instances                                   | `ip`: string<br>`user`: string | `Authorization`: string | Instance entity |
| GET    | /instances (returns current user's instance) |                                | `Authorization`: string | Instance entity |

### Challenges

| Method | Endpoint                        | Body | Headers                 | Response                    |
| ------ | ------------------------------- | ---- | ----------------------- | --------------------------- |
| GET    | /challenges (need to be admin)  |      | `Authorization`: string | Array of Challenge entities |
| GET    | /challenges/:challenge_id       |      | `Authorization`: string | Challenge entity            |
| POST   | /challenges/:challenge_id/close |      | `Authorization`: string | Challenge entity            |
| GET    | /challenges/:challenge_id/start |      | `Authorization`: string | Grade <br> Failed question  |
