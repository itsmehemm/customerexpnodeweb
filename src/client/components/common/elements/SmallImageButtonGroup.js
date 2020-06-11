import React, { Component } from 'react';
import defaultImg from '../../../images/default-product-image.png';

export default class SmallImageButtonGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: null,
            buttons: []
        }
    }

    async componentDidMount() {
        let { name, size } = this.props;
        let buttons = this.props.buttons.map((button, key) => ({
            key: key,
            name: button[name],
            picture_links: button.picture_links || [defaultImg],
            selected: false
        }));
        await this.setState({ buttons: buttons, size: size });
    }

    async componentWillReceiveProps(nextProps) {
        let { name, size } = nextProps;
        if (size !== this.state.size) {
            let buttons = nextProps.buttons.map((button, key) => ({
                key: key,
                name: button[name],
                picture_links: button.picture_links || [defaultImg],
                selected: false
            }));
            await this.setState({ buttons: buttons, size: size });
        }
    }

    selectButton = async (key) => {
        let { buttons } = this.state;
        let name = "";
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].key === key) {
                console.log('selected:', buttons[i].name);
                buttons[i].selected = true;
                name = buttons[i].name;
            }
            else {
                buttons[i].selected = false;
            }
        }
        await this.setState({ buttons: buttons });
        await this.props.onSelect(name)
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
                            key={key}
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