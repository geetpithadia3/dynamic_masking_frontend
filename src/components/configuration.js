import React from 'react';
import Entity from './entity';
import Profile from './profile'
import Grid from '@material-ui/core/Grid'
export default function Base() {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="strech"
            spacing={3}
        >
            <Entity />
            <Profile />
        </Grid>
    );
}
