const Todo = require('./../models/Todo');

exports.getAllTodos = async(req, res) => {
    try {
        const allTodos = await Todo.find();
        res.render("index", {todo: allTodos});
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: 'No data found!'
        })
    }
}

exports.createTodo = async (req, res) => {
    console.log(req.body);
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    await newTodo
        .save()
        .then(() => {
            console.log("Successfully added todo!");
            res.redirect('/');
        })
        .catch((err) => console.log(err))
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