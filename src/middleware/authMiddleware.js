import getFirebaseAdmin from "../config/firebase.js";

// Verifies the Firebase ID token sent by the frontend:
//   Authorization: Bearer <await auth.currentUser.getIdToken()>
export const protect = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = await getFirebaseAdmin().auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
