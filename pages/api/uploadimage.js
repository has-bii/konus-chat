import fs from "fs";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({});

    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file);
      return res.status(201).json({ message: "File uploaded" });
    });
  } else {
    res.status(400).json({ message: "Invalid request method!" });
  }
}

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/profile/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};
