import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar = () => {
    return(
        <>
            <AppBar position="static" style={{ backgroundColor: "gray", width: "100%" }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Astronomic Photo Of the Day
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;