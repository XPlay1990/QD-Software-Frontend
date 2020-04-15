import React from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import {lighten, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}))

const TableToolbar = (setFilter) => {
    const classes = useToolbarStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilter = () => {
        const filter = [];
        for(const input of document.getElementById('FilterDialog').getElementsByTagName('input')){
            if(input.value) {
                filter.push(`${input.id}:${input.value}`)
            }
        }
        let joinedFilter = filter.join(",");
        setFilter.setFilter(joinedFilter)
        console.log(joinedFilter)
        handleClose()
    };

    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Edi Connections
            </Typography>

            <Tooltip title="Filter list">
                <IconButton aria-label="filter list" onClick={handleClickOpen}>
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" id={"FilterDialog"}>
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="customer.name"
                        label="Kunde"
                        type="search"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="supplier.name"
                        label="Lieferant"
                        type="search"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="status"
                        label="Status"
                        type="search"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Entwickler"
                        type="search"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Geändert"
                        type="search"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilter}>
                        Suchen
                    </Button>
                    <Button onClick={handleClose}>
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    )
};
//
// TableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     addUserHandler: PropTypes.func.isRequired,
//     deleteUserHandler: PropTypes.func.isRequired,
//     setGlobalFilter: PropTypes.func.isRequired,
//     preGlobalFilteredRows: PropTypes.array.isRequired,
//     globalFilter: PropTypes.string.isRequired,
// };

export default TableToolbar
