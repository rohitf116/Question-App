import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const QuestionDisplayComponent = (Props) => {
  const {
    _id,
    question,
    option1,
    option2,
    option3,
    option4,
    correctAnswer,
    tutorial,
  } = Props.questionDone;
  const navigate = useNavigate();
  //   console.log(newAns, "newAns");
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
            <Link to="edit">
              <Button className="d-block my-3">Edit</Button>
            </Link>

            <Button className="d-block my-3">Delete</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuestionDisplayComponent;
