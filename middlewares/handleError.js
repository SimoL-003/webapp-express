export default function handleError(err, req, res, next) {
  const environment = process.env.ENVIRONMENT;

  res.status(500);
  return res.json({
    error: {
      code: "Internal Server Error",
      message: environment === "dev" ? err.toString() : "Something went wrong",
    },
  });
}
