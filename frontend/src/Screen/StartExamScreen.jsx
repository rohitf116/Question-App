import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const StartExamScreen = () => {
  return (
    <div>
      <>StartExamScreen</>
      <Container className="text-center bg-light  shadow p-3 mb-5 bg-white rounded my-3">
        <h1 className="my-3">Welcome to Quizz</h1>
        <Link to="startexam">
          <Button className="my-3">Press to Start Exam</Button>
        </Link>
      </Container>
    </div>
  );
};

export default StartExamScreen;
