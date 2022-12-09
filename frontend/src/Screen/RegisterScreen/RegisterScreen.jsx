import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import FormComponent from "../../components/Form/FormComponent";
import { Link } from "react-router-dom";
//name, email, password
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/user",
        { name, email, password },
        config
      );
      console.log(data, "register page ");
      setSuccess(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };
  return (
    <FormComponent>
      {success ? (
        <>
          <h3>{success}</h3>
          <Link to="/exam">Go to exam</Link>
        </>
      ) : (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            {message ? <p className="text-white text-bold">{message}</p> : ""}
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form>
          <Row>
            <Col className="text-white">
              Already Registered? <Link to="/login">Sign in</Link>
            </Col>
          </Row>
        </>
      )}
    </FormComponent>
  );
};

export default RegisterScreen;
