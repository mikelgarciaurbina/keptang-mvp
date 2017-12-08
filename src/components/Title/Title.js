import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { GithubPicker } from 'react-color';

import { DraggableIcon, OptionsIcon } from '../';
import { Container, Input, Options } from './components';

class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000000',
      dragging: false,
      hover: false,
      options: false,
      position: {
        x: 0,
        y: 0,
      },
    };

    this.onChangeColor = this.onChangeColor.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onOptions = this.onOptions.bind(this);
  }

  onChangeColor({ hex }) {
    this.setState({ color: hex });
  }

  onDrag() {
    const { dragging } = this.state;
    if (!dragging) this.setState({ dragging: true });
  }

  onDragStop(e, position) {
    const { x, y } = position;
    this.setState({ dragging: false, position: { x, y } });
  }

  onHover() {
    this.setState(({ hover }) => ({ hover: !hover }));
  }

  onOptions() {
    this.setState(({ options }) => ({ options: !options }));
  }

  render() {
    const {
      color,
      dragging,
      hover,
      position,
      options,
    } = this.state;
    const showIcons = dragging || hover;

    return (
      <Draggable
        bounds="parent"
        handle="strong"
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        position={position}
      >
        <Container
          onMouseEnter={this.onHover}
          onMouseLeave={this.onHover}
        >
          {showIcons && (
            <DraggableIcon />
          )}
          {showIcons && (
            <OptionsIcon
              onClick={this.onOptions}
              onKeyPress={this.onOptions}
              role="button"
              tabIndex={0}
            />
          )}
          <Input color={color} contentEditable={false} placeholder="Title" />
          {options && (
            <Options>
              <GithubPicker
                color={color}
                onChangeComplete={this.onChangeColor}
              />
            </Options>
          )}
        </Container>
      </Draggable>
    );
  }
}

export default Title;