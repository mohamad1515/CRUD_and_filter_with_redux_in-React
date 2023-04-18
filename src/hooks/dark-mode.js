import { useState, useEffect } from 'react'
import {
    changeTheme
} from "../redux/actions/PostActions";
import { useDispatch } from 'react-redux';

const useDarkMode = () => {
    const dispatch = useDispatch();

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }


    useEffect(() => {
        dispatch(changeTheme(theme));

    }, [dispatch, theme]);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        if (localTheme) {
            setTheme(localTheme)
        }
    }, [])

    return [theme, toggleTheme]

}

export default useDarkMode