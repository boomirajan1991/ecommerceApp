import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='Homecomponent'>
      <Col sm={12} className="text-center">
        <Button variant="success" size="sm" className="mt-5">
          <Link to="login">Go To Login </Link>
        </Button>
      </Col>
    </div>
  );
};

export default Home;
