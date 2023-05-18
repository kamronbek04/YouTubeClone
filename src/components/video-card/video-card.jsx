// import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
// import { colors } from '../../constants/colors'
// import moment from 'moment'
// import { CheckCircle } from '@mui/icons-material'
// import { Link } from 'react-router-dom'
// import { useEffect,useState } from 'react'
// import { ApiService } from '../../service/api.service'

// const VideoCard = ({video}) => {
	
// 	const [videoDuration,setVideoDuration]=useState([])
// 	useEffect(() => {
// 		const getData = async () => {
// 			try {
// 				const data = await ApiService.fetching(`videos?part=contentDetails&id=${video?.id?.videoId}`);
// 				const duration = data?.items[0]?.contentDetails?.duration || 'PT0S';
// 				const formattedDuration = moment.duration(duration).asMinutes().toFixed(0) + ':' + moment.duration(duration).seconds().toString().padStart(2, '0');
// 				setVideoDuration(formattedDuration);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		getData();
// 	}, [video]);
	
// 	console.log(videoDuration)

// 	return (
// 		<Card
// 			sx={{ width: { xs: '100%', sm: '360px', md: '320px' }, boxShadow: 'none', borderRadius: 0 }}
// 		>
// 			<Link to={`/video/${video.id.videoId}`}>
// 				<CardMedia
// 					image={video?.snippet?.thumbnails?.high?.url}
// 					alt={video?.snippet?.title}
// 					sx={{ width: { xs: '100%', sm: '360px' }, height: '180px',position:"relative" }}
// 				/>
// 				<Typography sx={{position:"absolute",buttom:"10px",right:"10px"}}>{videoDuration}</Typography>
// 			</Link>
// 			<CardContent sx={{ background: colors.primary, height: '200px', position: 'relative' }}>
// 				<Link to={`/video/${video.id.videoId}`}>
// 					<Typography my={'5px'} sx={{ opacity: '.4' }}>
// 						{moment(video?.snippet?.publishedAt).fromNow()}
// 					</Typography>
// 					<Typography variant='subtitle1' fontWeight={'bold'}>
// 						{video?.snippet?.title.slice(0, 50)}
// 					</Typography>
// 					<Typography variant='subtitle2' sx={{ opacity: '.6' }}>
// 						{video?.snippet?.description.slice(0, 70)}
// 					</Typography>
// 				</Link>
// 				<Link to={`/channel/${video?.snippet?.channelId}`}>
// 					<Stack
// 						direction={'row'}
// 						position={'absolute'}
// 						bottom={'10px'}
// 						alignItems={'center'}
// 						gap={'5px'}
// 					>
// 						<Avatar src={video?.snippet?.thumbnails?.high?.url} />
// 						<Typography variant={'subtitle2'} color={'gray'}>
// 							{video?.snippet?.channelTitle}
// 							<CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
// 						</Typography>
// 					</Stack>
// 				</Link>
// 			</CardContent>
// 		</Card>
// 	)
// }

// export default VideoCard


import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { colors } from '../../constants/colors';
import moment from 'moment';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiService } from '../../service/api.service';

const VideoCard = ({video}) => {
  const [videoDuration, setVideoDuration] = useState('');

  useEffect(() => {
    const fetchVideoDuration = async () => {
      try {
        const response = await ApiService.fetching(`videos?part=contentDetails&id=${video?.id?.videoId}`);
        const duration = response?.items[0]?.contentDetails?.duration;
        const minutes = moment.duration(duration).minutes().toString().padStart(2, '0');
        const seconds = moment.duration(duration).seconds().toString().padStart(2, '0');
        const formattedDuration = `${minutes}:${seconds}`;
        setVideoDuration(formattedDuration);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideoDuration();
  }, []);
	// function generateRandomDuration() {
	// 	const minutes = Math.floor(Math.random() * 21); 
	// 	const seconds = Math.floor(Math.random() * 60); 
	// 	const minutesStr = minutes.toString().padStart(2, '0'); 
	// 	const secondsStr = seconds.toString().padStart(2, '0'); 
	// 	return `${minutesStr}:${secondsStr}`;
	// }
	

  return (
    <Card
      sx={{ width: { xs: '100%', sm: '360px', md: '320px' }, boxShadow: 'none', borderRadius: 0 }}
    >
      <Link to={`/video/${video.id.videoId}`}>
        <CardMedia
				component="img"
          image={video?.snippet?.thumbnails?.high?.url}
          alt={video?.snippet?.title}
          sx={{ width: { xs: '100%', sm: '360px' }, height: '180px' }} className='video-image'
        />
        {videoDuration ? (<Typography className='duration'>{videoDuration}</Typography>) : (
          <Typography className='duration'>10:00</Typography>)}
      </Link>
      <CardContent sx={{ background: colors.primary, height: '200px', position: 'relative' }}>
        <Link to={`/video/${video.id.videoId}`}>
          <Typography my={'5px'} sx={{ opacity: '.4' }}>
            {moment(video?.snippet?.publishedAt).fromNow()}
          </Typography>
          <Typography variant='subtitle1' fontWeight={'bold'}>
            {video?.snippet?.title.slice(0, 50)}
          </Typography>
          <Typography variant='subtitle2' sx={{ opacity: '.6' }}>
            {video?.snippet?.description.slice(0, 70)}
          </Typography>
        </Link>
        <Link to={`/channel/${video?.snippet?.channelId}`}>
          <Stack
            direction={'row'}
            position={'absolute'}
            bottom={'10px'}
            alignItems={'center'}
            gap={'5px'}
          >
            <Avatar src={video?.snippet?.thumbnails?.high?.url} />
            <Typography variant={'subtitle2'} color={'gray'}>
              {video?.snippet?.channelTitle}
              <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
            </Typography>
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
