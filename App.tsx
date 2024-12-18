// as Usually  App.tsx to translate use like this 
import {initI18n } from './i18n '

const App : React.FC =() =>{

  const [isInitialized ,setisInitialized ] = useState(false)
  useEffect(() =>{

      const   initialize = async () =>{
        await initI18n();
        setisInitialized(true)
      };
    initialize();
  },[]);



  return (
// Do what you wnat here 
    
  )
}
