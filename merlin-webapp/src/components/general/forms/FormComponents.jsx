import React from 'react';
import PropTypes from 'prop-types';
import {FormFeedback, Input, UncontrolledTooltip} from 'reactstrap';
import {revisedRandId} from '../../../utilities/global';
import {IconInfo} from '../IconComponents';

// TODO: SPLIT IN DIFFERENT FILES

function FormGroup({children}) {
    return (
        <div className={`form-group row`}>
            {children}
        </div>
    );
}

FormGroup.propTypes = {
    children: PropTypes.node
};

FormGroup.defaultProps = {
    children: null
};


function FormLabel({length, htmlFor, children}) {
    return (
        <label
            className={`col-sm-${length} col-form-label`}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}

FormLabel.propTypes = {
    length: PropTypes.number,
    htmlFor: PropTypes.string
};

FormLabel.defaultProps = {
    length: 2,
    htmlFor: null
};


function FormInput(props) {
    var {fieldLength, ...other} = props;
    return (
        <Input
            {...other}
            className={`col-sm-${props.fieldLength} ${props.className}`}
        />
    );
}

FormInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    fieldLength: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    valid: PropTypes.bool,
    invalid: PropTypes.bool,
    className: PropTypes.string
};

FormInput.defaultProps = {
    id: null,
    name: '',
    fieldLength: 10,
    value: '',
    min: null,
    max: null,
    step: 1,
    type: 'text',
    placeholder: '',
    valid: null,
    invalid: null
};


function FormSelect(props) {
    return (
        <select
            {...props}
            className={'custom-select form-control form-control-sm mr-1'}
        />
    );
}

FormSelect.propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node
};

FormSelect.defaultProps = {
    id: null,
    value: null,
    name: '',
    onChange: null,
    children: null
};


function FormCheckbox({id, name, checked, onChange, hint, label}) {
    if (!id) {
        id = revisedRandId();
    }
    let tooltip = null;
    if (hint) {
        tooltip = <React.Fragment> <span id={`info-${id}`}><IconInfo/></span>
            <UncontrolledTooltip placement="right" target={`info-${id}`}>
                {hint}
            </UncontrolledTooltip></React.Fragment>;
    }
    let labelNode = <label
            className={'custom-control-label'}
            htmlFor={id}>
            {label}
        </label>;
    return (
        <div class="custom-control custom-checkbox">
    <input class="custom-control-input" id={id} type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
     />
     {labelNode}
            {tooltip}
  </div>
    );
}

FormCheckbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    hint: PropTypes.string,
    label: PropTypes.node
};

FormCheckbox.defaultProps = {
    id: null,
    name: '',
    checked: false,
    onChange: null,
    hint: '',
    label: ''
};


function FormField({id, hint, length, children, validationMessage}) {
    return (
        <div
            className={`col-sm-${length}`}
            id={id}
        >
            {children}
            {validationMessage ? <FormFeedback>{validationMessage}</FormFeedback> : ''}
            {hint ? <small className={'text-muted'}>{hint}</small> : ''}
        </div>
    );
}

FormField.propTypes = {
    id: PropTypes.string,
    hint: PropTypes.node,
    length: PropTypes.number,
    validationMessage: PropTypes.string,
    children: PropTypes.node
};

FormField.defaultProps = {
    id: null,
    hint: null,
    length: 10,
    validationMessage: null,
    children: null
};


function FormLabelField({id, htmlFor, validationMessage, labelLength, fieldLength, label, hint, children}) {
    const forId = htmlFor || id || revisedRandId();
    return (
        <FormGroup>
            <FormLabel length={labelLength} htmlFor={forId}>
                {label}
            </FormLabel>
            <FormField length={fieldLength} hint={hint} validationMessage={validationMessage}>
                {React.cloneElement(children, {id: forId})}
            </FormField>
        </FormGroup>
    );
}

FormLabelField.propTypes = {
    id: PropTypes.string,
    htmlFor: PropTypes.string,
    validationMessage: PropTypes.string,
    labelLength: PropTypes.number,
    fieldLength: PropTypes.number,
    label: PropTypes.node,
    hint: PropTypes.string,
    children: PropTypes.node
};

FormLabelField.defaultProps = {
    id: null,
    htmlFor: null,
    validationMessage: null,
    labelLength: 2,
    fieldLength: 10,
    label: '',
    hint: '',
    children: null
};


function FormLabelInputField({id = revisedRandId(), ...props}) {
    return (
        <FormLabelField
            htmlFor={id}
            labelLength={props.labelLength}
            label={props.label}
            hint={props.hint}
            validationState={props.validationState}
        >
            <FormInput
                id={id}
                name={props.name}
                type={props.type}
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onChange={props.onChange}
                fieldLength={props.fieldLength}
                placeholder={props.placeholder}
            />
        </FormLabelField>
    );
}

FormLabelInputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.node,
    labelLength: PropTypes.number,
    fieldLength: PropTypes.number,
    hint: PropTypes.string,
    validationState: PropTypes.oneOf(['success', 'warning', 'error', null]),
    type: PropTypes.string,
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

FormLabelInputField.defaultProps = {
    id: null,
    label: '',
    labelLength: 2,
    fieldLength: 10,
    hint: '',
    validationState: null,
    type: 'text',
    name: '',
    min: null,
    max: null,
    step: 1,
    value: '',
    onChange: null,
    placeholder: ''
};


function FormFieldset({id, text, children}) {
    return (
        <fieldset className={'form-group'} id={id}>
            <legend>{text}</legend>
            {children}
        </fieldset>
    );
}

FormFieldset.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node
};

FormFieldset.defaultProps = {
    id: null,
    text: '',
    children: null
};


function FormButton({bsStyle = 'default', type, onClick, hint, disabled, children}) {
    return (
        <button
            type={type}
            className={`btn btn-outline-primary btn-${bsStyle}`}
            onClick={onClick}
            title={hint}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

FormButton.propTypes = {
    bsStyle: PropTypes.oneOf(['default', 'danger', 'success', null]),
    type: PropTypes.string,
    onClick: PropTypes.func,
    hint: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node
};
FormButton.defaultProps = {
    bsStyle: 'default',
    type: 'button',
    onClick: null,
    hint: '',
    disabled: false,
    children: null
};

export {
    FormGroup,
    FormLabel,
    FormField,
    FormLabelField,
    FormInput,
    FormSelect,
    FormCheckbox,
    FormLabelInputField,
    FormFieldset,
    FormButton
};
