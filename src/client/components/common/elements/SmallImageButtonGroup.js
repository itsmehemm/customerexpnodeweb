import React, { Component } from 'react';
import defaultImg from '../../../images/default-product-image.png';

export default class SmallImageButtonGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        }
    }

    async componentDidMount() {
        let { defaultButton, name } = this.props;
        let buttons = this.props.buttons.map((button, key) => ({
            key: key,
            name: button[name],
            picture_links: button.picture_links || [defaultImg],
            selected: button[name] === defaultButton ? true : false
        }));
        await this.setState({ buttons: buttons });
    }

    selectButton = async (key) => {
        let { buttons } = this.state;
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].key === key) {
                buttons[i].selected = true;
                this.props.onSelect(buttons[i].name)
            }
            else {
                buttons[i].selected = false;
            }
        }
        await this.setState({ buttons: buttons });
    }

    render() {
        const { buttons } = this.state;
        if (buttons.length === 0)
            return <div />;
        return (
            <div className="btn-grp-section">
                {
                    buttons.map((button, key) =>
                        <img
                            src={button.picture_links[0]}
                            alt={button.name}
                            height="85px"
                            width="85"
                            className={`img-btn-group-single ${button.selected ? 'img-btn-group-single-selected' : ''}`}
                            onClick={() => this.selectButton(button.key)}
                        />
                    )
                }
            </div>
        );
    }
};