import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { List } from "../../store/types";
import { RootState } from "../../store/store";
import { addList, setNotification } from "../../store/actions";
import { translate } from "../../i18n";

const CreateNewList = () => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const [listName, setListName] = useState("");

    const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setListName(e.currentTarget.value);
    };

    const onCreate = () => {
        if (listName.trim() === "") {
            return alert(`${translate('alert_create_list', language)}`);
        }

        const newList: List = {
            id: `list-${new Date().getTime()}`,
            name: listName,
            tasks: [],
        };

        dispatch(addList(newList));
        dispatch(setNotification(`${translate('new_list', language)} "${newList.name}" ${translate('created', language)}`));
        setListName("");
    };

    return (
        <div className="card mb-5">
            <div className="card-header">
                <p className="card-header-title">{translate('card_header_title', language)}</p>
            </div>
            <div className="card-content">
                <div>
                    <div className="field">
                        <label className="label">{translate('list_name', language)}</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder={translate('list_name', language)}
                                name="listName"
                                value={listName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button
                            type="button"
                            className="button is-primary"
                            onClick={onCreate}
                        >
                            {translate('create', language)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewList;
