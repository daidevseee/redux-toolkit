import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider,db } from '../Service/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/admin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save additional user data in Firestore
      const userRef = doc(db, 'user-admin', user.uid);
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await setDoc(userRef, userData, { merge: true });

      console.log('Login successful');
      toast.success('Đăng Nhập Thành Công')
      navigate('/admin');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login to admin</title>
      </Helmet>
      <ToastContainer/> 
      
      <div className="mockup-code">
      <pre data-prefix="$"><code>Login with google to go to admin</code></pre> 
     <Link to={'/'}>
     <pre data-prefix=">" className="text-warning"><code>Back to client...</code></pre> 
     </Link> 
      <pre onClick={handleLogin} data-prefix=">" className="text-success"><code>Login With Google!</code></pre>
    </div>
    </div>
  );
};

export default Login;
