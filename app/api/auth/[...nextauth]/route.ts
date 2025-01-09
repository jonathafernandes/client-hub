import { authOptions } from "../../../_lib/auth"
import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        isAdmin: boolean;
    }

    interface Session {
        user: User;
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
