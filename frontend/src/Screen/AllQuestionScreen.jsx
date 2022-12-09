import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionDisplayComponent from "../components/QuestionDisplayComponent/QuestionDisplayComponent";
import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const AllQuestionScreen = () => {
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    const fetchData = async () => {
      const config = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfofromStorage.token}`,
      };
      const { data } = await axios.get(
        "http://localhost:8000/questionall",
        config
      );
      setQuestion(data.data);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <Row>
        {question.map(
          ({
            _id,
            question,
            option1,
            option2,
            option3,
            option4,
            correctAnswer,
            tutorial,
          }) => {
            return (
              <>
                <Container className="border my-3">
                  <Row>
                    <Col md="4">
                      <Image src={tutorial} className="my-3" fluid></Image>
                    </Col>
                    <Col md="4" className="my-auto ">
                      <>
                        <Form className="my-auto">
                          <Form.Group className="my-auto">
                            <h3 className="text-white">{question}</h3>
                            <Form.Check
                              type="radio"
                              id="custom-switch"
                              className="text-white "
                              label={option1}
                              name="myAnswer"
                              value={option1}
                            />
                            <Form.Check
                              type="radio"
                              id="custom-switch"
                              className="text-white mr-auto"
                              label={option2}
                              name="myAnswer"
                              value={option2}
                            />
                            <Form.Check
                              type="radio"
                              id="custom-switch"
                              className="text-white mr-auto"
                              label={option3}
                              name="myAnswer"
                              value={option3}
                            />
                            <Form.Check
                              type="radio"
                              id="custom-switch"
                              className="text-white mr-auto"
                              label={option4}
                              name="myAnswer"
                              value={option4}
                            />
                          </Form.Group>
                          <h5 className="my-3">{correctAnswer}</h5>
                        </Form>
                      </>
                    </Col>
                    <Col md="4" className="my-auto mx-auto">
                      <Button
                        onClick={() => {
                          navigate("edit", {
                            state: {
                              data: {
                                _id,
                                question,
                                option1,
                                option2,
                                option3,
                                option4,
                                correctAnswer,
                                tutorial,
                              },
                            },
                          });
                        }}
                      >
                        Edit
                      </Button>

                      <Button className="d-block my-3">Delete</Button>
                    </Col>
                  </Row>
                </Container>
              </>
            );
          }
        )}
      </Row>
      <Row>
        <Col className="text-white my-3 text-center">
          <Link to="/adminpanel">
            <Button className="btn btn-light rounded">
              Back to admin panel
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AllQuestionScreen;
