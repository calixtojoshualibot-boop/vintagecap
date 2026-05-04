import express from "express";
import mysql from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// ✅ Serve Vite production build
app.use(express.static(path.join(__dirname, "dist")));

// ===== MySQL Pool =====
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT),
});

// ===== API =====

// GET
app.get("/api/items", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM items");
  res.json(rows);
});

// POST
app.post("/api/items", async (req, res) => {
  const { name, quality, year, image } = req.body;

  const [result] = await pool.query(
    "INSERT INTO items (name, quality, year, image) VALUES (?, ?, ?, ?)",
    [name, quality, year, image]
  );

  res.json({ id: result.insertId, ...req.body });
});

// PUT
app.put("/api/items/:id", async (req, res) => {
  const { name, quality, year, image } = req.body;

  await pool.query(
    "UPDATE items SET name=?, quality=?, year=?, image=? WHERE id=?",
    [name, quality, year, image, req.params.id]
  );

  res.json({ message: "Updated successfully" });
});

// DELETE
app.delete("/api/items/:id", async (req, res) => {
  await pool.query("DELETE FROM items WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted successfully" });
});

// ✅ IMPORTANT: SPA fallback (must be LAST route)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// START
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🎩 Server running on port ${PORT}`);
});
