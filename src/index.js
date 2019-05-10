const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const db = require("../db/db")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../public'))

app.listen(port, () => {
    console.log(`running server on port:  ${port}`);
})


app.get("/", (req, res, ) => {
    res.sendFile('index.html')
})

app.get("/contacts", (req, res) => {

    const sql = 'SELECT * FROM contacts'
    db.all(sql, (err, data) => {
        if (err) throw err;
        console.log('data berhasil di ambil')
        res.json(data)
    });
})


app.get("/contacts/:id", (req, res) => {
    const sql = "SELECT * FROM contacts WHERE id = ?"
    const params = req.params.id

    db.get(sql, params, (err, data) => {
        if (err) throw err;
        console.log('data berhasil di ambil')
        res.json(data)
    })
})


app.post("/contacts", (req, res) => {
    const sql = "INSERT INTO contacts(fullName,phoneNumber,email,gender) values(?,?,?,?)"
    const params = [req.body.fullName, req.body.phoneNumber, req.body.email, req.body.gender]

    db.run(sql, params, (err, data) => {
        if (err) throw err;
        console.log('data berhasil di tambah')
        res.json(data)
    })
})

//edit data
app.put("/contacts/:id", (req, res, ) => {
    const sql = `UPDATE contacts SET 
      fullName = ?,
      phoneNumber = ?, 
      email = ?,
      gender = ?
      where id = ?`
    const params = [req.body.fullName, req.body.phoneNumber, req.body.email, req.body.gender, req.params.id]

    db.run(sql, params, (err, data) => {
        if (err) throw err;
        console.log('data berhasil di edit')
        res.json(data)
    })

})

// Delete data
app.delete("/contacts/:id", (req, res, ) => {
    const sql = "DELETE FROM contacts where id = ?"
    const params = req.params.id

    db.run(sql, params, (err, data) => {
        if (err) throw err;
        console.log('data berhasil di hapus')
        res.json(data)
    })
})



