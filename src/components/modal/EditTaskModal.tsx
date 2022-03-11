import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Task, List } from "../../store/types";
import { RootState } from "../../store/store";
import {
    updateTask,
    unsetTaskToEdit,
    setNotification,
} from "../../store/actions";
import { translate } from "../../i18n";

interface Props {
    taskToEdit: {
        task: Task;
        list: List;
    };
}

const EditTaskModal = ({ taskToEdit: { task, list } }: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState(task.name);
    const [taskState, setTaskState] = useState(task.completed);

    const closeModalHandler = () => {
        dispatch(unsetTaskToEdit());
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskName.trim() === "") {
            return alert(`${translate("alert_create_task", language)}`);
        }

        if (taskName === task.name && taskState === task.completed) {
            return alert(`${translate("task_name_before", language)}`);
        }

        dispatch(updateTask(task.id, taskName, taskState, list));
        dispatch(
            setNotification(
                `${translate("task", language)} "${task.name}" ${translate(
                    "task_updated",
                    language
                )}`
            )
        );
    };

    const nameChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
    };

    const stateChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setTaskState(e.currentTarget.checked);
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModalHandler}></div>
            <form className="modal-card" onSubmit={submitHandler}>
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        {translate("edit_task", language)}
                    </p>
                    <button
                        type="button"
                        className="delete"
                        onClick={closeModalHandler}
                    ></button>
                </header>
                <div className="modal-card-body">
                    <div className="field">
                        <label className="label">
                            {translate("task_name", language)}
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder={translate("task_name", language)}
                                value={taskName}
                                onChange={nameChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            {translate("complete_task", language)}
                        </label>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={taskState}
                                onChange={stateChangeHandler}
                            />{" "}
                            {translate("complete", language)}
                        </label>
                    </div>
                </div>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success">
                        {translate("save_changes", language)}
                    </button>
                    <button
                        type="button"
                        className="button"
                        onClick={closeModalHandler}
                    >
                        {translate("cancel", language)}
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EditTaskModal;
