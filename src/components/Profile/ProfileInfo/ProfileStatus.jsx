import React from 'react';

export class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleEditMode = () => {
    this.state.editMode ? this.setState({ editMode: false }) : this.setState({ editMode: true });
  };

  onStatusChange = (e) => {
    const text = e.currentTarget.value;
    this.setState({ status: text });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onClick={this.toggleEditMode}>{this.props.status || '----'}</span>
          </div>
        )}

        {this.state.editMode && (
          <div>
            <input
              autoFocus={true}
              onChange={(e) => this.onStatusChange(e)}
              onBlur={() => {
                this.toggleEditMode();
                this.props.updateStatus(this.state.status);
              }}
              type='text'
              value={this.state.status}
            ></input>
          </div>
        )}
      </div>
    );
  }
}
