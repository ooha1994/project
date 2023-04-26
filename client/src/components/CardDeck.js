import React from "react";
import "./RegisterComponent.css";
import { Card, Button } from "react-bootstrap";

const CardDeck = () => (
  <Card className="card">
    <div className="img">
      <Card.Img
        className="img-card"
        as="img"
        variant="top"
        src="alarm-clock.webp"
      />
    </div>
    <ul className="social-media">
      <li>
        <Button className="fa" variant="info">
          Light
        </Button>
      </li>
    </ul>
    <div class="user-info">
      <h2>Aniket Singh</h2>
      <span>20-july</span>
    </div>
  </Card>
);

export default CardDeck;
