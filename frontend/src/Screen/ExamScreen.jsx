import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Form, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ExamScreen = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState([]);
  const [ans, setAns] = useState({
    answer1: "",
    correctAnswer1: "",
    answer2: "",
    correctAnswer2: "",
    answer3: "",
    correctAnswer3: "",
    answer4: "",
    correctAnswer4: "",
    answer5: "",
    correctAnswer5: "",
    answer6: "",
    correctAnswer6: "",
    answer7: "",
    correctAnswer7: "",
    answer8: "",
    correctAnswer8: "",
    answer9: "",
    correctAnswer9: "",
    answer10: "",
    correctAnswer10: "",
  });
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    if (userInfofromStorage === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/question");
        setExam(data.data);
      } catch (error) {
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const userInfofromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfofromStorage.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/exam",
        ans,
        config
      );
      setSuccess(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container>
      {exam.map((question, i) => {
        return (
          <div key={question._id}>
            <Container className="border my-3">
              <Row>
                <Col md="6">
                  <Image src={question.tutorial} className="my-3" fluid></Image>
                </Col>
                <Col md="6" className="my-auto ">
                  <>
                    <Form className="my-auto">
                      <Form.Group className="my-auto">
                        <h3 className="text-white">{question.question}</h3>
                        <Form.Check
                          type="radio"
                          id="custom-switch"
                          className="text-white "
                          label={question.option1}
                          name={`answer${i + 1}`}
                          value={question.option1}
                          // eslint-disable-next-line no-sequences
                          onChange={(e) =>
                            setAns({
                              ...ans,
                              [`correctAnswer${i + 1}`]: question.correctAnswer,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        <Form.Check
                          type="radio"
                          id="custom-switch"
                          className="text-white mr-auto"
                          label={question.option2}
                          name={`answer${i + 1}`}
                          value={question.option2}
                          onChange={(e) =>
                            setAns({
                              ...ans,
                              [`correctAnswer${i + 1}`]: question.correctAnswer,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        <Form.Check
                          type="radio"
                          id="custom-switch"
                          className="text-white mr-auto"
                          label={question.option3}
                          name={`answer${i + 1}`}
                          value={question.option3}
                          onChange={(e) =>
                            setAns({
                              ...ans,
                              [`correctAnswer${i + 1}`]: question.correctAnswer,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                        <Form.Check
                          type="radio"
                          id="custom-switch"
                          className="text-white mr-auto"
                          label={question.option4}
                          name={`answer${i + 1}`}
                          value={question.option4}
                          onChange={(e) =>
                            setAns({
                              ...ans,
                              [`correctAnswer${i + 1}`]: question.correctAnswer,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Form>
                  </>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
      {message ? <h1>{message}</h1> : ""}
      <Button onClick={submitHandler}>Submit</Button>
    </Container>
  );
};

export default ExamScreen;
