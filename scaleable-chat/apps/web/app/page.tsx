// "use client";
// import { useState } from "react";
// import { useSocket } from "../context/SocketProvider";
// import classes from "./page.module.css";

// export default function Page() {
//   const { sendMessage, messages } = useSocket();
//   const [message, setMessage] = useState("");
//   return (
//     <div>
//       <div>
//         <input
//           onChange={(e) => setMessage(e.target.value)}
//           className={classes["chat-input"]}
//           placeholder="Message..."
//         />
//         <button
//           onClick={(e) => sendMessage(message)}
//           className={classes["button"]}
//         >
//           Send
//         </button>
//       </div>
//       <div>
//         {messages.map((e) => (
//           <li>{e}</li>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={classes["chat-input"]}
          placeholder="Message..."
        />
        <button onClick={handleSend} className={classes["button"]}>
          Send
        </button>
      </div>
      <ul>
        {messages.map((msg: string, index: number) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}