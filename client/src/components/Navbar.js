import React from 'react'

function Navbar() {
  function logout()  {
    localStorage.removeItem('currUser');
    window.location.href='login';
  }
  const user = JSON.parse(localStorage.getItem('currUser'));
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i class="fa-solid fa-bars" style={{color:'white'}}></i></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-5">
        {user ? 
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
          <i className='fa fa-user'></i>{user.name}
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Bookings</a>
          <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
        </div>
      </div>
        : (<>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/login">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
        </>)}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
