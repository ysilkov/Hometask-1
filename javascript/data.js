import { ideaLogo, quoteLogo, taskLogo, thoughtLogo } from "./logo.js";

export let categories = {
  Idea: ideaLogo,
  Quote: quoteLogo,
  Task: taskLogo,
  "Random Thought": thoughtLogo,
};

export let notes = [
  {
    id: "1",
    name: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
    archived: false,
  },
  {
    id: "2",
    name: "The theory of evolution",
    created: "April 27, 2021",
    category: "Random Thought",
    content: "The evolution is ..........",
    dates: "",
    archived: false,
  },
  {
    id: "3",
    name: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new applwcation on the 3/5/2021, show it from 5/5/2021",
    dates: "3/5/2021, 5/5/2021",
    archived: false,
  },
  {
    id: "4",
    name: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't have start",
    dates: "",
    archived: true,
  },
  {
    id: "5",
    name: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Statrup",
    dates: "",
    archived: true,
  },
];
