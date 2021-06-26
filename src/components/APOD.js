import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Grid, Typography, IconButton } from '@material-ui/core'
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import { GetApod } from '../services/apod.service';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Next from '@material-ui/icons/ArrowForward';
import Back from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
        textAlign: 'center',
        color: '#ffffff'
    },
    datePicker: {
        textAlign: "center",
        marginBottom: "15px"
    },
    dateRoot: {
        color: '#ffffff',
        fontWeight: "bold"
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    input: {
        color: 'white',
    },
    calendarButton: {
        color: '#ffffff'
    },
    video: {
        textAlign: "center"
    },
    explanation: {
        marginTop: "15px",
        fontSize: "20px",
        marginLeft: "40px",
        marginRight: "40px",
        color: '#ffffff'
    }
}));

const APOD = () => {
    const classes = useStyles();

    //APOD Limit End Date
    const [disableNext, setDisableNext] = useState(false);
    //APOD Youtube Video Id
    const [videoId, setVideoId] = useState("");
    //APOD Media Type
    const [mediaType, setMediaType] = useState("");
    //APOD URL
    const [todayURL, setTodayURL] = useState("");
    //APOD Title
    const [title, setTitle] = useState("");
    //APOD Explanation
    const [explanation, setExplanation] = useState("");
    //APOD Date
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

    const handleDateChange = (date) => {
        var d = moment(date).format('YYYY-MM-DD');
        setSelectedDate(moment(date).format('YYYY-MM-DD'));
        fetchApodData(d);
    }

    const matchYoutubeUrl = (url) => {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

        return (url.match(p)) ? RegExp.$1 : false ;
    }

    const fetchApodData = async (date) => {
        var response = await GetApod(date);

        if(response.data.media_type !== "image"){
            var youtubeId = matchYoutubeUrl(response.data.url);
            setVideoId(youtubeId);
        }

        setMediaType(response.data.media_type);
        setTitle(response.data.title);
        setExplanation(response.data.explanation);
        setTodayURL(response.data.url);
    }

    const backApod = async () => {
        var date = moment(selectedDate).subtract(1, 'days').format('YYYY-MM-DD');

        fetchApodData(date);
        setSelectedDate(date);
    }

    const nextApod = async () => {
        var date = moment(selectedDate).add(1, 'days').format('YYYY-MM-DD');

        fetchApodData(date);
        setSelectedDate(date);
    }

    useEffect(() => {
        var date = moment().format('YYYY-MM-DD');
        
        fetchApodData(date);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        var date = moment().format('YYYY-MM-DD');

        if(selectedDate === date){
            setDisableNext(true);
        }
        else{
            setDisableNext(false);
        }

    }, [selectedDate]);

    return (
        <>
        <div className={classes.root}>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.datePicker}>
                <KeyboardDatePicker
                    disableFuture
                    openTo="year"
                    format="YYYY-MM-DD"
                    label="Photo of the Day"
                    views={["date"]}
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{ className: classes.dateRoot }}
                    InputProps= {{
                        readOnly: true,
                        classes: {
                            root: classes.input,
                            notchedOutline: classes.notchedOutline,
                        }
                    }}
                    KeyboardButtonProps={{ className: classes.calendarButton }}
                />
            </div>
            <Grid container spacing={3} style={{ justifyContent: "center", alignItems: "center" }}>
                <Grid item xs style={{ textAlign: "center" }}>
                    <IconButton color="primary" aria-label="back" onClick={backApod} >
                        <Back fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={8}>
                    {
                        mediaType === "image" ? (
                                                    <img 
                                                        src={todayURL}
                                                        width="100%"
                                                        height="auto"
                                                        alt="apod"
                                                    />
                                                )
                                            :
                                                (
                                                    <div className={classes.video}>
                                                        <YouTube
                                                            videoId={videoId}
                                                            width="100%"
                                                            height="auto"
                                                        />
                                                    </div>
                                                )
                    }
                </Grid>
                <Grid item xs style={{ textAlign: "center" }}>
                    <IconButton color="primary" aria-label="next" disabled={disableNext} onClick={nextApod} >
                        <Next fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>

            <Typography variant="caption" display="block" className={classes.explanation}>
                {explanation}
            </Typography>
        </div>
        </>
    )
}

export default APOD;