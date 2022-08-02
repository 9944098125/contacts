import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import './Table.css';

export default function Table(props) {
    return(
        <table data-role="table" className="table">
              <thead>
                <tr className='bg-info'>
                  <th className="th" data-name="SL-no">
                    SL-no
                  </th>
                  <th className="th" data-name="Name">
                    Name
                  </th>
                  <th className="th" data-name="Email">
                    Email
                  </th>
                  <th className="th" data-name="Date Of Birth">
                    Date Of Birth
                  </th>
                  <th className="th" data-name="Profile Picture">
                    Profile Picture
                  </th>
                  <th className="th" data-name="Delete">
                    Delete
                  </th>
                </tr>
              </thead>
              {props.contactsList
                .filter((eachContact) => {
                  if (props.searchTerm === "") {
                    return eachContact;
                  } else if (
                    eachContact.name
                      .toLowerCase()
                      .includes(props.searchTerm.toLowerCase())
                  ) {
                    return eachContact;
                  }
                })
                .map((eachContact, idx) => (
                  <ContactItem
                    idx={idx}
                    key={eachContact.id}
                    contactDetails={eachContact}
                    deleteContact={props.deleteContact}
                  />
                ))}
            </table>
    )
}