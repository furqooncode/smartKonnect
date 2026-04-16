import { useTheme } from '../Context/ToggleTheme.tsx'
import { useAuth } from '../Context/Auth.tsx'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
interface Register {
  username: string
  fullname: string
  email: string
  password: string
}

export default function Signup() {
  const { colors } = useTheme()
  const { register, loading, setLoading } = useAuth()
  const navigate = useNavigate();
  const [form, setform] = useState<Register>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target
    setform((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function Check(): boolean {
    if (!form.username || !form.fullname || !form.email || !form.password) {
      setError("Please fill all fields")
      return false
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError("Enter a valid email address")
      return false
    }

    setError("")
    return true
  }

  async function handleSubmit(): Promise<void> {
    if (!Check()) return
    try {
      setLoading(true)
      await register(form.email, form.password, form.username, form.fullname)
      alert("User created successfully")
      navigate("/details")
    } catch (error) {
      alert((error as Error).message)
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-4 w-full max-w-sm mx-auto px-4 py-8">
      <div className="grid gap-1">
        <span className="font-bold text-2xl" style={{ color: colors.welcome }}>
          Signup to Konnect
        </span>
        {error && <p className="font-base text-sm text-red-500">{error}</p>}
      </div>

      <div className="form grid gap-3">

        {/* Username */}
        <div className="grid gap-1">
          <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
            Username:
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-base" style={{ color: colors.textSecondary }}>
              <i className="fa-solid fa-at"></i>
            </span>
            <input
              type="text"
              placeholder="e.g Nickname"
              name="username"
              value={form.username}
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

        {/* Fullname */}
        <div className="grid gap-1">
          <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
            Fullname:
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-base" style={{ color: colors.textSecondary }}>
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              placeholder="e.g John Doe"
              name="fullname"
              value={form.fullname}
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
          <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
            Password:
          </span>
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
         {loading ? "Creating user..." : "Register"} 
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
          Sign up with Google
        </button>

        <p className="text-center text-sm font-medium" style={{ color: colors.textSecondary }}>
          already have an account?{' '}
          <span className="font-semibold cursor-pointer" style={{ color: colors.accent }}>
            Login
          </span>
        </p>
      </div>
    </div>
  )
}