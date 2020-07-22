import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProfileItem from "./profileItem"
import TransferList from './transferList'

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        flexGrow: 1
    },
    media: {
        // height: 140,
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardwrapper: {
        padding: 10
    },
    paper: {
        padding: "15px",
        height:"84vh"
    },
    paperListItem: {
        marginTop: theme.spacing(3),
        padding: "15px"
    },
    paperListItem1: {
        marginTop: theme.spacing(3),
        padding: "15px"
    },
    typography: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    container: {
        marginTop: "15px",
        height:"72vh",
        overflow:"auto"
    },
    configurationPaper: {
        borderRadius: "25px"
    },
    cardActions: {
        justifyContent: "space-around"
    },
    

}))
    ;

export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (


        <Grid item xs={9} >
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.typography}>
                    Profiles
                    <IconButton aria-label="add" className={classes.margin} size="small" onClick={handleClickOpen}>
                        <AddCircleOutlineIcon fontSize="10" />
                    </IconButton>
                </Typography>
                <Dialog maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Profile</DialogTitle>
                    <Divider />
                    <DialogContent>

                        <TextField
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            id="profileName"
                            label="Profile Name"
                            fullWidth
                        />
                        <Divider />
                        <TransferList />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={handleClose} color="primary">
                            Create!
                            </Button>
                    </DialogActions>
                </Dialog>
                <Divider />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.container}
                >
                    {["First Name", "Last Name", "SSN", "SIN", "BirthDate", "A","A","A","D","Credit Card", "PIN", "Aadhar Number"].map((entity) => {
                        return (

                            <ProfileItem entity={entity}/>
                        )
                    })}
                </Grid>

            </Paper>
        </Grid>
    )
}