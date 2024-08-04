import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const { exp } = jwtDecode(token);
        if (exp < Date.now() / 1000) {
            return true;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }

    return false;
};
