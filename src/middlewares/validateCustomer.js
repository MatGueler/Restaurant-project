export default (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: 'All fields (name, email, phone) are required.' })
  }

  next()
}
