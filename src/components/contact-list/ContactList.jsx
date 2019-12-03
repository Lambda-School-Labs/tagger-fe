import React from 'react';

import PerfectScrollbar from "react-perfect-scrollbar";

import { connect } from "react-redux";

import ContactCard from "./contact-card/ContactCard";

import "./contact-list.scss";

const ContactList = (props) => {

    const handleContactSearch = (email) => {
        props.setSearchQuery(`from:${email}`);  
        // console.log(email);
        performSearch();
      }
    
      const performSearch = () => {
        const searchParams = {}
        if (!props.searchQuery || props.searchQuery === "") {
          searchParams.labelIds = ["INBOX"];
        }
        props.getLabelMessages({...searchParams})
      };



    return (
        <PerfectScrollbar className="contact-list-container">
            {props.contactsResult.contacts.map(contact => {
                return (
                    <>
                        {/* <div>Hey look here {searchterm}</div> */}
                        <ContactCard
                            contact={contact}
                            handleContactSearch={handleContactSearch}
                            searchterm={props.searchterm}
                        />
                    </>
                )
            })}
        </PerfectScrollbar>
    );
}


const mapStateToProps = state => ({
    contactsResult: state.contactsResult
  });
  
export default connect(
    mapStateToProps
)(ContactList);