function notFound(req, res, next) {
  res.status(404);
  return res.json({
    error: {
      code: "Not Found",
      message: "Page not found",
    },
  });
}

export default notFound;
