import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    bigAvatar: {
        margin: 10,
        width: 50,
        height: 50,
    },
});

export default function ImageAvatars() {
    const classes = useStyles();
    let avatar = (!localStorage.getItem('avatar')) ?
        <Avatar src="https://giantbomb1.cbsistatic.com/uploads/square_medium/22/220001/2573994-4705128555-Faceb.jpg"
                className={classes.bigAvatar}
        />
        : <Avatar  src={localStorage.getItem('avatar')} className={classes.bigAvatar} />;

    return (
        <Grid container justify="center" alignItems="center">
            {avatar}
        </Grid>
    );
}