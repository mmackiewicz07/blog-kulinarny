import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuth';
import { BiLogOut } from 'react-icons/bi';

const Logout = () => {
  const { clearUser } = useAuthActions();
  const history = useHistory();

  const onClick = (e) => {
    clearUser();
    history.push('/');
  }

  return (
    <button
      style={{ border: "none", cursor: "pointer" }}
      className="item"
      onClick={onClick}
    >
      <BiLogOut />
    </button>
  )
}

export default Logout;
