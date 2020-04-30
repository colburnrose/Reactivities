import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activities';
import { NavBar } from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  const handleCreateButton = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
 

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      setActivities(response.data)
    })
  }, [])

    return (
      <Fragment>
        <NavBar openCreateForm={handleCreateButton}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          />
        </Container>
      </Fragment>
    );
}

export default App;
