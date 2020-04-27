import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../models/activities';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      setActivities(response.data)
    })
  }, [])

    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
        </Header>
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
      </div>
    );
}

export default App;
