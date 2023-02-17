import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

class PageContainer extends React.Component<{}, { editorState: any }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    console.log(`newState: ${newState}`);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };
  onTestClick = () => {
    const currentContent = this.state.editorState.getCurrentContent();
    const textBox = document && document.getElementById("textbox");
    textBox?.focus();

    console.log(`currentContent: ${currentContent}`);
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  render() {
    let className = "RichEditor-editor";
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className="editorContainer">
        <button
          className="btn"
          onClick={this.onTestClick}
          disabled={this.state.editorState.getSelection().isCollapsed()}
        >
          <em>TEST</em>
        </button>
        <hr />
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button className="btn" onClick={this.onUnderlineClick}>
          U
        </button>
        <button className="btn" onClick={this.onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={this.onItalicClick}>
          <em>I</em>
        </button>
        <textarea className="form-control" id="textbox"></textarea>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;
