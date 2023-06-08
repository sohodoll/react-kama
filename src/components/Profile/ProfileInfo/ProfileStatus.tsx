import React, { ChangeEvent } from 'react';

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

type StateType = {
  editMode: boolean;
  status: string;
};

export class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleEditMode = () => {
    this.state.editMode ? this.setState({ editMode: false }) : this.setState({ editMode: true });
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    this.setState({ status: text });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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
