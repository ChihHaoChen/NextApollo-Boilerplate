import React from "react";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Link from "next/link";

const About = () => (
	<Container maxWidth="sm">
		<Box my={4}>
			<Typography variant="h4" component="h1" gutterBottom>
				Next.js example
			</Typography>
			<Link href="/">
				<Button variant="contained" color="primary">
					Go to the index page
				</Button>
			</Link>
		</Box>
	</Container>
)


export { About as default }