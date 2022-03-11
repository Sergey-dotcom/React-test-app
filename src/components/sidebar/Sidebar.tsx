import CreateNewList from "../list/CreateNewList";
import Lists from "../list/Lists";

const Sidebar = () => (
    <div className="column is-3">
        <CreateNewList />
        <Lists />
    </div>
);

export default Sidebar;
