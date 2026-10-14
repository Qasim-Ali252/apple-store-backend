# Apple Store Backend

Node.js + Express + MongoDB API for the Apple Store frontend. Auth stays on Firebase:
the frontend sends its Firebase ID token and the backend verifies it with `firebase-admin`.

## Folder structure

```
backend/
├── src/
│   ├── server.js            # starts the server, connects MongoDB
│   ├── app.js               # express app, middleware, route mounting
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   └── firebase.js      # firebase-admin setup
│   ├── middleware/
│   │   ├── authMiddleware.js   # verifies Firebase ID token -> req.user
│   │   └── errorMiddleware.js  # 404 + error handler
│   ├── models/              # Product, User, Cart, Wishlist, Order
│   ├── controllers/         # request logic per resource
│   ├── routes/              # URL -> controller mapping
│   ├── seed/seedProducts.js # imports DummyJSON products into MongoDB
│   └── utils/asyncHandler.js
├── .env.example
└── package.json
```

## Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI and Firebase Admin credentials
npm run seed           # optional: load products from DummyJSON
npm run dev            # http://localhost:5000
```

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | /api/health | – | health check |
| GET | /api/products?limit=&skip= | – | list products |
| GET | /api/products/search?q= | – | search by title |
| GET | /api/products/categories | – | list categories |
| GET | /api/products/category/:category | – | products in a category |
| GET | /api/products/:id | – | one product |
| GET / POST / DELETE | /api/cart | ✓ | get, add item, clear |
| PUT / DELETE | /api/cart/:id | ✓ | change quantity, remove item |
| GET / DELETE | /api/wishlist | ✓ | get product ids, clear |
| POST | /api/wishlist/:productId | ✓ | toggle a product |
| GET / POST | /api/orders | ✓ | my orders, place order |
| GET | /api/orders/:orderId | ✓ | one order |
| POST | /api/users/sync | ✓ | create/update profile after sign in |
| GET / PUT | /api/users/me | ✓ | read/update profile |

Protected routes need `Authorization: Bearer <token>`, where the token comes from
`await auth.currentUser.getIdToken()` on the frontend.
