import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CgCloseR } from "react-icons/cg";
import { Modal } from "react-bootstrap";
import "./Contacts.css";
import Table from "../Table/Table";
import Searchbar from "../Searchbar/Searchbar";
import Inputs from "../Inputs/Inputs";
import TakingImages from "../TakingImages/TakingImages";

export default class Contacts extends Component {
  state = {
    contactsList: [],
    searchTerm: "",
    name: "",
    email: "",
    birthday: "",
    profilePicture: "",
    errors: {},
    showCamera: false,
    closeCamera: true,
    showModal: false,
    hideModal: true,
  };

  // validating the form
  formValidation = () => {
    const { name, email, birthday, profilePicture } = this.state;

    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (isNaN(email)) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        //eslint-disable-line
        errors.email = "Email is invalid";
      }
    }
    if (!profilePicture) {
      errors.profilePicture = "Profile picture is required";
    }
    if (!birthday) {
      errors.birthday = "Your birthday is required";
    }
    this.setState({ errors });
    return errors;
  };

  isValid = (errors) => {
    // errors would have keys non-empty strings as values
    let keys = Object.keys(errors); // keys is an array
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
    //it will be valid when count is 0
  };

  // adding contacts to the web page
  onAddContact = () => {
    const { name, email, profilePicture, birthday } = this.state;
    const newContact = {
      id: uuidv4(),
      name,
      email,
      profilePicture,
      birthday,
    }; // creating a unique id for every contact

    this.setState((prevState) => ({
      // appending the new contact added, to the contactList and making name and all empty again
      contactsList: [...prevState.contactsList, newContact],
      name: "",
      email: "",
      profilePicture: "",
      birthday: "",
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let errors = this.formValidation();
    if (this.isValid(errors)) {
      this.onAddContact();
      this.closeModal();
    } else {
      let s1 = this.state;
      s1.errors = errors;
      this.setState(s1);
    }
  };

  // after the component gets updated, that means when submit button is clicked then the items gets saved
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("contacts", JSON.stringify(nextState.contactsList));
    // saving the contacts to the local storage
  }

  // life cycle method to get the items stored in local storage
  componentWillMount() {
    localStorage.getItem("contacts") &&
      this.setState({
        contactsList: JSON.parse(localStorage.getItem("contacts")),
      });
    // getting the items stored in local storage
  }

  // function to delete each contact
  deleteContact = (id) => {
    const filteredContacts = this.state.contactsList.filter(
      (eachContact) => eachContact.id !== id
    );
    this.setState({
      contactsList: filteredContacts,
    });
  };

  // // uploading an image through dropzone
  uploadImage = (data) => {
    this.setState({ profilePicture: URL.createObjectURL(data[0]) });
    // uploading image with converting it into objectUrl and assigning it to profilePicture
  };

  // changing function for the inputs
  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeBirthday = (event) => {
    this.setState({ birthday: event.target.value });
  };

  // after taking the photo uploading the image to server
  handleTakePhoto = (dataUri) => {
    this.setState({ profilePicture: dataUri });
  };

  // function to open the camera
  openCamera = () => {
    this.setState({ showCamera: true, closeCamera: false });
  };

  // function to close the camera
  shutDownCamera = () => {
    this.setState({ showCamera: false, closeCamera: true });
  };

  // function to search for contacts
  onChangeSearchbar = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  // function to open modal
  openModal = () => {
    this.setState({ showModal: true, hideModal: false });
  };

  closeModal = () => {
    this.setState({ showModal: false, hideModal: true });
  };
  

  render() {
    const { name, email, birthday, errors, showCamera } = this.state;

    return (
      <div className="container-fluid">
        <div className="p-5">
          <Searchbar
            onChangeSearchbar={this.onChangeSearchbar}
            openModal={this.openModal}
          />
          <div className="d-flex flex-column align-items-center">
            {this.state.showModal && (
              <Modal show={true} size="xl" centered>
                <div className="bg-dark">
                  <div className="d-flex flex-row justify-content-between">
                    <Modal.Title className="text-success ms-5 mt-5">
                      Add Contact
                    </Modal.Title>
                    <button
                      className="btn btn-danger"
                      onClick={this.closeModal}
                    >
                      <CgCloseR />
                    </button>
                  </div>
                  <Modal.Body>
                    <form className="p-3 px-3" onSubmit={this.handleSubmit}>
                      <div className="d-flex flex-column align-items-center">
                        <Inputs
                          name={name}
                          email={email}
                          birthday={birthday}
                          errors={errors}
                          onChangeBirthday={this.onChangeBirthday}
                          onChangeEmail={this.onChangeEmail}
                          onChangeName={this.onChangeName}
                        />
                        <TakingImages
                          uploadImage={this.uploadImage}
                          openCamera={this.openCamera}
                          showCamera={showCamera}
                          handleTakePhoto={this.handleTakePhoto}
                          shutDownCamera={this.shutDownCamera}
                          errors={errors}
                        />
                        <button
                          type="submit"
                          className="submit-btn"
                        >
                          Add Contact
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </div>
              </Modal>
            )}
            <Table
              searchTerm={this.state.searchTerm}
              contactsList={this.state.contactsList}
              deleteContact={this.deleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}
