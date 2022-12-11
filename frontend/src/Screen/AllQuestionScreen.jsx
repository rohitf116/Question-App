import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionDisplayComponent from "../components/QuestionDisplayComponent/QuestionDisplayComponent";
import {
  Button,
  Col,
  Container,
  Row,
  Image,
  Form,
  Modal,
  Alert,
  Ratio,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const AllQuestionScreen = () => {
  const [question, setQuestion] = useState([]);
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleted, SetIsDeleted] = useState(false);

  const handleClose = () => setShow(false);
  const deleteHandler = async (e) => {
    e.preventDefault();
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfofromStorage.token}`,
      };
      const config = {
        headers,
      };
      const { data } = await axios.delete(
        `http://localhost:8000/question/${deleteId.toString()}`,

        config
      );
      handleClose();
      SetIsDeleted(true);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    setUser(userInfofromStorage);
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
  }, [deleteId]);
  return (
    <>
      {message ? (
        <h1>{message}</h1>
      ) : isDeleted ? (
        <Alert variant="success" onClose={() => setShow(false)}>
          <Alert.Heading>Your file is deleted!</Alert.Heading>
          <Button
            onClick={(e) => {
              SetIsDeleted(false);
            }}
          >
            All questions
          </Button>
        </Alert>
      ) : (
        <Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Are you sure to delete this document</Modal.Title>
            </Modal.Header>
            <Modal.Body>Once it is deleted it cannot be recovered</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={deleteHandler}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
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
                          {tutorial?.slice(tutorial.length - 3) === "mp4" ? (
                            <>
                              <video
                                style={{ height: 360, width: "100%" }}
                                src={tutorial}
                                controls
                              />
                            </>
                          ) : (
                            <Image
                              src={tutorial}
                              className="my-3"
                              fluid
                            ></Image>
                          )}
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

                          <Button
                            className="d-block my-3 btn btn-danger"
                            onClick={(e) => {
                              setDeleteId(_id);
                              setShow(true);
                            }}
                          >
                            Delete
                          </Button>
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
      )}
    </>
  );
};

export default AllQuestionScreen;
