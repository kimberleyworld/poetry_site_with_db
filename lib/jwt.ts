import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface AdminTokenPayload {
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export function generateAdminToken(): string {
  const payload: AdminTokenPayload = {
    isAdmin: true
  };
  
  // Token expires in 24 hours
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '24h' });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload & AdminTokenPayload;
    return decoded;
  } catch {
    // Token is invalid or expired
    return null;
  }
}
