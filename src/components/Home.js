
import Notes from "./Notes";

function Home() {



  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className ="form-group">
            <label for="email">Email address:</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className ="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className ="form-control" id="pwd" />
          </div>
          <div className ="checkbox">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <button type="submit" className ="btn btn-primary">
            Submit
          </button>
        </form>
      <Notes />
      </div>
    </div>
  );
}

export default Home;
