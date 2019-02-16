import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

        const { formElements } = this.props;

        this.state = {
            formValues: formElements.reduce((a, x) => ({
                ...a,
                [x.id]: x.defaultValue || '',
            }),
            {}),
        };
    }

    handleInputChange = (elementId, event) => {
        // TODO: validation and casting
        const { formValues } = this.state;
        const { setFormValues } = this.props;

        formValues[elementId] = event.target.value;
        // this.setState({ formValues });

        // notify the parent
        setFormValues(formValues);
    }

    render() {
        const { formElements, children, formClass } = this.props;
        const { formValues } = this.state;

        const inputElements = formElements.map(element => (
            <FormControl key={element.id} margin="normal" required fullWidth>
                <InputLabel htmlFor={element.id}>{element.label}</InputLabel>
                <Input
                    name={element.label}
                    type={element.type || 'text'}
                    id={element.id}
                    value={formValues[element.id]}
                    onChange={ev => this.handleInputChange(element.id, ev)} // TODO: no lambda
                />
            </FormControl>
        ));
        return (
            <form className={formClass}>
                {inputElements}
                {children}
            </form>
        );
    }
}

FormInput.propTypes = {
    formElements: PropTypes.array.isRequired,
    setFormValues: PropTypes.func.isRequired,
    children: PropTypes.array,
    formClass: PropTypes.string,
};
