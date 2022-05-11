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
    
    const newWord = await pool.query(
      'INSERT INTO word (string_to_cut, return_string) VALUES ($1, $2) RETURNING *',
      [string_to_cut, return_string]
    );

    const id = newWord.rows[0].word_id;
    const single_word = await pool.query("SELECT return_string FROM word WHERE word_id = $1", [
        id,
    ]);

    res.json(single_word.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});