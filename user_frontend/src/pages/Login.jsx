import { useState } from "react"
import "../index.css"
import { mockUsers } from "../mockData/mockLogin"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()
  const [mode, setMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login")
    setAlert(null)
  }

  const forgotPassword = () => {
    setMode("forgot")
    setAlert(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    setAlert(null)

    setTimeout(() => {

      if (!email.includes("@")) {
        setAlert({ type: "error", text: "Vui lòng nhập email hợp lệ!" })
        setLoading(false)
        return
      }

      if (mode === "login") {

        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        )

        if (user) {
          setAlert({ type: "success", text: "Đăng nhập thành công!" })

          setTimeout(() => {
            navigate("/home")
          }, 1000)

        } else {
          setAlert({ type: "error", text: "Sai email hoặc mật khẩu!" })
        }
      }

      if (mode === "register") {
        setAlert({ type: "success", text: "Tạo tài khoản thành công!" })
      }

      if (mode === "forgot") {
        setAlert({ type: "success", text: "Đã gửi liên kết khôi phục!" })
      }

      setLoading(false)

    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">

      {/* LEFT FORM */}
      <div className="flex w-full flex-col justify-center bg-white px-8 py-12 shadow-2xl md:w-1/2">

        <div className="mx-auto w-full max-w-md">

          {/* ✅ LOGO FIX */}
          <div className="mb-10 flex items-center gap-3">
            <img src="/images/logo.jpg" alt="PitGo Logo" className="w-12 h-12 object-contain" />
            <span className="text-3xl font-bold">
              Pit<span className="text-black-600">Go</span>
            </span>
          </div>

          {/* Title */}
          <div className="mb-8">

            {mode === "login" && (
              <>
                <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
                <p className="text-gray-500">
                  Nhập thông tin để quản lý bộ sưu tập xe của bạn.
                </p>
              </>
            )}

            {mode === "register" && (
              <>
                <h1 className="text-3xl font-bold">Tạo tài khoản mới</h1>
                <p className="text-gray-500">
                  Đăng ký ngay để nhận báo giá xe độc quyền.
                </p>
              </>
            )}

            {mode === "forgot" && (
              <>
                <h1 className="text-3xl font-bold">Khôi phục mật khẩu</h1>
                <p className="text-gray-500">
                  Nhập email để nhận liên kết đặt lại mật khẩu.
                </p>
              </>
            )}

          </div>

          {/* ALERT */}
          {alert && (
            <div className={`mb-6 p-3 rounded-lg text-sm border
              ${alert.type === "error"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"}`}
            >
              {alert.text}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col">

            {mode === "register" && (
              <input
                type="text"
                placeholder="Họ và tên đầy đủ"
                className="mb-5 p-3 rounded-xl border"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="example@pitgo.com"
              required
              className="mb-5 p-3 rounded-xl border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {mode !== "forgot" && (
              <div className="relative mb-5">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  required
                  className="p-3 rounded-xl border w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  👁
                </button>

              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-between text-sm mb-5">

                <label className="flex gap-2">
                  <input type="checkbox" />
                  Ghi nhớ
                </label>

                <button
                  type="button"
                  className="text-red-600"
                  onClick={forgotPassword}
                >
                  Quên mật khẩu?
                </button>

              </div>
            )}

            <button
              type="submit"
              className="bg-red-600 text-white py-3 rounded-xl font-bold"
              disabled={loading}
            >
              {loading
                ? "Đang xử lý..."
                : mode === "login"
                ? "Đăng nhập"
                : mode === "register"
                ? "Tạo tài khoản"
                : "Gửi liên kết"}
            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm">

            {mode === "login" && (
              <>
                Chưa là thành viên?
                <button onClick={toggleMode} className="text-red-600 ml-1">
                  Đăng ký ngay
                </button>
              </>
            )}

            {mode === "register" && (
              <>
                Đã có tài khoản?
                <button onClick={toggleMode} className="text-red-600 ml-1">
                  Đăng nhập
                </button>
              </>
            )}

            {mode === "forgot" && (
              <>
                Đã nhớ mật khẩu?
                <button onClick={() => setMode("login")} className="text-red-600 ml-1">
                  Quay lại
                </button>
              </>
            )}

          </div>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:flex w-1/2 relative bg-black">

        <img
          src="/images/auth_bg.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative text-white p-16 flex flex-col justify-end">

          <h2 className="text-5xl font-bold">
            Làm chủ <span className="text-red-500">tốc độ</span>
          </h2>

          <p className="text-gray-300 mt-4 max-w-md">
            Kết nối với mạng lưới đại lý xe sang hàng đầu.
          </p>

        </div>

      </div>

    </div>
  )
}