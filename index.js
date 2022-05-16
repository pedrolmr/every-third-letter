const express = require("express");
const app = express();
const pool = require("./db");
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({success: 'app is running...'})
})

app.get("/test", async (req, res) => {
  try {
    const allWords = await pool.query('SELECT * FROM word');

    res.json(allWords.rows);
  } catch (err) {
    console.error(err.message);
  }
});


function everyThreeLetter(string){
    let str = ""
    for(let i = 2; i < string.length; i += 3){
      str += string[i]
    }
    return str;
}

app.post("/test", async (req, res) => {
  try {
    console.log(req.body);
    const { string_to_cut } = req.body;
    const return_string = everyThreeLetter(string_to_cut);
    
    await pool.query(
      'INSERT INTO word (string_to_cut, return_string) VALUES ($1, $2) RETURNING *',
      [string_to_cut, return_string]
    );
    res.json({"return_string": return_string});
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});