import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: []
    };
  }

  componentDidMount = () => {
    this.getTasks();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let items = JSON.parse(localStorage.getItem("items"));
    if (items == null) {
      items = [];
    }
    let item = {
      task: this.state.task,
      status: false
    };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    // clear the form
    this.setState({ task: "" });
    this.getTasks();
  };

  getTasks = () => {
    let items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      items = items.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });
      // console.log(n, items);
      localStorage.setItem("items", JSON.stringify(items));

      this.setState({
        items: items.map((item, index) => {
          let color = "blue";
          let cardBackground = { background: "white" };
          let taskComplete = { textDecoration: "none" };
          if (item.status) {
            color = "green";
            cardBackground.background = "beige";
            taskComplete["textDecoration"] = "line-through";
          }
          return (
            <Card key={index} color={color} fluid style={cardBackground}>
              <Card.Content>
                <Card.Header textAlign="left" style={taskComplete}>
                  <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                </Card.Header>

                <Card.Meta textAlign="right">
                  <Icon
                    link
                    name="check circle"
                    color="blue"
                    onClick={() => this.updateTask(index)}
                    style={{ paddingRight: 20 }}
                  />
                  
                  <Icon
                    link
                    name="undo"
                    color="black"
                    onClick={() => this.undoTask(index)}
                    style={{ paddingRight: 20 }}
                  />
                  
                  <Icon
                    link
                    name="delete"
                    color="red"
                    onClick={() => this.deleteTask(index)}
                    style={{ paddingRight: 20 }}
                  />

                </Card.Meta>
              </Card.Content>
            </Card>
          );
        })
      });
    }
  };

  updateTask = index => {
    let items = JSON.parse(localStorage.getItem("items"));
    items[index].status = true;
    localStorage.setItem("items", JSON.stringify(items));
    this.getTasks();
  };

  undoTask = index => {
    let items = JSON.parse(localStorage.getItem("items"));
    items[index].status = false;
    localStorage.setItem("items", JSON.stringify(items));
    this.getTasks();
  };

  deleteTask = index => {
    console.log("inside delete", index);
    let items = JSON.parse(localStorage.getItem("items"));
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    this.getTasks();
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header
            className="header"
            as="a"
            style={{
              fontFamily: "Permanent Marker, sans-serif",
              fontSize: "35px",
              paddingRight: "150px",
              paddingLeft: "150px"
            }}
          >
            <fff>
            📝 ToDoist
            </fff>{" "}
          </Header>

        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit} 
          style={{
            paddingRight: "150px",
            paddingLeft: "150px"
          }}
          >
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Sth."
            />
            {/* <Button >Create Task</Button> */}
          </Form>
        </div>
        <div className="row">
          <Card.Group
            style={{
              paddingRight: "150px",
              paddingLeft: "150px"
            }}
          >{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
