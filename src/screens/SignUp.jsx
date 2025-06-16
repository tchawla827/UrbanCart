import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useFormik } from 'formik';
import FormErrorMessage from '../components/FormErrorMessage';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase-config';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Form Validation
const validate = values => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Required';
    else if (values.fullName.length > 15) errors.fullName = 'Must be 15 characters or less';

    if (!values.email) errors.email = 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';

    if (!values.password) errors.password = 'Required';
    else if (values.password.length < 8) errors.password = "Must be at least 8 characters or more";

    if (!values.confirmPassword) errors.confirmPassword = "Required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "Password does not match";

    return errors;
};

export function SignUp() {
    const navigate = useNavigate();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result && result.user) {
                    navigate("/page/1");
                }
            })
            .catch((error) => {
                if (error) console.error("Google Redirect Error:", error);
            });
    }, []);

    // ✅ Email/Password Registration
    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User Registered");
            navigate("/page/1"); // ✅ Redirect after signup
        } catch (e) {
            console.error("Signup Error:", e.message);
            alert(e.message);
        }
    };

    // ✅ Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-Up Success:", result.user);
            navigate("/page/1");
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
                try {
                    await signInWithRedirect(auth, googleProvider);
                } catch (redirectError) {
                    console.error('Google Sign-Up Redirect Error:', redirectError);
                    alert(redirectError.message);
                }
            } else {
                console.error("Google Sign-Up Error:", error);
                alert(error.message);
            }
        }
    };

    // ✅ Formik Form Handling
    const formik = useFormik({
        initialValues: { fullName: '', email: '', password: '', confirmPassword: '' },
        validate,
        onSubmit: (values) => register(values.email, values.password),
    });

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign up to create account
                    </h2>
                    <p className="mt-2 text-center text-base text-gray-600">
                        Already have an account?{' '}
                        <Link to="/" className="font-medium text-black transition-all duration-200 hover:underline">
                            Sign In
                        </Link>
                    </p>

                    {/* ✅ Email/Password Signup Form */}
                    <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input
                                    className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400"
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName}
                                />
                            </div>
                            {formik.errors.fullName && formik.touched.fullName && <FormErrorMessage message={formik.errors.fullName} />}
                        </div>

                        <div>
                            <label className="text-base font-medium text-gray-900">Email Address</label>
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

                        <div>
                            <label className="text-base font-medium text-gray-900">Confirm Password</label>
                            <div className="mt-2">
                                <input
                                    className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-gray-400"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                            </div>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && <FormErrorMessage message={formik.errors.confirmPassword} />}
                        </div>

                        {/* ✅ Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-white font-semibold hover:bg-black/80"
                            >
                                Create Account <ArrowRight className="ml-2" size={16} />
                            </button>
                        </div>
                    </form>

                    {/* ✅ Google Login Only */}
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn} // ✅ Now Google sign-in works
                            className="w-full flex items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                            </svg>
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
