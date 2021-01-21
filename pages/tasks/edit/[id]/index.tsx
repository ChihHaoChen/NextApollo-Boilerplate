import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { initializeApollo } from 'lib/apollo'
import { useUpdateTaskMutation } from 'lib/graphql/updateTask.graphql'
import { useRemoveTaskMutation } from 'lib/graphql/removeTask.graphql'
import { TaskDocument } from 'lib/graphql/task.graphql'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export default function EditStream({ id }) {
  const router = useRouter();
  const [updateTask] = useUpdateTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  const [state, setState] = useState({
    _id: '',
    title: '',
    description: '',
    completedAt: '',
  })

  const { _id, title, description, completedAt } = state

  const fetchTask = async () => {
    const apollo = initializeApollo();
    const { data } = await apollo.query({
      query: TaskDocument,
      variables: { taskId: id },
    });
    setState(data.task);
  }

  useEffect(() => {
    fetchTask();
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateTask({
        variables: { input: { id: _id, title, description, completedAt } },
      });
      if (data.updateTask._id) {
        router.push('/tasks');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();

    try {
      const { data } = await removeTask({
        variables: { id },
      });
      if (data.removeTask) {
        router.push('/tasks');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Edit Task</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="Description"
            value={description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            required
          />
          <Box pb={2.5} />
          <TextField
            label="CompletedAt"
            value={completedAt}
            onChange={(e) => setState({ ...state, completedAt: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Box pb={2.5} />
          <Button onClick={onDelete} variant="contained">
            Delete
          </Button>
        </form>
      </Box>
    </Container>
  );
}

EditStream.getInitialProps = ({ query: { id } }) => {
  return { id }
}
