import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function Loading () {
    return (
        <Box sx={{height:'80vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress color='primary' />
        </Box>
    )
}