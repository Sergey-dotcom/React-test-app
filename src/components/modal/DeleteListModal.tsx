import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import {
    getListById,
    deleteList,
    setNotification,
    setListIdToDelete,
} from "../../store/actions";
import { translate } from "../../i18n";

interface Props {
    listId: string;
}

const DeleteListModal = ({ listId }: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const list = useSelector((state: RootState) => state.list.listById);

    useEffect(() => {
        dispatch(getListById(listId));
    }, [dispatch, listId]);

    const deleteListHandler = () => {
        dispatch(deleteList(listId));
        if (list) {
            dispatch(setNotification(`${translate('list', language)} "${list.name}" ${translate('deleted', language)}!`, "danger"));
        }
    };

    const hideModalHandler = () => {
        dispatch(setListIdToDelete(""));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={hideModalHandler}></div>
            <div className="modal-card">
                <header className="modal-card-head has-text-centered">
                    <p className="modal-card-title">
                    {translate('modal_card_delete_title', language)}
                    </p>
                </header>
                <div className="modal-card-body">
                    <h2 className="is-size-5 has-text-centered">
                    {translate('modal_card_delete_body', language)}
                    </h2>
                    <div className="content">
                        {list?.tasks.length === 0 ? (
                            <p className="has-text-centered pt-4 mb-0">
                                {translate('no_tasks', language)}
                            </p>
                        ) : (
                            <ul>
                                {list?.tasks.map((task) => (
                                    <li key={task.id}>{task.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button
                        type="button"
                        className="button is-danger"
                        onClick={deleteListHandler}
                    >
                        {translate('delete', language)}
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

export default DeleteListModal;
