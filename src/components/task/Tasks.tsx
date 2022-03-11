import { connect, useDispatch,useSelector } from "react-redux";

import { Task, List, ListsAction } from "../../store/types";
import { setTaskToDelete, setTaskToEdit } from "../../store/actions";
import { RootState } from "../../store/store";
import { translate } from "../../i18n";

interface Props {
    tasks: Task[];
    list: List;
    setTaskToEdit: (task: Task, list: List) => ListsAction;
    setTaskToDelete: (task: Task, list: List) => ListsAction;
}

const Tasks = ({ tasks, list }: Props) => {
    const { language } = useSelector((state: RootState) => state.lang);
    const dispatch = useDispatch();
    const setTaskToEditHandler = (task: Task) =>
        dispatch(setTaskToEdit(task, list));
    const setTaskToDeleteHandler = (task: Task) =>
        dispatch(setTaskToDelete(task, list));

    return (
        <section className="section">
            <h2 className="is-size-4 has-text-centered">
            {translate('list_of_tasks', language)}
            </h2>
            {tasks.length ? (
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>{translate('task', language)}</th>
                            <th className="has-text-centered">{translate('edit', language)}</th>
                            <th className="has-text-centered">{translate('delete', language)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task: Task) => (
                            <tr
                                key={task.id}
                                className={task.completed ? "completed" : ""}
                            >
                                <td>{task.name}</td>
                                <td className="has-text-centered">
                                    <button
                                        className="button is-primary is-small"
                                        onClick={() =>
                                            setTaskToEditHandler(task)
                                        }
                                    >
                                        <span className="icon">
                                            <i className="fas fa-edit"></i>
                                        </span>
                                    </button>
                                </td>
                                <td className="has-text-centered">
                                    <button
                                        className="button is-danger is-small"
                                        onClick={() =>
                                            setTaskToDeleteHandler(task)
                                        }
                                    >
                                        <span className="icon">
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="py-4 has-text-centered">{translate('no_tasks', language)}</p>
            )}
        </section>
    );
};

const mapStateToProps = (state: RootState) => ({
    list: state.list.selectedList!,
});

const mapDispatchToProps = {
    setTaskToEdit,
    setTaskToDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
