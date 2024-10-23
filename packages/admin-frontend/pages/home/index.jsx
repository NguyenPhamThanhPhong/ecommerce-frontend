import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // For more customizable messages

// Example with success message
const HomePage = () => {
    return (
        <>
            {/* <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="success">This is a success message</Alert>
            </Snackbar> */}

            {/* <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">This is an error message</Alert>
            </Snackbar> */}

            <Snackbar open={true} autoHideDuration={1000}>
                <Alert severity="success">This is a success message</Alert>
            </Snackbar>
        </>
    )
}

export default HomePage;