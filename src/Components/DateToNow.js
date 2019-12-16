import React from "react";
import Moment from 'react-moment';
import PropTypes from "prop-types";
import 'moment-timezone';


Moment.globalLocale = 'kr';
export const DateToNow = (createdAt) =>{
  return(<Moment interval={300000} fromNow ago> {createdAt} </Moment>);
};


export const DateToNow_View = ({ createdAt }) => (
  <Moment interval={300000} fromNow ago> {createdAt} </Moment>
);

DateToNow_View.propTypes = {
  createdAt: PropTypes.string.isRequired
};
