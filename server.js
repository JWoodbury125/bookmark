const Sequelize = require('sequelize')
const client = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_bookmarks')
const { db, Bookmark } = require('./db')
const express = require ('express')
const { request } = require('express')
const app = express()

app.get('/', (req, res) => res.redirect('/bookmarks'))
app.get('/bookmarks', async (req, res, next) =>{
    try{
        const data = await Bookmark.findAll()
        const html = `<html><h1>Acme Bookmarks</h1><body>${data.map(val => `<ul>${val.name} <a href='/categories/${val.category}'> ${val.category}</a></ul>`).join('')}</body></html>`
        res.send(html)
    }
    catch(ex){
        next(ex)
    }

})
app.get('/categories/:category', async(req, res, next) => {
    try{
        const category = req.params.category
        const data = await Bookmark.findAll({
            where: { category }
        })
        const html = data.map(val => `<ul>${val.name}</ul>`).join('')
        res.send(`<html><a href='/bookmarks'> Previous>></a>
                    <h1> Acme Bookmarks ${ req.params.category } </h1>
                    <div>
                        ${html}
                    </div>
                  </html>`)
    }
    catch(ex){
        next(ex)
    }
})


app.listen(3000,() => console.log('Connected'))