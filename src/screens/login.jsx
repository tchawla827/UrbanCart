import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useFormik } from 'formik';
import FormErrorMessage from '../components/FormErrorMessage';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/user';

// Form Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  if (!values.password) errors.password = 'Required';
  return errors;
};

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check redirect result for Google sign-in
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          dispatch(loginUser(result.user.providerData));
          navigate('/page/1');
        }
      })
      .catch((error) => {
        if (error) console.error('Google Redirect Error:', error);
      });
  }, [dispatch, navigate]);

  // Email/Password Login Function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      dispatch(loginUser(user.providerData));
      navigate('/page/1');
    } catch (e) {
      console.error('Login error:', e.message);
      alert(e.message);
    }
  };

  // Google Sign-In Function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In Success:', result.user);
      dispatch(loginUser(result.user.providerData));
      navigate('/page/1');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Google Sign-In Redirect Error:', redirectError);
          alert(redirectError.message);
        }
      } else {
        console.error('Google Sign-In Error:', error);
        alert(error.message);
      }
    }
  };

  // Formik Form Handling
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: (values) => login(values.email, values.password),
  });

  return (
    <section className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 space-y-6">
          {/* Email/Password Login Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <FormErrorMessage message={formik.errors.email} />
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <FormErrorMessage message={formik.errors.password} />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-background text-foreground font-medium hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            <svg className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-foreground transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-foreground transition-colors duration-200">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;
