export const getRoleFromRequest = (req) => {
  return req.headers["x-user-role"] || "student";
};
