import Container from '@material-ui/core/Container'

import Hero from 'components/hero'
import Content from 'components/content'
import { useTaskQuery, Task } from 'lib/graphql/task.graphql'

export default function TaskDetail({ id }) {
  const { data, loading } = useTaskQuery({
    variables: { taskId: id },
  })

  if (!loading && data && data.task) {
    return (
      <Container maxWidth="lg">
        <Hero task={data.task as Task} />
        <Content completedAt={data.task.completedAt} />
      </Container>
    );
  }

  return null
}

TaskDetail.getInitialProps = ({ query: { id } }) => {
	return { id }
}