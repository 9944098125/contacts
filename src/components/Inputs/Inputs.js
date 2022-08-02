import React from "react";
import './Inputs.css';

export default function Inputs(props) {
  return (
    <>
      <div className="d-flex flex-column align-items-center mb-3">
        <input
          value={props.name}
          className={props.errors.name ? "is-invalid input" : "input"}
          placeholder="Enter Your name"
          onChange={props.onChangeName}
        />
        {props.errors.name && <p className="text-danger">{props.errors.name}</p>}
      </div>
      <div className="d-flex flex-column align-items-center mb-3">
        <input
          value={props.email}
          className={props.errors.email ? "is-invalid input" : "input"}
          placeholder="Enter your email"
          onChange={props.onChangeEmail}
        />
        {props.errors.email && <p className="text-danger">{props.errors.email}</p>}
      </div>

      <div className="d-flex flex-column align-items-center mb-3">
        <input
          type="date"
          value={props.birthday}
          className={props.errors.birthday ? "is-invalid input" : "input"}
          placeholder="Enter your birthday"
          onChange={props.onChangeBirthday}
        />
        {props.errors.birthday && <p className="text-danger">{props.errors.birthday}</p>}
      </div>
    </>
  );
}
