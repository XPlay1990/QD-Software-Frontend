import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import {Send} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {Trans, useTranslation} from "react-i18next";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {notification} from "antd";
import {sendContactMessage} from "../util/APIUtils";
import {EMAIL_MAX_LENGTH} from "../config/constants";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: 'auto',
        width: '100%'
    },
}));

export default function ContactMe() {
    const {t} = useTranslation();
    const classes = useStyles();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function clearInputs() {
        setFullName("");
        setEmail("");
        setMessage("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        let promise = sendContactMessage(fullName, email, message);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
                clearInputs()
            })
            .catch(error => {
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: error.message,
                });
            });
    }

    function isFormInvalid() {
        return (fullName.isEmpty || message.isEmpty || isEmailInvalid(email))
    }

    function isEmailInvalid(email) {
        if (!email) {
            return true
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return true
        }

        return email.length > EMAIL_MAX_LENGTH;
    }

    return (
        <Box className={classes.container}>
            <Typography variant="h6"
                        style={{overflowWrap: "break-word", textOverflow: "ellipsis", marginBottom: "20px"}}>
                {<Trans i18nKey={"ContactMe.intro"}/>}
            </Typography>
            <Divider variant={"middle"}/>
            <Typography variant="body2"
                        style={{overflowWrap: "break-word", textOverflow: "ellipsis", marginTop: "20px"}}>
                Jan Adamczyk
            </Typography>
            <Typography variant="body2" style={{overflowWrap: "break-word", textOverflow: "ellipsis"}}>
                Email: <Link href="mailto:j_adamczyk@hotmail.com" variant="body2">j_adamczyk@hotmail.com</Link>
            </Typography>
            <Typography variant="body2"
                        style={{overflowWrap: "break-word", textOverflow: "ellipsis", marginBottom: "20px"}}>
                Tel: <Link href="tel:+4915751763598" variant="body2">+49 1575 / 1763598</Link>
            </Typography>

            <form className={classes.container} autoComplete="on" onSubmit={handleSubmit}>
                <Paper style={{padding: "20px"}}>
                    <Typography variant="h6"
                                style={{overflowWrap: "break-word", textOverflow: "ellipsis", marginBottom: "20px"}}>
                        {t('ContactMe.formTitle')}
                    </Typography>
                    <TextField
                        id="standard-full-width"
                        label={t('ContactMe.label.name')}
                        style={{margin: 8}}
                        placeholder={t('ContactMe.placeholder.name')}
                        fullWidth
                        margin="normal"
                        name="fullname"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required={true}
                        value={fullName}
                        onChange={event => setFullName(event.target.value)}
                    />
                    <TextField
                        id="standard-full-width"
                        label={t('ContactMe.label.email')}
                        style={{margin: 8}}
                        placeholder={t('ContactMe.placeholder.email')}
                        fullWidth
                        margin="normal"
                        name="email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required={true}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        id="standard-full-width"
                        label={t('ContactMe.label.message')}
                        style={{margin: 8}}
                        placeholder={t('ContactMe.placeholder.message')}
                        fullWidth
                        multiline={true}
                        rows={7}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required={true}
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />
                    <Tooltip title={<Trans i18nKey={"common.send"}>Send</Trans>}>
                        <IconButton type="submit" disabled={isFormInvalid()}>
                            <Send/>
                        </IconButton>
                    </Tooltip>
                </Paper>
            </form>
        </Box>
    );
}
