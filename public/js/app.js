const MessageList = {
  messages: [],
  loadMessages: () => {
    return m
      .request({
        method: "GET",
        url: "/api/messages",
      })
      .then((result) => {
        MessageList.messages = result.filter((entry) => {
          return entry.room === ChatApp.roomName;
        });
      });
  },
  addMessages: (message) => {
    return m
      .request({
        method: "POST",
        url: "/api/messages",
        body: message,
      })
      .then(() => {
        MessageList.loadMessages();
      });
  },
};

const ChatApp = {
  oninit: () => {
    MessageList.loadMessages();
  },

  newMessage: "",

  submittedName: "",

  roomName: localStorage.getItem("room")
    ? localStorage.getItem("room")
    : "There's no room",

  submittedRoomName: "",

  name: localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "There's no one here",

  view: () => {
    return [
      m(
        "DIV",
        m("H1", "Kavi"),
        m(
          "DIV",
          MessageList.messages.map((message) => {
            return m("DIV", message.name, ": ", message.text);
          }),
        ),
        m(
          "DIV",
          localStorage.getItem("name")
            ? ChatApp.name
            : m(
                "DIV",
                m("INPUT#user-input", {
                  oninput: (e) => {
                    ChatApp.name = e.target.value;
                  },
                  placeholder: "Enter your name here...",
                }),
                m(
                  "BUTTON",
                  {
                    onclick: () => {
                      ChatApp.submittedName = ChatApp.name;
                      localStorage.setItem("name", ChatApp.submittedName);
                    },
                  },
                  "Submit name",
                ),
              ),
        ),
        m(
          "DIV",
          localStorage.getItem("room")
            ? ChatApp.roomName
            : m(
                "DIV",
                m("INPUT#user-input", {
                  oninput: (e) => {
                    ChatApp.roomName = e.target.value;
                  },
                  placeholder: "Enter your room here...",
                }),
                m(
                  "BUTTON",
                  {
                    onclick: () => {
                      ChatApp.submittedRoomName = ChatApp.roomName;
                      localStorage.setItem("room", ChatApp.submittedRoomName);
                      MessageList.loadMessages();
                    },
                  },
                  "Submit name",
                ),
              ),
        ),
        m("INPUT", {
          type: "text",
          oninput: (e) => {
            ChatApp.newMessage = e.target.value;
          },
          placeholder: "Enter a new stanza...",
        }),
        m(
          "BUTTON",
          {
            onclick: () => {
              MessageList.addMessages({
                text: ChatApp.newMessage,
                name: ChatApp.name,
                room: ChatApp.roomName,
              });
              ChatApp.newMessage = "";
            },
          },
          "Send",
        ),
        m("DIV", ChatApp.newMessage),
      ),
    ];
  },
};

m.mount(document.getElementById("app"), ChatApp);
