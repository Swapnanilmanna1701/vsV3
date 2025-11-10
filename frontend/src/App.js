import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pipeline Builder</h1>
        <p>
          Create powerful node-based workflows with drag-and-drop simplicity
        </p>
        <SubmitButton />
      </header>
      <PipelineToolbar />
      <div className="pipeline-ui-container">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
