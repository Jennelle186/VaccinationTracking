import { DialogActions, Button } from "@material-ui/core";

export const DialogBtn = ({ handleClose, children }) => {
  return (
    <DialogActions>
      <Button color="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button color="primary" autoFocus>
        {children}
      </Button>
    </DialogActions>
  );
};
