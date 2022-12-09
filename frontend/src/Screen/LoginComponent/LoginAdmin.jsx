import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import FormComponent from "../../components/Form/FormComponent";
import { Link, useNavigate } from "react-router-dom";
const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState(null);
  const [logged, SetLogged] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    SetLogged(userInfofromStorage);
    console.log(userInfofromStorage, "userInfofromStorage");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/adminLogin",
        { email, password, secret },
        config
      );
      console.log(data, "login page");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/adminPanel", { state: { data: data } });
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };
  return (
    <FormComponent>
      {logged ? (
        <Link to="/question">Create Question</Link>
      ) : (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className=" text-white">
                We'll never share your email with anyone else.
              </Form.Text>
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
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Secret</Form.Label>
              <Form.Control
                type="password"
                placeholder="secret"
                onChange={(e) => setSecret(e.target.value)}
                value={secret}
              />
            </Form.Group>
            {message ? <p className="text-white text-bold">{message}</p> : ""}
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form>
          <Row>
            <Col className="text-white">
              New User? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </>
      )}
    </FormComponent>
  );
};

export default LoginAdmin;
