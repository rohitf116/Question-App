import React from "react";
import { Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="d-flex flex-column">
      <Container className="bg-white d-flex flex-column shadow p-3 mb-5 bg-white rounded my-3">
        <h4 className="mx-auto my-3">lOGIN TO GIVE EXAM</h4>
        <Link to="/login" className="mx-auto my-3">
          <Button>Login</Button>
        </Link>
      </Container>
    </div>
  );
};

export default HomeScreen;
