import { makeStyles, createStyles } from "@mui/styles";

export default makeStyles(() =>
  createStyles({
    root: {
    },
    descriptionText: {
        width: 250, 
        whiteSpace: "nowrap"  
    },

    '@media (max-width: 400px)': {  
        descriptionText: {
            width: 120, 
        },
      }

  })
);
