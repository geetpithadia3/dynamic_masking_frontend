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
import ProfileItem from "./profileItem"
import TransferList from './transferList'
import axios from 'axios'

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
        height: "84vh"
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
        maxHeight: "72vh",
        overflow: "auto"
    },
    configurationPaper: {
        borderRadius: "25px"
    },
    cardActions: {
        justifyContent: "space-around"
    },
    dialogContent: {
        display: 'flex',
        justifyContent: "space-between",
        padding: "5px"
    }


}))
    ;
function not(a, b) {

    // a.forEach(element => {
    //     b.forEach(ele => {
    //         console.log(element._id)
    //         console.log(ele._id)
    //         if(element._id['$oid']==ele._id['$oid'])
    //             console.log("YES")
    //     }   )
    // });
    console.log(a.filter((value) => !b.some(bVal => bVal._id['$oid'] === value._id['$oid'])))
    return a.filter((value) => !b.some(bVal => bVal._id['$oid'] === value._id['$oid']))
}
export default function Profile() {
    const classes = useStyles();

    const [profiles, setProfiles] = React.useState([]);
    const [entities, setEntities] = React.useState([]);
    const [dialogState, setDialogState] = React.useState({
        "label": "",
        "open": false
    });
    const [profile, setProfile] = React.useState({
        "profileName": "",
        "isActive": false,
        "entities": []
    });
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const handleClickOpen = (label) => {

        setDialogState({
            "label": label,
            "open": true
        });
        console.log(label == "Create")
        if (label === "Create") {
            fetchEntites()
            setLeft(entities)
            setProfile({
                ...profile,
                "profileName": ""
            })
        }

    };

    const handleClose = () => {
        setDialogState({
            "open": false
        });
        setLeft([])
        setRight([])

    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get('http://localhost:5000/profiles')
            .then(res => setProfiles(res.data))
            // .then(res => console.log(res.data))
            .catch(err => console.log(err))

        fetchEntites()
    }
    const fetchEntites = async () => {
        const response = await axios.get('http://localhost:5000/entities')
        setEntities(response.data)

    }
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }
    const handleEdit = (profile) => {
        setProfile(profile)
        // const response = await axios.get('http://localhost:5000/entities')
        // setEntities(response.data)
        // console.log(entities,profile.entities)
        let leftEnt = not(entities, profile.entities)
        setLeft(leftEnt)
        setRight(profile.entities)
        handleClickOpen("Update")
    }

    const handleDelete = (profile) => {
        axios.delete('http://localhost:5000/profile', { data: { id: profile._id['$oid'] } })
            .then(res => {
                fetchData()
            })
    }
    const handleActiveClick = () => {
        setProfile({
            ...profile,
            "isActive": profile.isActive ? false : true
        })

    };

    const handleEntitiesChange = (entities) => {
        console.log(entities)
        var updatedProfile = { ...profile }
        updatedProfile.entities = entities
        console.log(updatedProfile)
        setProfile(updatedProfile)
        console.log(profile)

    }
    const handleSubmit = () => {
        console.log(profile)
        if (dialogState.label == "Create") {
            axios.post('http://localhost:5000/profile', profile)
                .then(res => {
                    fetchData()
                })
        }
        else {
            axios.put('http://localhost:5000/profile', profile)
                .then(res => {
                    fetchData()
                })
        }
        handleClose()
    }
    return (
        <Grid item xs={9} >
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.typography}>
                    Profiles
                    <IconButton aria-label="add" className={classes.margin} size="small" onClick={() => handleClickOpen("Create")}>
                        <AddCircleOutlineIcon fontSize="10" />
                    </IconButton>
                </Typography>
                <Dialog maxWidth="xl" open={dialogState.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{dialogState.label} Profile</DialogTitle>
                    <Divider />
                    <DialogContent >
                        <div className={classes.dialogContent}>
                            <TextField
                                variant="outlined"
                                autoFocus
                                margin="dense"
                                id={profile.profileName}
                                label="Profile Name"
                                name="profileName"
                                value={profile.profileName}
                                onChange={handleChange}
                                style={{ width: '80%' }}
                            />
                            <Button onClick={() => handleActiveClick()} variant={profile.isActive ? "contained" : "outlined"} color={profile.isActive ? "primary" : ""}>{profile.isActive ? "Activated" : "Inactivated"}</Button>
                        </div>
                        <Divider />
                        <TransferList left={left} right={right} selectedEntities={handleEntitiesChange} />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={handleSubmit} color="primary">
                            {dialogState.label}!
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
                    {profiles.map((profile) => {
                        return (
                            <ProfileItem key={profile._id + " " + profile.profileName + " " + profile.entities.length + " " + profile.isActive} profile={profile} selectedProfile={handleEdit} delete={handleDelete} />
                        )
                    })}
                </Grid>

            </Paper>
        </Grid>
    )
}