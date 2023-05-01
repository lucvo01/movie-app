import React, {useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Pagination  from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Page({movies}) {
    // const [page, setPage] = useState(0);
    // // const [totalPages, setTotalPages] = useState(1);

    // const totalPages = Math.ceil(movies.length/15);
    // const startIndex = (page + 1) * 15;
    // const endIndex = startIndex * 15;

    // const handleChange = (value) => {
    //     setPage(value)
    // }

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      {/* <Pagination count={totalPages} page={page} onChange={handleChange} /> */}
    </Stack>
  )
}

export default Page