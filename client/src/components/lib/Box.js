// import React from 'react';
// import styled, { ThemeProvider } from 'styled-components';
// import NoSsr from '@material-ui/core/NoSsr';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { palette, spacing, typography } from '@material-ui/system';

// const Box = styled.div`${palette}${spacing}${typography}`;
// // import Box from '@material-ui/core/Box';

// const theme = createMuiTheme();

// export default function BoxWrapper() {
//   return (
//     <NoSsr>
//       <ThemeProvider theme={theme}>
//         {/* <Box
//           color="primary.main"
//           bgcolor="primary.main"
//           border={1}
//           m={1}
//           borderColor="text.primary"
//           fontFamily="h6.fontFamily"
//           fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
//           p={{ xs: 2, sm: 3, md: 4 }}
//         >
//           @material-ui/system
//         </Box> */}
//         <Box display="flex" justifyContent="center">
//             <Box border={2} {...defaultProps} />
//         </Box>
//         <palette />
//       </ThemeProvider>
//     </NoSsr>
//   );
// }
// const defaultProps = {
//     bgcolor: 'background.paper',
//     m: 1,
//     borderLeft: 1,
//     // style: { width: '5rem', height: '5rem', border: '1px solid' },
//     borderColor: 'text.primary',
//   };