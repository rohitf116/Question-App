import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ResultScreen = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/result");
        console.log(data.data);
        const info = data.data;
        setData(info[0]);
      } catch (error) {
        console.log(error.response.data.message);
      }
      const userInfofromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      setUser(userInfofromStorage);
      if (userInfofromStorage === null) {
        navigate("/login");
      }
    };
    fetchData();
  }, []);
  return (
    <Container className="bg-light text-center my-3  shadow p-3 mb-5 bg-white rounded my-3">
      <h2>Result</h2>
      <p>
        Congrachulation <span>{user?.name}</span> You have scored
      </p>
      <h1>{data?.marks}/10</h1>
      <Link to="/startexam">
        <Button>Give another exam</Button>
      </Link>
    </Container>
  );
};

export default ResultScreen;
