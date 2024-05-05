import { useContext, useEffect } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { DarkModeContext } from "../context/DarkModeContext";
function DarkModeToggle() {
    const {isDark,toggleDarkMode} = useContext(DarkModeContext);

    useEffect(()=>{
        if(isDark){
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        }else{

            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
    },[isDark])
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
export default DarkModeToggle;
