const QuestionTypes = require('../models/question-model-types')

const getQuestionTypes = async (req, res) => {
  try {
    const types = await QuestionTypes.find({})
    return res.status(200).json({ success: true, types: types })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const insertQuestionTypes = async (req, res) => {
  const body = req.body;

  console.log(body);

  if (!body ) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an array of question types',
    });
  }

  const newQuestionTypes = await QuestionTypes.create({ questionTypes: body  });
  console.log("newQuestionTypes: ", newQuestionTypes)

  try {
    const response = {
      success: true,
      types: [
        {
          _id: newQuestionTypes._id,
          questionTypes: newQuestionTypes.questionTypes,
        },
      ],
    };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message || 'Question types not created!',
    });
  }
};

module.exports = {
  getQuestionTypes,
  insertQuestionTypes
}
