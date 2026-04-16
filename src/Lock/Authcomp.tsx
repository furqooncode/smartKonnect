import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { useState, useRef } from 'react';
import { useTheme } from '../Context/ToggleTheme.tsx';

export default function Authcomp() {
  const { colors } = useTheme();
  const [isActive, setIsActive] = useState<'Login' | 'Register'>('Login');
  const touchStartX = useRef<number>(0);

  const glassStyle = {
    background: 'rgba(59, 130, 246, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  }

  const glassActiveStyle = {
    background: 'rgba(59, 130, 246, 0.12)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    color: colors.accent,
  }

  const unActive = {
    background: "transparent",
    color: colors.textSecondary,
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) setIsActive('Register');
    if (diff < -60) setIsActive('Login');
  }

  return (
    <div
      className="min-h-[100vh] w-full px-[20px] py-8 grid place-items-center"
      style={{ background: colors.background }}
    >
      <div className="flex w-full p-3 rounded-xl">

        {/* ads box — lg only */}
        <div className="hidden lg:block w-[50%]" style={{ background: "red" }}>
          <h1>Avatar will be here</h1>
        </div>

        {/* field section */}
        <div
          className="w-full lg:w-[50%] p-3 rounded-xl"
          style={{ background: colors.surface }}
        >
          {/* tabs */}
          <div
            className="flex w-full gap-3 justify-center items-center p-1 rounded-xl"
            style={glassStyle}
          >
            <div
              className="flex items-center justify-center rounded-lg w-[45%] h-[35px] cursor-pointer"
              style={isActive === 'Register' ? glassActiveStyle : unActive}
              onClick={() => setIsActive('Register')}
            >
              <span className="font-semibold text-sm">Register</span>
            </div>

            <div
              className="flex items-center justify-center rounded-lg w-[45%] h-[35px] cursor-pointer"
              style={isActive === 'Login' ? glassActiveStyle : unActive}
              onClick={() => setIsActive('Login')}
            >
              <span className="font-semibold text-sm">Login</span>
            </div>
          </div>

          {/* content */}
          <div
            className="mt-[15px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isActive === 'Login' ? <Login /> : <Signup />}
          </div>

        </div>
      </div>
    </div>
  );
}