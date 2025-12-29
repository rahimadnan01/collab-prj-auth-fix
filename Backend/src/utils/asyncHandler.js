export const asyncHandler = (fn) => (req, res, next) => {
  const safeNext = typeof next === "function" ? next : (err) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  };

  Promise.resolve(fn(req, res, safeNext)).catch(safeNext);
};
