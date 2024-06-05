import { getAllQuestion, getMaxPage } from '../api'

export const loadQuestions = async selectedType => {
  let filteredQuestions
  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data

    filteredQuestions = fetchedQuestions.filter(
      question => question.type === selectedType
    )
  } catch (error) {
    console.error('Error fetching questions:', error)
  }

  return filteredQuestions
}

export const loadQuestionType = (questions, version) => {
  let questionData

  if (questions.length > 0) {
    questionData = questions[version]
  }

  return questionData
}

export const loadQuestionsID = async id => {
  let filteredQuestions
  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data

    filteredQuestions = fetchedQuestions.filter(question => question._id === id)
  } catch (error) {
    console.error('Error fetching questions:', error)
  }

  return filteredQuestions
}

export const loadQuestionsOrderID = async () => {
  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data

    const sortedQuestions = fetchedQuestions.sort((a, b) => a.page - b.page)
    const questionIds = sortedQuestions.map(question => question._id)

    return questionIds
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}
export const loadQuestionsOrderData = async () => {
  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data
    const sortedQuestions = fetchedQuestions.sort((a, b) => a.page - b.page)
    return sortedQuestions
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}

export const getMaxPageValue = async () => {
  try {
    const data = await getMaxPage()
    return data.data.maxPage
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export const saveAnswersLocalStorage = (id, finalAnswers) => {
  // console.log(finalAnswers)
  if(finalAnswers){
  let storedAnswers = localStorage.getItem("result");
  
  if (storedAnswers) {
    if (typeof storedAnswers === "string") {
      try {
        storedAnswers = JSON.parse(storedAnswers);
      } catch (error) {
        console.error("Error parsing stored value:", error);
      }
    }
  } else {
    storedAnswers = { da: 0, mtd: 0 };
  }

  if (storedAnswers.da !== null && storedAnswers.mtd !== null) {
    console.log("storedvalue", storedAnswers.da);
    console.log("storedvalue", storedAnswers.mtd);
    storedAnswers.da += finalAnswers.da;
    storedAnswers.mtd += finalAnswers.mtd;
  } else {
    storedAnswers = finalAnswers;
  }

  console.log(
    'Question with id: ' +
    id +
    ' has saved with the following content to the local storage: ' +
    JSON.stringify(finalAnswers)
  );

  // storedAnswers = { da: 0, mtd: 0 }
  localStorage.setItem("result", JSON.stringify(storedAnswers));}
  else{
    alert("Please answer all the questions")
  }
};

export const findPointsToAnswer = (answers, answerID) => {
  const points = answers.find(a => a._id === answerID).points
  return points
}
