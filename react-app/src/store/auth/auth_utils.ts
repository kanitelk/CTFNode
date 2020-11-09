import jwt_decode from "jwt-decode";

/**
 * Check JWT for valid and return user date from token
 * @param  {string|null} token?
 */
export const check_auth_token = (token?: string | null) => {
  if (!token) token = localStorage.getItem("token");
  if (!token) return null;

  let decoded: any = null;
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    return null;
  }

  if (new Date(decoded.exp * 1000).getTime() < new Date().getTime())
    return null;

  if (decoded) {
    return {
      _id: decoded.id,
      login: decoded.login,
      role: decoded.role,
    };
  } else {
    return null;
  }
};

export const clear_token = () => {
  localStorage.removeItem("token");
};
