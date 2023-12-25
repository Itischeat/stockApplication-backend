const db = require("../db")

class Controller {
    async creatPoduct(req, res) {
        try {
            const {
                stock,
                stockMan,
                product,
                quantity,
                weight,
                price,
            } = req.body
            await db.query('INSERT INTO stocker(Склад, Кладовщик, Товар, Количество, Вес_штуки, Вес_полный, Цена_штуки, Цена_полная) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [
                    stock,
                    stockMan,
                    product,
                    quantity,
                    weight,
                    weight * quantity,
                    parseInt(price),
                    price * quantity,
                ]
            )
            res.json('200')
        } catch (e) {
            res.json(e)
        }
    }
    async accessAdmin(req, res) {
        const { name, password } = req.body
        if (name == 'admin' && password == '12345678') {
            res.json('isAdmin')
        } else {
            res.json('noAdmin')
        }
    }

    async findProduct(req, res) {
        const infoProduct = req.query
        console.log(infoProduct)
        const dbres = await db.query(`SELECT * FROM stocker where Склад = '${infoProduct.stock}' and Товар = '${infoProduct.product}'`)
        res.json(dbres)
    }

    async deleteProduct(req, res) {
        const { stock, product } = req.body
        const dbReq = await db.query(`DELETE FROM stocker where Склад = '${stock}' and Товар = '${product}'`)
        res.json(dbReq)
    }

    async updateProduct(req, res) {
        try {
            const { stock, product, quantity, price } = req.body
            await db.query(`UPDATE stocker SET Количество = $1, Цена_штуки = $2 where Склад = $3 and Товар = $4`, [quantity, price, stock, product])
            res.json('200')
        } catch (e) {
            res.json(e)
        }

    }
}
module.exports = new Controller()