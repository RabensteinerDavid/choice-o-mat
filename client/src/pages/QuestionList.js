import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StartSide from './questions/Startside.js'
import ThisOrThat from './questions/ThisOrThat'
import Selection from './questions/Selection'
import ChoiceRole from './questions/ChoiceRole'
import VerticalSlider from './questions/VerticalSlider.js'
import Carousel from './questions/Carousel.js'
import ImageSelection from './questions/ImageSelection.js'
import OrderSelection from './questions/OrderSelection.js'
import DragnDrop from './questions/DragnDrop.js'
import ThisOrThatPicture from './questions/ThisOrThatPicture.js'
import HorizontalSlider from './questions/HorizontalSlider.js'

import {
  getMaxPageValue,
  loadQuestionsOrderData,
  saveAnswersLocalStorage
} from '../components/LoadQuestion'
import FotBar from '../components/FotBar.jsx'

const QuestionList = () => {
  const { id: page_id } = useParams()
  const [maxPage, setMaxPage] = useState(null)
  const [order, setOrder] = useState(null)
  const [finalAnswers, setFinalAnswers] = useState({})

  useEffect(() => {
    const fetchMaxPage = async () => {
      const order = await loadQuestionsOrderData()
      const maxPageValue = await getMaxPageValue()
      setMaxPage(maxPageValue)
      setOrder(order)
    }

    fetchMaxPage()
  }, [page_id])

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'ThisOrThat':
        return (
          <ThisOrThat
            key={question._id}
            question={question}
            version={0}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'Selection':
        return (
          <Selection
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'VerticalSlider':
        return (
          <VerticalSlider
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            finalAnswers={finalAnswers}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'Carousel':
        return (
          <Carousel
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'ImageSelection':
        return (
          <ImageSelection
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'OrderSelection':
        return (
          <OrderSelection
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'DragnDrop':
        return (
          <DragnDrop
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            finalAnswer={finalAnswers}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'ChoiceRole':
        return (
          <ChoiceRole
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'ThisOrThatPicture':
        return (
          <ThisOrThatPicture
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      case 'HorizontalSlider':
        return (
          <HorizontalSlider
            key={question._id}
            question={question}
            pageNumber={index + 1}
            maxPage={maxPage}
            setFinalAnswers={setFinalAnswers}
          />
        )
      default:
        return <StartSide />
    }
  }
  const renderList = () => {
    if (!order) return null

    return (
      <div>
        {order.map((question, index) => {
          if (question.page === parseInt(page_id)) {
            return renderQuestion(question, index)
          }
          return null
        })}
      </div>
    )
  }

  const saveAnswers = () => {
    saveAnswersLocalStorage(page_id, finalAnswers)
  }

  return (
    <div>
      {renderList()}
      <FotBar
        prevQuestion={parseInt(page_id) === 1 ? 1 : parseInt(page_id) - 1}
        nextQuestion={
          parseInt(page_id) === maxPage ? maxPage : parseInt(page_id) + 1
        }
        saveAnswers={saveAnswers}
      />
    </div>
  )
}

export default QuestionList
