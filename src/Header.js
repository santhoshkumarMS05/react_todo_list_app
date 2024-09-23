import React from 'react';

const Header = (props) => {
  return (
    <header>{props.t}</header>
  )
}
Header.defaultProps={
  t:"SanthoshKumar"
}
export default Header