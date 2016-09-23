import React from 'react';
import ReactDOM from 'react-dom';

import { FormRow, Label, InputText, InputSubmit } from '../../formComponents/form-elements';

export const NuovoLocaleForm = ({ titolo, onSubmit, wrapClass, inputNames, onChange, submitState, locale, onClickPanelBtn, rightPanelState }) => {
	return (
    <div className={ rightPanelState} id="right-panel">
      <a onClick={ onClickPanelBtn }>Chiudi</a>
      <div className="form-wrapper">
        <h1 className="titolo">{ titolo }</h1>
        <form onSubmit={ onSubmit }>
          <div className={ wrapClass + ' msg' }>Locale salvato</div>
          <FormRow>
            <Label testo="Nome">
              <InputText name={ inputNames[0] } value={ locale.nome } onChange={(e) => { onChange(e, inputNames[0]) }} />
            </Label>
            <Label testo="Città">
              <InputText name={ inputNames[1] } value={ locale.citta } onChange={(e) => { onChange(e, inputNames[1]) }} />
            </Label>
         </FormRow>

          <InputSubmit value={ submitState } />
        </form>
      </div>
    </div>
	)
}
