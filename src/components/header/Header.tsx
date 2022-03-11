import { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { setLanguage } from "../../store/actions/langActions";
import { translate } from "../../i18n";

const Header = () => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownEl = useRef<HTMLUListElement>(null);

    const handleClickOutside = useCallback(
        (e) => {
            if (
                showDropdown &&
                e.target.closest(".dropdown") !== dropdownEl.current
            ) {
                setShowDropdown(false);
            }
        },
        [showDropdown, setShowDropdown, dropdownEl]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    const chooseLanguageHandler = (value: string) => {
        setShowDropdown(false);
        dispatch(setLanguage(value));
    };

    return (
        <header className="hero has-text-centered is-primary is-bold mb-5">
            <div className="hero-body">
                <div className="header__nav_lang">
                    <p
                        className="selected"
                        onClick={() => setShowDropdown(true)}
                    >
                        {language}
                    </p>
                    {showDropdown && (
                        <ul className="dropdown" ref={dropdownEl}>
                            <li onClick={() => chooseLanguageHandler("EN")}>
                                EN
                            </li>
                            <li onClick={() => chooseLanguageHandler("RU")}>
                                RU
                            </li>
                        </ul>
                    )}
                </div>
                <div className="container">
                    <h1 className="title mb-3">{translate('title', language)}</h1>
                    <h2 className="subtitle mt-0">{translate('subtitle', language)}</h2>
                </div>
            </div>
        </header>
    );
};

export default Header;
