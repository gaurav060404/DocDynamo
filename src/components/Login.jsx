import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";
import brainIcon from "../assets/brain.svg";
import { useState } from "react";

export default function Login({ setLoggedIn, setShowLogin }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("loginState", JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
      setLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("loginState", JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
    setLoggedIn(true);
    setShowLogin(false);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("loginState", JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
      setLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError("No account found with this email address");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        case 'auth/too-many-requests':
          setError("Too many failed login attempts. Please try again later");
          break;
        default:
          setError("Failed to sign in. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("loginState", JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
      setLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError("An account with this email already exists");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        case 'auth/weak-password':
          setError("Password is too weak. Please choose a stronger password");
          break;
        default:
          setError("Failed to create account. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await sendPasswordResetEmail(auth, email);
      alert(`Password reset link has been sent to ${email}`);
      setShowForgotPassword(false);
    } catch (error) {
      console.error("Password Reset Error:", error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError("No account found with this email address");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        default:
          setError("Failed to send password reset email. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Left side - Illustration - Hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <img src={brainIcon} alt="Brain Illustration" className="w-64 h-64 mb-8" />
          <h1 className="text-3xl sm:text-5xl md:text-[58px] font-heading font-bold text-accent flex justify-center items-center gap-2">
            DocDynamo
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-5">AI-Powered Document Intelligence</h2>
          <p className="text-gray-600 text-center max-w-md">
            Transform your documents into intelligent insights with DocDynamo's advanced AI capabilities
          </p>
        </div>
        {/* Background circles */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-blue-400 rounded-full opacity-25"></div>
      </div>

      {/* Right side - Login form - Full width on mobile */}
      <div className="flex-1 md:flex-1 w-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#3457D5' }}>
        {/* Background decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-20 -translate-y-20"></div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-md mx-4 md:mx-8 z-10">
          {/* Mobile header with logo */}
          <div className="md:hidden text-center mb-6">
            <img src={brainIcon} alt="DocDynamo" className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800">DocDynamo</h1>
            <p className="text-sm text-gray-600">AI-Powered Document Intelligence</p>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Hello!</h1>
            <p className="text-gray-600">
              {isSignUp ? "Sign Up to Get Started" : "Welcome Back!"}
            </p>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>

            <button
              onClick={isSignUp ? handleSignUp : handleEmailLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : (isSignUp ? "Sign Up" : "Login")}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {loading ? "Please wait..." : "Sign in with Google"}
            </button>

            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              Continue as Guest
            </button>

            <div className="text-center space-y-2">
              <button
                onClick={handleForgotPassword}
                className="text-blue-500 hover:text-blue-600 hover:underline text-sm block w-full"
              >
                Forgot Password
              </button>
              <p className="text-gray-600 text-sm">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
