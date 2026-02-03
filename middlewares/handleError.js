export default function handleError(err, req, res, next) {
  const environment = process.env.ENVIRONMENT;

  res.status(500);
  return res.json({
    error: {
      code: environment === "dev" ? err.toString() : "Internal Server Error",
      message: "Something went wrong",
    },
  });
}
