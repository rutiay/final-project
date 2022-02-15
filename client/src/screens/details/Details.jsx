import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Logo from "../../components/logo/Logo";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./details.css";

const Details = ({ auth }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const res = await axios.get(`/users/newuser/${auth?.email}`);
      setUser(res.data);
      console.log(res.data);
      setIsLoading(false);
    }
    fetchUser();
  }, [auth.email]);

  if (redirectToHome) return <Redirect to="/home" />;

  const addDetails = async () => {
    const newUser = {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      city,
      about,
    };
    if (profilePicture) {
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      newUser.profilePicture = fileName;
      try {
          await axios.post("/upload", data);
      } catch (err) {}
    }
    if (coverPicture) {
      const data = new FormData();
      const fileName = Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      newUser.coverPicture = fileName;
      try {
          await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
        await axios.patch("/users/details", newUser);
        setRedirectToHome(true);
    } catch (err) {}
  }
 
  return (
    <>
      {!isLoading ? (
        <div className="details">
          <Logo />
          <Form
            className="detailsForm"
            onSubmit={(e) => {
              e.preventDefault();
              addDetails();
            }}
          >
            <span className="detailsTitle">Let's Get Started</span>
            <Row className="detailsRow">
              <Col>
                <Form.Control value={user?.name} disabled={true} />
              </Col>
              <Col>
                <Form.Control value={user?.lastName} disabled={true} />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control type="email" value={user?.email} disabled={true} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Tell us about yourself (will show in profile)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                name="profilePicture"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cover picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPicture(e.target.files[0])}
                name="coverPicture"
              />
            </Form.Group>
            <br />
            <Button type="submit">Let's Go</Button>
          </Form>
          <img
            src="media/detailsCover.jpg"
            alt="cover"
            className="detailsCover"
          />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Details;
