const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const client = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_bookmark')
const PORT = 3000

const Bookmark = client.define('bookmarks', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
            }
        },
    category: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
            }
        },
    })
const setup = async () =>{
    await client.sync({force: true });
    await Bookmark.create({name: 'linkedin.com', category: 'jobs' });
    await Bookmark.create({name: 'indeed.com', category: 'jobs' });
    await Bookmark.create({name: 'msdn.com', category: 'code' });
    await Bookmark.create({name: 'stackoverflow.com', category: 'code' });
    await Bookmark.create({name: 'amazon.com', category: 'shopping' });
}

setup()

module.exports = {client, Bookmark}