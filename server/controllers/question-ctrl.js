const Question = require('../models/question-model')

createQuestion = (req, res) => {
    const body = req.body

    console.log(body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a question',
        })
    }

    const question = new Question(body)

    if (!question) {
        return res.status(400).json({ success: false, error: err })
    }

    question
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: question._id,
                message: 'Question created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Question not created!',
            })
        })
}

updateQuestion = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    try {
        const quest = await Question.findOne({ _id: req.params.id });
        if (!quest) {
            return res.status(404).json({
                message: 'Question not found!',
            });
        }

        quest.id = body.id;
        quest.questiontype = body.questiontype;
        quest.heading = body.heading;
        quest.subheading = body.subheading;
        quest.rating = body.rating;
        quest.context = body.context;

        await quest.save();
        return res.status(200).json({
            success: true,
            id: quest._id,
            message: 'Question updated!',
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: 'Question not updated!',
        });
    }
}

deleteQuestion = async (req, res) => {
    try {
        const quest = await Question.findOneAndDelete({ _id: req.params.id });
        if (!quest) {
            return res.status(404).json({ success: false, error: `Question not found` });
        }
        return res.status(200).json({ success: true, data: quest });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

getQuestionById = async (req, res) => {
    await Question.findOne({ _id: req.params.id }, (err, quest) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!quest) {
            return res
                .status(404)
                .json({ success: false, error: `Question not found` })
        }
        return res.status(200).json({ success: true, data: quest })
    }).catch(err => console.log(err))
}

getQuestion = async (req, res) => {
    try {
        const quest = await Question.find({}).then((data) => {
            return res.status(200).json({ success: true, data: data });
        }).catch((err) => {
            return res.status(404).json({ success: false, error: err });
        });
        if (!quest || quest.length === 0) {
            return res.status(404).json({ success: false, error: `Question not found` });
        }
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getQuestionById,
}