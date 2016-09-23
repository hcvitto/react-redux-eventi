var React = require('react');
var ReactDOM = require('react-dom');

import { FormRow, Label, InputHidden, InputText, InputSelect, InputSubmit } from '../../formComponents/form-elements';

export const FormEvento = ({ titolo, onSubmit, wrapClass, evento, inputNames, onChange, submitState, localiOpts, generiOpts, mailOpts }) => {
    return (
      <div className="form-wrapper">
        <h1 className="titolo">{ titolo }</h1>
        <form onSubmit={ onSubmit }>
          <div className={ wrapClass + ' msg' }>Evento salvato</div>
          <FormRow>
            <Label testo="Nome">
              <InputText name={ inputNames[0] } value={ evento.nome } onChange={(e) => { onChange(e, inputNames[0]) }} />
            </Label>
            <Label testo="Locale" />
              <InputSelect name={ inputNames[1] } value={ evento.locale } opts={ localiOpts } onChange={(e) => { onChange(e, inputNames[1]) }} />
            <Label testo="Data">
              <InputText name={ inputNames[2] } value={ evento.data } onChange={(e) => { onChange(e, inputNames[2]) }} />
            </Label>
            <Label testo="Genere" />
              <InputSelect name={ inputNames[3] } value={ evento.genere } opts={ generiOpts } onChange={(e) => { onChange(e, inputNames[3]) }} />
            <Label testo="Ricordamelo via mail (ore di anticipo)" />
              <InputSelect name={ inputNames[4] } value={ evento.mail } opts={ mailOpts } onChange={(e) => { onChange(e, inputNames[4]) }} />
            <Label testo="Link">
              <InputText name={ inputNames[5] } value={ evento.link } onChange={(e) => { onChange(e, inputNames[5]) }} />
            </Label>
         </FormRow>

          <InputHidden name={ inputNames[6] }  value={ evento.id } />
          <InputSubmit value={ submitState } />
        </form>
      </div>
    );
}
