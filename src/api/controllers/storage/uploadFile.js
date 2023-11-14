export default async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json("No file uploaded!");
      return;
    }
    res.json({ message: "Upload file successful!", data: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};