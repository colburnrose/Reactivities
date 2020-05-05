import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activities';
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
    setEditMode, 
    activity: initialFormState,
    createActivity,
    editActivity
}) => {

    const intializeForm = () => {
        if(initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(intializeForm);

    const handleChangeInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }

    const handleSubmit = () => {
        console.log(activity);
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }else {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleChangeInput} name='title' placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handleChangeInput} rows={2} name='description' placeholder='Description' value={activity.description}/>
                <Form.Input onChange={handleChangeInput} name='category' placeholder='Category' value={activity.category}/>
                <Form.Input onChange={handleChangeInput} name='date' type='datetime-local' placeholder='Date' value={activity.date}/>
                <Form.Input onChange={handleChangeInput} name='city' placeholder='City' value={activity.city}/>
                <Form.Input onChange={handleChangeInput} name='venue' placeholder='Venue' value={activity.venue}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}
export default ActivityForm