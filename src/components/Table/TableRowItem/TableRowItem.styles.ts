import { makeStyles, createStyles } from "@mui/styles";

export default makeStyles(() =>
  createStyles({
    root: {
    },
    name: {
        fontWeight: 600,
        fontSize: 16
    },
    descriptionText: {
        width: 250, 
        whiteSpace: "nowrap"  
    },

    '@media (max-width: 400px)': {  
        name: {
            fontWeight: 600,
            fontSize: 14
        },
        descriptionText: {
            width: 120, 
        },
      }

  })
);
