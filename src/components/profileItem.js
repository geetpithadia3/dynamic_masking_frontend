import React, { useEffect } from 'react'
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
        padding: "15px"
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
        marginTop: "15px"
    },
    configurationPaper: {
        border: "1px solid",
        borderRadius: "25px"
    },
    cardActions: {
        justifyContent: "space-around"
    },
    activeClass:{
        backgroundColor:"green",
        color:"white !important"
    }

}))
    ;

export default function ProfileItem(props) {
    const classes = useStyles();
    const [profile, setProfile] = React.useState({
        "profileName": "",
        "entities": [],
        "isActive": false
    });

    const handleClick = () => {
        props.selectedProfile(profile)
    }

    const handleDelete = () => {
        console.log("D")
        props.delete(profile)
    }
    useEffect(() => {
        setProfile(props.profile)
    }, [])

    return (
        <Grid item xs={4}>
            <Paper elevation={3} className={classes.configurationPaper}>
                <CardContent>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={9}>
                            <Typography variant="h5" component="h2" noWrap="true">
                                {profile.profileName}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ "text-align": "center" }}>
                            <Typography variant="h4" component="h4">
                                {profile.entities?.length ? profile.entities.length : 0}
                            </Typography>
                            <Typography variant="h7" component="h7">
                                entities
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconButton aria-label="add" size="small" onClick={() => handleClick("Edit")}>
                        <EditIcon fontSize="10" />
                    </IconButton>
                    {/* <svg height="50" width="50" class="blinking">
                        <circle cx="25" cy="25" r="10" fill="green" />

                    </svg> */}
                    <Button disabled variant= "outlined" className={profile.isActive?classes.activeClass:""}>{profile.isActive ? "Activated" : "Inactivated"}</Button>
                    <IconButton aria-label="add" size="small" onClick={() => handleDelete()}>
                        <DeleteIcon fontSize="10" />
                    </IconButton>
                </CardActions>

            </Paper>
        </Grid>
    )
}