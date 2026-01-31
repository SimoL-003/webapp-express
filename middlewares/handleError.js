export default function handleError(err, req, res, next) {
  const environment = process.env.ENVIRONMENT;

  res.status(500);

  return res.json({
    error: environment === "dev" ? err.toString() : "Internal Error",
    message: "Something went wrong",
  });
}
