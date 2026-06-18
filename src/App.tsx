import Approutes from './routes.tsx'
import { useTheme } from './Context/ToggleTheme.tsx';

export default function App() {
  {/** useEffect(() => {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole();
    });
    console.log("page mounted!!")
  }, []); **/}
  
  const { colors } = useTheme();
  return(
    <div className="h-[100vh]" style={{
      background: colors.background,
    }}>
        <Approutes />
    </div>
  
    )
}