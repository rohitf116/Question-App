import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import QuestionDisplayComponent from "../QuestionDisplayComponent/QuestionDisplayComponent";
import FormComponent from "../Form/FormComponent";
import { Link } from "react-router-dom";
const QuestionComponent = () => {
  const [questions, setQuestions] = useState({
    question: "",
    option1: "",
    option4: "",
    option3: "",
    option2: "",
    correctAnswer: "",
  });
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [questionDone, setQuestionDone] = useState(null);
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMessage(null);
    setQuestions({ ...questions, [name]: value });
  };
  const chageFileHandler = (e) => {
    const fileOne = e.target.files[0];
    setFile(fileOne);
    setMessage(null);
  };

  const { question, option1, option4, option3, option2, correctAnswer } =
    questions;
  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    console.log(userInfofromStorage, "userInfofromStorage");
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfofromStorage.token}`,
      };
      const config = {
        headers,
      };
      const { data } = await axios.post(
        "http://localhost:8000/question",
        { question, option1, option4, option3, option2, correctAnswer, file },
        config
      );
      console.log(data.data);
      setQuestionDone(data.data);
      console.log(questionDone, "questionDone");
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };
  return (
    <>
      {questionDone ? (
        <QuestionDisplayComponent questionDone={questionDone} />
      ) : (
        <FormComponent>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Enter Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your question"
                onChange={changeHandler}
                value={question}
                name="question"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Option 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="option 1"
                onChange={changeHandler}
                value={option1}
                name="option1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Option 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="option 2"
                onChange={changeHandler}
                value={option2}
                name="option2"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Option 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="option 3"
                onChange={changeHandler}
                value={option3}
                name="option3"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Option 4</Form.Label>
              <Form.Control
                type="text"
                placeholder="option 4"
                onChange={changeHandler}
                value={option4}
                name="option4"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Correct Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter correct answer"
                onChange={changeHandler}
                value={correctAnswer}
                name="correctAnswer"
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="text-white">Tutorial</Form.Label>
              <Form.Control type="file" onChange={chageFileHandler} />
            </Form.Group>
            {message ? <h4>{message}</h4> : ""}
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form>
          <Row className="text-center">
            <Col className="text-white my-3">
              <Link to="/adminpanel">
                <Button className="btn btn-light rounded">
                  Back to admin panel
                </Button>
              </Link>
            </Col>
          </Row>
        </FormComponent>
      )}
    </>
  );
};

export default QuestionComponent;
