import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import { changeIsDisplayingThread } from "../../actions";
import Snippet from "./Snippet.js";

const Snippets = (props) => {
    const toggleIsDisplayingThread = () => {
        props.changeIsDisplayingThread(!props.isDisplayingThread);
    };
    let filteredEmail = [];
   
    if (props.smartSearchResults.length > 0) {
        filteredEmail = props.smartSearchResults;
    } else if (props.searchResults.length > 0 && props.isDisplayingInSnippets){
        filteredEmail = props.searchResultsStatic;
    } else {
        filteredEmail = props.emails.filter((email) => {
            return email.labels.includes(props.snippetsFilter);
        });
    }
    useEffect(() => {
        if (props.smartSearchResults.length > 0) {
            filteredEmail = props.smartSearchResults;
        } else if (props.searchResults.length > 0 && props.isDisplayingInSnippets){
            filteredEmail = props.searchResultsStatic;
        } else {
            filteredEmail = props.emails.filter((email) => {
                return email.labels.includes(props.snippetsFilter);
            });
        }
    }, [props.smartSearchResults]);

    return (
        <SimpleBar forceVisible="y" autoHide={true} style={{height:'100%'}}>
        {/* <S.Container widthPercentage={props.isDisplayingThread ? 25 : 100}> */}
            {filteredEmail.map((email) => {
                return (
                    <Snippet key={email.message_id} email={email} /> // emails in redux are currently numbers 1-10 in an array
                );
            })}
        {/* </S.Container> */}
        </SimpleBar>
    );
};

const mapStateToProps = ({ imap, inbox, searchbar }) => ({
    isDisplayingThread: inbox.isDisplayingThread,
    areEmailsRetrieved: imap.areEmailsRetrieved,
    emails: imap.emails,
    snippetsFilter: inbox.snippetsFilter,
    smartSearchResults: searchbar.smartSearchResults,
    searchResults: searchbar.searchResults,
    searchResultsStatic: searchbar.searchResultsStatic,
    isDisplayingInSnippets: searchbar.isDisplayingInSnippets
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeIsDisplayingThread
        },
        dispatch
    );

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Snippets);
