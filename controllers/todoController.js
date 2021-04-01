const Todo = require('./../models/Todo');

exports.getAllTodos = async(req, res) => {
    try {
        // sintaksa 1
        // const filteredTodos = await Todo.find({priority: "high"})
        // console.log(req);

        // menyra dinamike qe percaktohet nga perdoruesi
        // const filteredTodos = await Todo.find(req.query);

        const queryObj = {...req.query};
        console.log(queryObj);
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el])
        console.log(queryObj);

        const filteredTodos = await Todo.find()
        // const allTodos = await Todo.find();
        // res.render("index", {todo: allTodos});
        res.status(200).json({
            status: 'success',
            data: {
                todo: filteredTodos
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: 'No data found!'
        })
    }
}

exports.createTodo = async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = await Todo.create(req.body);
        // res.redirect('/');
        res.status(201).json({
            status: "success",
            data: {
                todo: newTodo
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

exports.deleteTodo = async (req, res) => {
        const {_id} = req.params;
        await Todo.deleteOne({_id})
            .then(() => {
                console.log("Deleted Todo Successfully!");
                res.redirect('/');
            })
            .catch((err) => console.log(err))
        }