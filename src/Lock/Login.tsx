import { useTheme } from '../Context/ToggleTheme.tsx'
import { useState } from 'react';
import { useAuth } from '../Context/Auth.tsx';
import { useNavigate } from "react-router-dom";

interface Login {
  email: string,
  password: string,
}

export default function Login() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setform] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState<boolean>(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function Check(): boolean {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email address");
      return false;
    }

    setError("");
    return true;
  }

  async function handleSubmit(): Promise<void> {
    if (!Check()) return;
    setloading(true)
    try {
      await login(form.email, form.password);
      alert("User logged in");
      setloading(false)
      navigate("/Add");
    } catch (error) {
      alert((error as Error).message);
      setloading(false)
    }
  }

  return (
    <div className="grid gap-4 w-full max-w-sm mx-auto px-4 py-8">
      <div className="grid gap-1">
        <span className="font-bold text-2xl" style={{ color: colors.welcome }}>
          Login to Konnect
        </span>
        {error && <p className="font-base text-sm text-red-500">{error}</p>}
      </div>

      <div className="form grid gap-3">

        {/* Email */}
        <div className="grid gap-1">
          <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
            Email:
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-base" style={{ color: colors.textSecondary }}>
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="text-sm font-semibold border-[2px] focus:border-blue-500 pl-9 pr-3 py-[10px] rounded-xl outline-none w-full"
              style={{
                background: colors.surface,
                color: colors.textPrimary,
                borderColor: colors.border,
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
              Password:
            </span>
            <span className="text-sm font-medium cursor-pointer" style={{ color: colors.accent }}>
              Forgot password?
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-base" style={{ color: colors.textSecondary }}>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="text-sm font-semibold border-[2px] focus:border-blue-500 pl-9 pr-10 py-[10px] rounded-xl outline-none w-full"
              style={{
                background: colors.surface,
                color: colors.textPrimary,
                borderColor: colors.border,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-base outline-none border-none bg-transparent cursor-pointer"
              style={{ color: colors.textSecondary }}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          className="text-lg font-semibold border-none mt-[6px] outline-none w-full p-[12px] rounded-xl"
          style={{ background: colors.accent, color: colors.accentText }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-[1px]" style={{ background: colors.border }}></div>
          <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>or</span>
          <div className="flex-1 h-[1px]" style={{ background: colors.border }}></div>
        </div>

        <button
          className="flex items-center justify-center gap-3 text-sm font-semibold border-[2px] outline-none w-full p-[12px] rounded-xl"
          style={{ background: colors.surface, color: colors.textPrimary, borderColor: colors.border }}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Login with Google
        </button>

        <p className="text-center text-sm font-medium" style={{ color: colors.textSecondary }}>
          Don't have an account?{' '}
          <span className="font-semibold cursor-pointer" style={{ color: colors.accent }}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}