const { spawn } = require("child_process");
const path = require("path");
const mongoDb = require("../db/connect.js");
const fs = require("fs");
const ObjectID = require("mongodb").ObjectId;

const pythonScriptPath = path.join(
  __dirname,
  "../python/pdfToJsonConverter.py"
);

const pythonInterpreter = path.join(
  __dirname,
  "../python/venv/Scripts/python.exe"
);
const tempPDFPath = path.join(__dirname, `../temp/temp_${Date.now()}.pdf`);

const convertPDFToJSON = async (req, res, next) => {
  let errorOutput = "";
  let output = "";  // Changed from array to string
  
  try {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const fileId = ObjectID.createFromHexString(id);

    const db = await mongoDb.getDB();
    const pdfCollection = db.collection("MemberRecordsPDF");
    const fileDoc = await pdfCollection.findOne({ _id: fileId });

    if (!fileDoc || !fileDoc.data) {
      return res.status(404).json({ error: "PDF not found" });
    }

    const pdfFile = fileDoc.data.buffer;
    fs.writeFileSync(tempPDFPath, pdfFile);

    // Init python child process
    const python = spawn(pythonInterpreter, [pythonScriptPath, tempPDFPath]);

    // Collect output from Python script
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Collect error output
    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Handle when Python script finishes
    python.on("close", async (code) => {
      try {
        // Clean up temp file
        await fs.promises.unlink(tempPDFPath);
        console.log("Temp PDF deleted");
      } catch (unlinkErr) {
        console.error("Failed to delete temp file:", unlinkErr);
      }

      if (code !== 0) {
        console.error("Python script error:", errorOutput);
        return res.status(500).json({
          message: "Python script failed",
          error: errorOutput
        });
      }

      // parse the complete output
      try {
        const parsed = JSON.parse(output);
        console.log(`Successfully parsed ${parsed.length} members from PDF`);

        const db = await mongoDb.getDB();
        const memberCollection = db.collection("Members");

        await memberCollection.insertMany(parsed);

        return res.status(200).json(parsed);
      } catch (err) {
        console.error("JSON parsing error:", err.message);
        console.error("Raw output:", output);
        return res.status(500).json({
          message: "Failed to parse JSON",
          error: err.message
        });
      }
    });

    // Handle Python process errors
    python.on("error", (err) => {
      console.error("Failed to start Python process:", err);
      return res.status(500).json({
        message: "Failed to start Python process",
        error: err.message
      });
    });

  } catch (error) {
    console.error("Error Converting PDF to JSON", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  convertPDFToJSON,
};