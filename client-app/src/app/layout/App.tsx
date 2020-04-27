import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activities';
import { NavBar } from '../../features/nav/NavBar';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      setActivities(response.data)
    })
  }, [])

    return (
      <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
        <List link>
        {activities.map((activity) => (
            <ul>
              <List.Item key={activity.id}>{activity.title}</List.Item>
              <List.Item key={activity.id}>{activity.description}</List.Item>
              <List.Item key={activity.id}>{activity.category}</List.Item>
              <List.Item key={activity.id}>{activity.date}</List.Item>
              <List.Item key={activity.id}>{activity.city}</List.Item>
              <List.Item key={activity.id}>{activity.venue}</List.Item>
            </ul>
        ))}         
        </List>
        </Container>
      </Fragment>
    );
}

export default App;
