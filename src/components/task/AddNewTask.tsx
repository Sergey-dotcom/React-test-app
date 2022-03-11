import {useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, Task } from "../../store/types";
import { addTask, setNotification } from "../../store/actions";
import { RootState } from "../../store/store";
import { translate } from "../../i18n";

interface Props {
    list: List;
}

const AddNewTask= ({ list }: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskName.trim() === "") {
            return alert(`${translate("alert_create_task", language)}`);
        }

        const newTask: Task = {
            name: taskName,
            id: `task-${new Date().getTime()}`,
            completed: false,
        };

        dispatch(addTask(newTask, list));
        dispatch(setNotification(`${translate("new_task", language)} "${newTask.name}" ${translate("created_task", language)}`));
        setTaskName("");
    };

    return (
        <section className="section">
            <h2 className="is-size-4 has-text-centered">
            {translate("add_new_task", language)}
            </h2>
            <form onSubmit={submitHandler}>
                <div className="field">
                    <label className="label">{translate("task_name", language)}</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder={translate('add_task', language)}
                            value={taskName}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="control mt-4">
                        <input
                            type="submit"
                            value={translate("add_task_btn", language)}
                            className="button is-primary"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default AddNewTask;
