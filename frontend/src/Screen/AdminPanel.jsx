import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const { state } = useLocation();
  console.log(state, "state");
  return (
    <Container className="my-3 text-center">
      <Link to="question">
        <Card className="my-3">
          <Card.Title className="my-3 rounded">Add a questions</Card.Title>
        </Card>
      </Link>
      <Link to="/questionall">
        <Card className="my-3">
          <Card.Title className="my-3 rounded">Get all questions</Card.Title>
        </Card>
      </Link>
    </Container>
  );
};

export default AdminPanel;
