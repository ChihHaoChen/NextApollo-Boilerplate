import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Posts from 'components/posts'
import { useTasksQuery, Task } from 'lib/graphql/tasks.graphql'

export default function Tasks() {
  const { data, loading, refetch } = useTasksQuery({ errorPolicy: 'ignore' })
  useEffect(() => {
    refetch()
	}, [])

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Tasks</Typography>
      </Box>
      {!loading && data && data.tasks && (
        <Posts tasks={data.tasks as Task[]} />
      )}
    </Container>
  );
}