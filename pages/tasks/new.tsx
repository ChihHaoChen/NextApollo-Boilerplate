import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddTaskMutation } from 'lib/graphql/addTask.graphql';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


export default function CreateStream() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const router = useRouter();

  // Signing In
	const [addTask] = useAddTaskMutation()
	

	const clearTextFields = ()	=> {
		setTitle('')
		setDescription('')
		setCompletedAt('')
	}

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTask({
        variables: { input: { title, description, completedAt } },
			});
      if (data.addTask._id) {
        router.push('/tasks');
      }
    } catch (err) {
      console.log(err);
		}
		clearTextFields()
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Create A New Task</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="CompletedAt"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
}