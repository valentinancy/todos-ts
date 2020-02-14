import React, { FunctionComponent } from 'react';
import { E_BUTTON_TYPE } from '../interfaces/dataTypes';

import trashIcon from '../assets/trash.png';
import plusIcon from '../assets/plus.png'

interface IActionButton {
    buttonType: E_BUTTON_TYPE;
    handleAction: () => void;
    isChecked?: boolean;
}

const ActionButton: FunctionComponent<IActionButton> = (props) => {
    const { buttonType, handleAction, isChecked } = props;

    let buttonComponent;
    switch(buttonType) {
        case E_BUTTON_TYPE.DELETE:
            buttonComponent = (
                <div className="task-remover">
                    <img src={trashIcon} className="task-remove-icon" onClick={() => handleAction()} />
                </div>
            )
            break;
        case E_BUTTON_TYPE.ADD:
            buttonComponent = (
                <div className="task-remover">
                    <button className="task-add-button" onClick={() => handleAction()}>Add</button>
                </div>
            )
            break;
        case E_BUTTON_TYPE.CHECK:
            buttonComponent = (
                <div className="task-checker">
                    {<input className="task-checkbox" type="checkbox" name="checked" onChange={() => handleAction()} checked={isChecked}/>}
                </div>
            )
            break;
        case E_BUTTON_TYPE.ADDING:
            buttonComponent = (
                <div className="task-checker">
                    <img src={plusIcon}  className="new-task-add-icon" />
                </div>
            )
            break;
    }
    return buttonComponent;
}

export default ActionButton;