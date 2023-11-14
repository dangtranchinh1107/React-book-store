import express from 'express';
import bookModel from '../models/bookModel.js';

const routerBook = express.Router();

// tạo mới
routerBook.post('/createbook', async (req, res) => {
    try {
        const body = req.body;

        const createBook = await bookModel.create(body);
        if (!createBook) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' })
        }
        return res.status(200).send(createBook)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})
// lấy danh sách
routerBook.get('/listbook', async (req, res) => {
    try {
        const listBook = await bookModel.find({});

        return res.status(200).json({ count: listBook.length, data: listBook })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})
// lấy sản phẩm
routerBook.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const detailBook = await bookModel.findById(id);
        if (!detailBook) {
            return res.status(400).json({ message: 'not book' })
        }
        return res.status(200).json({ data: detailBook })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})
// update sản phẩm
routerBook.put('/updatebook/:id', async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        if (
            !body
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const updatebook = await bookModel.findByIdAndUpdate(id, body);
        if (!updatebook) {
            return res.status(400).json({ message: 'Book not found' })
        }
        return res.status(200).json({ data: updatebook })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})
// xóa sản phẩm
routerBook.delete('/deletebook/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBook = await bookModel.findByIdAndDelete(id);
        if (!deleteBook) {
            return res.status(400).json({ message: 'not book' })
        }
        return res.status(200).json({ message: 'delete' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


export default routerBook;