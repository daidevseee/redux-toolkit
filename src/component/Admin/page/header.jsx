import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../Service/firebase';
import { getDoc, doc } from 'firebase/firestore'; 
import Modal from 'react-modal';
export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'user-admin', user.uid)); // Fetch user data from Firestore
          if (userDoc.exists()) {
            setUser(userDoc.data()); // Set user data in the state
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/admin/login'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  // Hàm mở modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
    <div className="navbar bg-base-100">
    <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>
  <div className="flex-1">
    <Link to={'/admin'} className="btn btn-ghost normal-case text-xl">Admin-Dashboard </Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to={'/admin/san-pham'}>Sản Phẩm</Link></li>
      <li><Link to={'/admin/danh-muc'}>Danh Mục</Link></li>
      <li><Link to={'/admin/thong-tin-website'}>Thông Tin Website</Link></li>
      <li>
        <details>
          <summary>
            Quản Lí
          </summary>
          <ul className="p-2 bg-base-100">
            <li><Link to={'/admin/san-pham'}>Sản Phẩm</Link></li>
            <li><Link to={'/admin/danh-muc'}>Danh Mục</Link></li>
          </ul>
        </details>
      </li>
    </ul>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div title={user?.displayName} className="w-10 rounded-full">
        {user && <img src={user.photoURL} alt={user.displayName} />}
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={openModal} className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><Link to={'/'}>Back to Client</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
        <Modal className='custom-modal'  isOpen={isOpen} onRequestClose={closeModal}>
        
  <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
    <div className="relative h-40">
      <img
        className="absolute h-full w-full object-cover"
        src={user?.photoURL} alt={user?.photoURL}
      />
    </div>
    <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
      <img
        className="object-cover w-full h-full"
        src={user?.photoURL} alt={user?.photoURL}
      />
    </div>
    <div className="mt-16">
      <h1 className="text-lg text-center font-semibold">{user?.displayName}</h1>
      <p className="text-sm text-gray-600 text-center">
        {user?.email}
      </p>
    </div>
    <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t">
      <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
        Admin experience
      </div>
    </div>
  <div className="buttons flex">
          <div onClick={closeModal} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          </div>
        </div>
  </div>
        </Modal>
    </>
  )
}
