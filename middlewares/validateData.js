function validateData(req, res, next) {
  const { name, text, vote } = req.body;

  if (vote < 1 || vote > 5) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Vote must be between 1 and 5",
      },
    });
  }

  if (!name || !vote) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Name and vote are required",
      },
    });
  }

  if (text && text.length > 500) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Text must be less than 500 characters",
      },
    });
  }

  console.log("Dati validati");

  next();
}

export default validateData;
