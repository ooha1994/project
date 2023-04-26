import "./MainComponent.css";
import { Link } from "react-router-dom";

export default function MainComponent() {
  localStorage.removeItem("user");
  return (
    <div className="background-image">
      <div className="background-shade">
        <div className="main-center">
          <div className="text-white text-center">
            <h2>BOOK/SCHEDULE YOUR APPOINTMENTS HASSLE FREE NOW</h2>
            <h4 style={{ color: "green", fontWeight: "bold" }}>
              Streamline your appointment scheduling with a tool that tackles
              custom scheduling needs.
            </h4>
            <br />
            <br />
            <Link to={"/login"}>
              <button className="btn btn-danger text-white">
                Book Now <span className="bi bi-chevron-right"></span>
              </button>
            </Link>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
