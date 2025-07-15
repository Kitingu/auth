import { decodeToken as decodeJwtToken } from "react-jwt";

const decodeToken = (token) => {
    try {
        // Decode the token without verifying the signature
        const decoded = decodeJwtToken(token);

        if (!decoded) {
            throw new Error('Failed to decode token');
        }

        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export default decodeToken;
