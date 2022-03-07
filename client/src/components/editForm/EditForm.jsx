import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditForm = ({ show, setShow, currentUser, setCurrentUser }) => {
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [city, setCity] = useState(currentUser.city);
  const [about, setAbout] = useState(currentUser.about);
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  if (redirectToHome) return <Redirect to={`/home`} />;

  const updateUserInfo = async () => {
    const newData = {
      name,
      lastName,
      city,
      about,
    };
    // if (profilePicture) {
    //   const data = new FormData();
    //   const fileName = Date.now() + profilePicture.name;
    //   data.append("name", fileName);
    //   data.append("file", profilePicture);
    //   newData.profilePicture = fileName;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {}
    // }
    // if (coverPicture) {
    //   const data = new FormData();
    //   const fileName = Date.now() + coverPicture.name;
    //   data.append("name", fileName);
    //   data.append("file", coverPicture);
    //   newData.coverPicture = fileName;
    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);
      formData.append("upload_preset", "gmrptfso");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doolsewfd/image/upload",
        formData
      );
      newData.profilePicture = response.data.url;
    }
    if (coverPicture) {
      const formData = new FormData();
      formData.append("file", coverPicture);
      formData.append("upload_preset", "gmrptfso");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doolsewfd/image/upload",
        formData
      );
      newData.coverPicture = response.data.url;
    }
    // try {
    //   await axios.post("/upload", data);
    // } catch (err) {}
    await axios.patch(`/users/${currentUser._id}/edit`, newData);
    const res = await axios.get(`/users/${currentUser._id}`);
    setCurrentUser(res.data);
  };

  return (
    <>
      <Modal show={show} fullscreen={"md-down"} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setShow(false);
              updateUserInfo();
              setRedirectToHome(true);
            }}
          >
            <Row>
              <Form.Label>Name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Form.Label>Last name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>City:</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About:</Form.Label>
              <Form.Control
                as="textarea"
                value={about}
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cover picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPicture(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditForm;
