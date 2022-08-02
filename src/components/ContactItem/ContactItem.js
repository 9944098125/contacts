import React from "react";
import { AiFillDelete } from "react-icons/ai";
import "./ContactItem.css";

export default function ContactItem(props) {
  const { contactDetails, deleteContact, idx } = props;
  const { id, name, email, profilePicture, birthday } = contactDetails;

  const removeContact = () => {
    deleteContact(id);
  };

  return (
    <tbody>
      <tr className="bg-secondary">
        <td className="table-data">
          <p>{idx + 1}.</p>
        </td>
        <td className="table-data">
          <p> {name}</p>
        </td>
        <td className="table-data">
          <p>{email}</p>
        </td>
        <td className="table-data">
          <p>{birthday}</p>
        </td>
        <td className="table-data d-flex flex-column align-items-center">
          <p>
            {profilePicture[0] ? (
              <img src={profilePicture} alt="profile" className="profile-img" />
            ) : (
              ""
            )}
          </p>
        </td>
        <td className="table-data">
          <button className="btn btn-warning del-btn" onClick={removeContact}>
            <AiFillDelete />
          </button>
        </td>
      </tr>
    </tbody>
  );
}
