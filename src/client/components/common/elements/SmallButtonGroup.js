import React, { Component } from 'react';

export default class SmallButtonGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        }
    }

    componentDidMount() {
        let defaultButton = this.props.defaultButton;
        let buttons = this.props.buttons.map((button, key) => ({
            key: key,
            name: button,
            selected: button === defaultButton ? true : false
        }));
        this.setState({ buttons: buttons });
    }

    selectButton = (key) => {
        let buttons = this.state.buttons;
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].key === key) {
                buttons[i].selected = true;
                this.props.onSelect(buttons[i].name)
            }
            else {
                buttons[i].selected = false;
            }
        }
        this.setState({ buttons: buttons });
    }

    render() {
        const { buttons } = this.state;

        if (buttons.length === 0)
            return <div />;

        return (
            <div className="btn-grp-section">
                {
                    buttons.map((button, key) =>
                        <button key={key} onClick={() => this.selectButton(button.key)}
                            className={`btn-group-single ${button.selected ? 'btn-group-single-selected' : ''}`}>
                            {button.name}
                        </button>
                    )
                }
            </div>
        )
    }
}