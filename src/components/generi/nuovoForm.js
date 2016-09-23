import React from 'react';
import ReactDOM from 'react-dom';

import { FormRow, Label, InputText, InputSubmit } from '../../formComponents/form-elements';

export const NuovoGenereForm = ({ titolo, onSubmit, wrapClass, inputNames, onChange, submitState, genere, onClickPanelBtn, rightPanelState  }) => {
	return (
    <div className={ rightPanelState} id="right-panel">
      <a onClick={ onClickPanelBtn }>Chiudi</a>
      <div className="form-wrapper">
        <h1 className="titolo">
            { titolo }
        </h1>
        <form onSubmit={ onSubmit }>
          <div className={ wrapClass + ' msg' }>Genere salvato</div>
          <FormRow>
            <Label testo="Label">
              <InputText name={ inputNames[0] } value={ genere.label } onChange={(e) => { onChange(e, inputNames[0]) }} />
            </Label>
         </FormRow>

          <InputSubmit value={ submitState } />
        </form>
      </div>
    </div>
	)
}
