import { Fab, Grid, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@material-ui/icons/Send";

const ChatWindow = ({
  classes,
  getGroups,
  selectedGroupIndex,
  getUsers,
  sendMessage,
  subscribeToNewMessages,
  currentUser,
}) => {
  const [draftMessage, setDraftMessage] = useState("");
  useEffect(() => {
    subscribeToNewMessages();
  });
  const pushDraftMessage = () => {
    sendMessage(draftMessage);
    setDraftMessage("");
  };
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {getGroups.data &&
          getGroups.data.groupMany[selectedGroupIndex].chat.map(
            (messageBlock, index) => {
              const fromUser = getUsers.data
                ? getUsers.data.userMany.find(
                    (user) => user._id === messageBlock.user
                  )
                : null;
              return (
                <Message
                  fromUser={fromUser}
                  messageBlock={messageBlock}
                  key={index}
                  classes={classes}
                  currentUser={currentUser}
                ></Message>
              );
            }
          )}
      </div>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && pushDraftMessage()}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon onClick={() => pushDraftMessage()} />
          </Fab>
        </Grid>
      </Grid>
    </main>
  );
};
export default ChatWindow;
