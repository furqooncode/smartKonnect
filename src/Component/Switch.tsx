import { useTheme } from '../Context/ToggleTheme.tsx'; 
export default function Switch() {
  const { Toggle, isdarkMode } = useTheme();
  return ( 
    <label className="relative inline-block w-14 h-7 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isdarkMode}
        onChange={Toggle}
      />
      <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
      <div className="absolute top-1 left-1 w-5 h-5 bg-black rounded-full
      transition-transform duration-300 peer-checked:bg-white peer-checked:translate-x-7 shadow-md"></div>
    </label>
  );
}