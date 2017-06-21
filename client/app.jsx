
import React from 'react';
import {
  Button,
  ButtonArea,
  Form,
  FormCell,
  CellsTitle,
  TextArea,
  Input,
  CellHeader,
  CellBody,
  Label
} from 'react-weui';
import axios from 'axios';
import WebviewControls from '../messenger-api-helpers/webview-controls';

class App extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      time: `${now.getHours()}:${now.getMinutes()}`,
      message: null
    }
  }

  pushData() {
    alert("viewerId", this.props.viewerId)
    if (this.props.viewerId == null) {
      console.log('No user id present to set reminder');
      return;
    }

    console.log("Pushing reminder");
    let date = new Date(this.state.time);
    axios.post('http://reminderapi.herokuapp.com/api/reminders', {
        user_id: this.props.viewerId,
        next_reminder: date.setHours(date.getHours() + 1),
        message: this.state.message,
        frequency: '86400000'
    })
    .then(response => {
      alert(response);
      if (response.ok) {
        console.log('Data successfully updated on the server!');
        return;
      }

      console.error(
        response.status,
        `Unable to save user data for User ${this.props.viewerId}'`
      );
    }).catch((err) => console.error('Error pushing data', err)).then(() => {
      WebviewControls.close();
    });
  }

  render() {
    const { time } = this.state;
    return <div>
       <CellsTitle>Set daily reminder</CellsTitle>
       
       <Form>
        <FormCell>
          <CellHeader>
            <Label>Time</Label>
          </CellHeader>
          <CellBody>
            <Input type="time" value={time} onChange={(e) => this.setState({ time: e.target.value })}/>
          </CellBody>
        </FormCell>

        <CellsTitle>Message</CellsTitle>
        <FormCell>
          <CellBody>
            <TextArea placeholder="Enter a message" rows="3" maxlength="200" onChange={(e) => this.setState({ message: e.target.value })}></TextArea>
          </CellBody>
        </FormCell>
      </Form>

      <ButtonArea>
        <Button onClick={() => this.pushData()}>Create Reminder</Button>
      </ButtonArea>
    </div>;
  }
};

export default App;