import { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: string | MyJwtPayload;  // verify() の戻り値に合わせる
    }
  }
}

export {}