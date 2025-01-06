import { type JwtPayload, jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';


// Extending the JwtPayload interface to include additional data fields specific to the application.
interface ExtendedJwt extends JwtPayload {
  data:{
    user:string,
    email:string,
    id:string
    firstName:string,
    lastName:string,
    password:string
  }
};

class AuthService {
  // This method decodes the JWT token to get the user's profile information.
  getProfile() {
    // jwtDecode is used to decode the JWT token and return its payload.
    return jwtDecode<ExtendedJwt>(this.getToken());
  }

  // This method checks if the user is logged in by verifying the presence and validity of the token.
  loggedIn() {
    const token = this.getToken();
    // Returns true if the token exists and is not expired.
    return !!token && !this.isTokenExpired(token);
  }

  // This method checks if the provided token is expired.
  isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken = jwt.decode(token) as { exp: number } | null;
  
      if (!decodedToken || !decodedToken.exp) {
        // If the token is invalid or does not have an expiration time, consider it expired
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);

      // Return true if the token is expired, otherwise return false
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      // If an error occurs, consider the token expired
      return true;
    }
    };


  // This method retrieves the token from localStorage.
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    // Returns the token stored in localStorage.
    return loggedUser;
  }

  // This method logs in the user by storing the token in localStorage and redirecting to the home page.
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // This method logs out the user by removing the token from localStorage and redirecting to the home page.
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
