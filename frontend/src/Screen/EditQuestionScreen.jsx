import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import QuestionDisplayComponent from "../components/QuestionDisplayComponent/QuestionDisplayComponent";
import FormComponent from "../components/Form/FormComponent";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
const EditQuestionScreen = (Props) => {
  const { state } = useLocation();

  const [questions, setQuestions] = useState({
    question: state.data.question || null,
    option1: state.data.option1 || null,
    option4: state.data.option4 || null,
    option2: state.data.option2 || null,
    option3: state.data.option3 || null,
    correctAnswer: state.data.correctAnswer || null,
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
  useEffect(() => {}, []);
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
    console.log(state.data._id, "state.data.id");
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfofromStorage.token}`,
      };
      const config = {
        headers,
      };
      const { data } = await axios.patch(
        `http://localhost:8000/question/${state.data._id}`,
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

export default EditQuestionScreen;
