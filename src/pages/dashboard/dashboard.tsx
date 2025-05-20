import React from 'react';

// import Grid from '@mui/material/Grid';
// import Skeleton from '@mui/material/Skeleton';

import { Products } from '@features/product';

export const Dashboard: React.FC = () => {
    return <Products />;
};

//     const {taskList, onAdd, onDelete} = useTaskList();

//     const {onChangePage, page, data} = usePagination({data: taskList});

//     const {inputRef, onBlur, onKeyUp} = useInput({onAdd});

//     const count = Math.ceil(taskList.length / 10);

//     return (
//         <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
//             <TextField
//                 inputRef={inputRef}
//                 fullWidth={true}
//                 onBlur={onBlur}
//                 onKeyUp={onKeyUp}
//             />

//             <Box sx={{ mt: 2 }}>
//                 <TaskList data={data} onDelete={onDelete} />
//             </Box>

//             {count > 1 && (
//                 <Box sx={{ mt: 2 }}>
//                     <Pagination
//                         count={count}
//                         page={page}
//                         onChange={onChangePage}
//                         variant="outlined"
//                         shape="rounded"
//                     />
//                 </Box>
//             )}
//         </Container>
//     );
// }