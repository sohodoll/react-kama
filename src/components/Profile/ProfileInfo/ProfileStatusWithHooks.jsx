import React from 'react';

export const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = React.useState(false);
  const [status, setStatus] = React.useState(props.status);

  const toggleEditMode = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const onStatusChange = (e) => {
    const text = e.currentTarget.value;
    setStatus(text);
  };

  React.useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div>
      {!editMode && (
        <div>
          <span onClick={toggleEditMode}>{props.status || '----'}</span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            autoFocus={true}
            onChange={(e) => onStatusChange(e)}
            onBlur={() => {
              toggleEditMode();
              props.updateStatus(status);
            }}
            type='text'
            value={status}
          ></input>
        </div>
      )}
    </div>
  );
};
