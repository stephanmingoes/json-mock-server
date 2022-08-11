import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is live",
  });
});

app.get("/:username/:reponame/:jsonfile", async (req, res) => {
  const { username, reponame, jsonfile } = req.params;
  try {
    const data = await axios.get(
      `https://api.github.com/repos/${username}/${reponame}/contents/${jsonfile}`
    );

    const jsonContent = JSON.parse(
      Buffer.from(data.data.content, "base64").toString("ascii")
    );
    res.json(jsonContent);
  } catch (error) {
    res.status(400).json({
      message:
        "Something went wrong, ensure that the *JSON* file is in the root of the repository.",
    });
    console.log(error);
  }
});

app.listen(port, () =>
  console.log(`Express is listening at http://localhost:${port}`)
);
