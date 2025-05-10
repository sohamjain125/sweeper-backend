# Sweeper Backend
## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for Authentication
- Joi for Validation
- bcrypt for Password Hashing

## Project Structure

```
src/
├── app/
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── middlewares/
│   │   └── validators/
│   │       └── auth.validator.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   └── services/
│       └── auth.service.ts
├── core/
│   ├── constants/
│   │   └── cloud.constants.ts
│   ├── handlers/
│   │   ├── error.handlers.ts
│   │   └── response.handler.ts
│   ├── interfaces/
│   │   ├── admin.interface.ts
│   │   └── user.interface.ts
│   └── utils/
│       └── util.ts
└── data/
    ├── dal/
    │   ├── admin.dal.ts
    │   └── user.dal.ts
    └── models/
        ├── admin.model.ts
        └── user.model.ts
```

## API Endpoints

### User Authentication

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phoneNumber": "1234567890",
    "profile": "https://example.com/profile.jpg"
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Admin Authentication

#### Register Admin
```http
POST /api/admin/register
Content-Type: application/json

{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "password": "admin123",
    "phoneNumber": "1234567890",
    "profile": "https://example.com/profile.jpg"
}
```

#### Login Admin
```http
POST /api/admin/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "admin123"
}
```

## Validation Rules

### User/Admin Registration
- First Name: Required, 2-50 characters
- Last Name: Required, 2-50 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Phone Number: Required, 10 digits
- Profile: Optional, string URL

### User/Admin Login
- Email: Required, valid email format
- Password: Required

## Response Format

### Success Response
```json
{
    "data": {
        // Response data
    },
    "status": 200,
    "message": "Success message"
}
```

### Error Response
```json
{
    "error": "Error message",
    "status": 400,
    "message": "Error description"
}
```

## Security Features

1. **Password Security**
   - Passwords are hashed using bcrypt
   - Minimum password length requirement
   - Secure password comparison

2. **Token Security**
   - JWT-based authentication
   - Access token (24h expiry)
   - Refresh token (30d expiry)
   - Role-based access control

3. **Input Validation**
   - Comprehensive input validation
   - Email format validation
   - Phone number format validation
   - Required field validation

## Error Handling

The system implements comprehensive error handling for:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Conflict errors (409)
- Server errors (500)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   JWT_SECRET=your_jwt_secret
   MONGODB_CONNECTION_URL=your_mongodb_url
   PORT=3000
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Testing

You can test the API endpoints using Postman or any API testing tool. Example test cases are provided in the API Endpoints section.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 