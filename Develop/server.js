const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const getNotes = () =>
	fetch("/api/notes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).catch((error) => console.log(error));

app.get("/api/notes", async (req, res) => {
	try {
		const data = await readFileAsync("./db/db.json", "utf8");
		const notes = JSON.parse(data);
		console.log("Sending back notes:", notes); 
		res.json(notes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error reading notes" });
	}
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", (req, res) => {
	
});

app.post("/api/notes", async (req, res) => {
	try {
	
		const data = await readFileAsync("./db/db.json", "utf8");
		const notes = JSON.parse(data);

	
		const newNote = req.body;
		newNote.id = uuidv4(); 

		
		notes.push(newNote);

		
		await writeFileAsync("./db/db.json", JSON.stringify(notes));

		
		res.json(newNote);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error saving the note" });
	}
});

app.delete("/api/notes/:id", (req, res) => {
	
});

app.get("/api/notes", async (req, res) => {
	try {
		const data = await readFileAsync("./db/db.json", "utf8");
		const notes = JSON.parse(data);
		res.json(notes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error reading notes" });
	}
});
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
