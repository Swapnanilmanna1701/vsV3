import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-title">Available Nodes</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' description='Data input' />
                <DraggableNode type='customOutput' label='Output' icon='📤' description='Data output' />
                <DraggableNode type='llm' label='LLM' icon='🤖' description='Language model' />
                <DraggableNode type='text' label='Text' icon='📝' description='Text processing' />
                <DraggableNode type='calculator' label='Calculator' icon='🧮' description='Math operations' />
                <DraggableNode type='filter' label='Filter' icon='🔍' description='Conditional routing' />
                <DraggableNode type='delay' label='Delay' icon='⏱️' description='Time delay' />
                <DraggableNode type='transformer' label='Transformer' icon='⚡' description='Data transform' />
                <DraggableNode type='router' label='Router' icon='🔀' description='Multi-path routing' />
            </div>
        </div>
    );
};
