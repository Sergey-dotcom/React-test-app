import { connect } from "react-redux";

import { List } from "../../store/types";
import SelectList from "../list/SelectList";
import { RootState } from "../../store/store";
import AddNewTask from "../task/AddNewTask";
import Tasks from "../task/Tasks";

interface Props {
  list: List
}

const MainContent= ({ list }: Props) => (
  <div className="column is-9">
      <div className="box">
          <SelectList />
          {list && (
              <>
                  <AddNewTask list={list} />
                  <hr />
                  <Tasks tasks={list.tasks} />
              </>
          )}
      </div>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  list: state.list.selectedList!,
});

export default connect(mapStateToProps)(MainContent);
