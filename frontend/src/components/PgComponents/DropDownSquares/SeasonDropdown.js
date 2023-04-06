import React from 'react';

class SeasonDropdown extends React.Component {
    handleChange = (event) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    };

    render() {
        return (
            <select onChange={this.handleChange}>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
            </select>
        );
    }
}

export default SeasonDropdown;
