import React from "react";
import { IconButton } from "@mui/material";
import { DarkMode, Brightness5Rounded } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/userPreferences/userPreferencesSlice";
import { THEME_MODE } from "../../utils/Constants";

const ThemeSwitcher: React.FC<{iconClassName?:string}> = ({iconClassName="px-10 pt-5"}) => {

    const dispatch = useAppDispatch();
    const themeMode = useAppSelector((state) => state.userPreferences?.theme);
    const handleChange = () => {
        dispatch(toggleTheme())
    }
    return (
        <div className={`text-end ${iconClassName}`}>
            <IconButton onClick={handleChange} className={`${themeMode !== THEME_MODE.light ? 'text-white' : '!text-[#000]'}`}>
                {themeMode === THEME_MODE.light ? <DarkMode />:<Brightness5Rounded />  }
            </IconButton>            
        </div>
    );
};

export default ThemeSwitcher;
