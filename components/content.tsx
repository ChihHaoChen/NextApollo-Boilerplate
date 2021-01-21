import { makeStyles } from '@material-ui/core/styles'

type DateProps = {
  completedAt: string;
}

export default function TimeBlock({ completedAt }: DateProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p>{completedAt}</p>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    // overflow: 'hidden',
    /* 16:9 aspect ratio */
    paddingTop: '56.25%',
    position: 'relative',
  },
  iframe: {
    border: '0',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
  },
}));