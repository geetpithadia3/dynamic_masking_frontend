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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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
        marginTop: theme.spacing(1),
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid",
        width: "100%"
    },
    paperListItem1: {
        // marginTop: theme.spacing(3),
        padding: "15px"
    },
    container: {
        height: "72vh",
        overflow: "auto",
        marginTop: "15px"
    },
    configurationPaper: {
        borderRadius: "25px"
    },
    cardActions: {
        display: "flex !important",
        justifyContent: "space-around !important"
    },
    label: {
        width: "70px"
    },
    typography: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },

}))
    ;

export default function Entity() {
    const classes = useStyles();
    const [dialogState, setDialogState] = React.useState({
        "label": "",
        "open": false
    });
    const [entities, setEntities] = React.useState([])
    const [entity, setEntity] = React.useState({
        "entityName": "",
        "encryptName": ""
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get('http://localhost:5000/entities')
        .then(res => setEntities(res.data))
        // .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    const handleEntityChange = (e) =>
        setEntity({
            ...entity,
            [e.target.name]: e.target.value,
        });
    const handleClickOpen = (label) => {
        setDialogState({
            "label": label,
            "open": true
        });
    };

    const handleClose = () => {
        setDialogState({
            "open": false
        });
        setEntity({
            "entityName": "",
            "encryptName": ""
        });
    };
    const handleSubmit = () => {
        if (dialogState.label == "Update") {
            axios.put('http://localhost:5000/entity', entity)
            .then(res => {
                fetchData()
            })
        }
        else {
            axios.post('http://localhost:5000/entity', entity)
                .then(res => {
                    fetchData()
                })
        }
        handleClose()

    };
    const handleEdit = (entity) => {
        setEntity(entity)
        handleClickOpen("Update")
    }
    const handleDelete = (entity) => {
        axios.delete('http://localhost:5000/entity',{data:{id:entity._id['$oid']}})
                .then(res => {
                    fetchData()
                })
    }
    return (


        <Grid item xs={3} >
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" component="h2" className={classes.typography} >
                    Entities
                    <IconButton aria-label="add" className={classes.margin} size="small" onClick={() => handleClickOpen("Create")}>
                        <AddCircleOutlineIcon fontSize="10" />
                    </IconButton>
                </Typography>
                <Dialog open={dialogState.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{dialogState.label} Entity</DialogTitle>
                    <Divider />
                    <DialogContent>

                        <TextField
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            id="entityName"
                            name="entityName"
                            label="Entity Name"
                            value={entity.entityName}
                            onChange={handleEntityChange}
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            margin="dense"
                            id="encryptName"
                            name="encryptName"
                            label="Default Encypt Name"
                            value={entity.encryptName}
                            onChange={handleEntityChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Create!
                            </Button>
                    </DialogActions>
                </Dialog>
                <Divider />
                <List dense="dense" className={classes.container}>
                    {entities.map((entity) => {
                        return (

                            <ListItem key={entity._id}>
                                <Paper elevation={2} className={classes.paperListItem}  >
                                    {/* <div className={classes.typography}> */}
                                    <span>{entity.entityName}</span>
                                    <div >
                                        <IconButton aria-label="add" size="small" onClick={() => handleEdit(entity)}>
                                            <EditIcon fontSize="10" />
                                        </IconButton>

                                        {/* <IconButton aria-label="add" size="small" onClick={() => handleDelete(entity)}>
                                            <DeleteIcon fontSize="10" />
                                        </IconButton> */}
                                            </div>
                                    {/* </div> */}

                                </Paper></ListItem>

                        )
                    })}</List>

            </Paper>
        </Grid>

    )
}