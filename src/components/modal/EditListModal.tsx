import {FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List } from "../../store/types";
import { RootState } from "../../store/store";
import { setListToEdit, updateList, setNotification } from "../../store/actions";
import { translate } from "../../i18n";

interface Props {
    list: List;
}

const EditListModal = ({ list }: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const [listName, setListName] = useState(list.name);

    const onSave = () => {
        if (listName.trim() === "") {
            return alert(`${translate('alert_create_list', language)}`);
        }

        if (listName.trim() === list.name) {
            return alert(`${translate('list_name_befor', language)}`);
        }

        dispatch(updateList(list.id, listName.trim()));
        dispatch(setNotification(`${translate('list', language)} "${list.name}" ${translate('updated', language)}`));
    };

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        setListName(e.currentTarget.value);
    };

    const hideModalHandler = () => {
        dispatch(setListToEdit(""));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={hideModalHandler}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{translate('edit_list', language)}</p>
                    <button
                        type="button"
                        className="delete"
                        onClick={hideModalHandler}
                    ></button>
                </header>
                <div className="modal-card-body">
                    <div className="field">
                        <label className="label">{translate('list_name', language)}</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="listName"
                                placeholder="List Name"
                                value={listName}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button
                        type="button"
                        className="button is-success"
                        onClick={onSave}
                    >
                        {translate('save_changes', language)}
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={hideModalHandler}
                    >
                        {translate('cancel', language)}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EditListModal;
