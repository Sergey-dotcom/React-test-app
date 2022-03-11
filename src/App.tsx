import { useSelector } from 'react-redux';
import "./App.css";

import { RootState } from './store/store';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Notification from "./components/notification/Notification";
import DeleteListModal from "./components/modal/DeleteListModal";
import EditListModal from "./components/modal/EditListModal";
import MainContent from "./components/main/MainContent";
import EditTaskModal from "./components/modal/EditTaskModal";
import DeleteTaskModal from "./components/modal/DeleteTaskModal";

const App = () => {
const notificationMsg = useSelector((state: RootState) => state.notification.message);
const listIdToDelete = useSelector((state: RootState) => state.list.listIdToDelete);
const listToEdit = useSelector((state: RootState) => state.list.listToEdit);
const taskToEdit = useSelector((state: RootState) => state.list.taskToEdit);
const taskToDelete = useSelector((state: RootState) => state.list.taskToDelete);

    return (
        <div className="App">
            <Header/>
            <div className="container px-5">
                <div className="columns">
                    <Sidebar />
                    <MainContent />
                </div>
            </div>

            <Notification msg={notificationMsg} />
            {listIdToDelete && <DeleteListModal listId={listIdToDelete}/>}
            {listToEdit && <EditListModal list={listToEdit}/> }
            {taskToEdit && <EditTaskModal taskToEdit={taskToEdit}/>}
            {taskToDelete && <DeleteTaskModal taskToDelete={taskToDelete}/>}
        </div>
    );
};

export default App;
