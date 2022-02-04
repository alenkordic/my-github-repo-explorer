import { makeStyles, createStyles } from "@mui/styles";

export default makeStyles(() =>
  createStyles({
    root: {},
    nameText: {
      fontWeight: "700 !important",
      fontSize: 16
    },
    descriptionText: {
      width: 250,
      whiteSpace: "nowrap"
    },

    "@media (max-width: 450px)": {
      nameText: {
        fontSize: 12
      },
      descriptionText: {
        width: 120
      }
    }
  })
);
