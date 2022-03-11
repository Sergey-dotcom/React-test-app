import { useDispatch, useSelector } from "react-redux";

import { Task, List } from "../../store/types";
import {
    unsetTaskToDelete,
    deleteTask,
    setNotification,
} from "../../store/actions";
import { RootState } from "../../store/store";
import { translate } from "../../i18n";

interface Props {
    taskToDelete: {
        task: Task;
        list: List;
    };
}

const DeleteTaskModal= ({
    taskToDelete: { task, list },
}: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();

    const closeModalHandler = () => {
        dispatch(unsetTaskToDelete());
    };

    const deleteHandler = () => {
        dispatch(deleteTask(task, list));
        dispatch(setNotification(`${translate('task', language)} "${task.name}" ${translate('task_deleted', language)}`, "danger"));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModalHandler}></div>
            <div className="modal-card">
                <header className="modal-card-head has-text-centered">
                    <p className="modal-card-title">
                        {translate('delete_task_modal', language)}
                    </p>
                </header>
                <footer className="modal-card-foot">
                    <button
                        type="button"
                        className="button is-danger"
                        onClick={deleteHandler}
                    >
                        {translate('delete', language)}
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={closeModalHandler}
                    >
                        {translate('cancel', language)}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
