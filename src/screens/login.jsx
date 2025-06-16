import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useFormik } from 'formik';
import FormErrorMessage from '../components/FormErrorMessage';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase-config'; // ✅ Ensuring correct Firebase imports
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/user';

// ✅ Form Validation
const validate = values => {
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
                    navigate("/page/1");
                }
            })
            .catch((error) => {
                if (error) console.error("Google Redirect Error:", error);
            });
    }, []);

    // ✅ Email/Password Login Function
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user);
            dispatch(loginUser(user.providerData));
            navigate("/page/1");
        } catch (e) {
            console.error("Login error:", e.message);
            alert(e.message);
        }
    };

    // ✅ Google Sign-In Function
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-In Success:", result.user);
            dispatch(loginUser(result.user.providerData));
            navigate("/page/1");
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error('Google Sign-In Redirect Error:', redirectError);
                    alert(redirectError.message);
                }
            } else {
                console.error("Google Sign-In Error:", error);
                alert(error.message);
            }
        }
    };

    // ✅ Formik Form Handling
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validate,
        onSubmit: (values) => login(values.email, values.password),
    });

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
                            Create a free account
                        </Link>
                    </p>
                    
                    {/* ✅ Email/Password Login Form */}
                    <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </div>
                            {formik.errors.email && formik.touched.email && <FormErrorMessage message={formik.errors.email} />}
                        </div>

                        <div>
                            <label className="text-base font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input
                                    className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>
                            {formik.errors.password && formik.touched.password && <FormErrorMessage message={formik.errors.password} />}
                        </div>

                        {/* ✅ Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-white font-semibold hover:bg-black/80"
                            >
                                Get started <ArrowRight className="ml-2" size={16} />
                            </button>
                        </div>
                    </form>

                    {/* ✅ Google Login Only (Facebook Removed) */}
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn} // ✅ Google Sign-In Button now works
                            className="w-full flex items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
