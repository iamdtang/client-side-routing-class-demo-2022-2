import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Contact from "./routes/Contact";
import Index from "./routes/Index";
import Root from "./routes/Root";
import {
  fetchCommentsForPost,
  fetchPost,
  fetchPosts,
  saveComment,
} from "./api";
import Post from "./routes/Post";
import Comments from "./Comments";
import LeaveComment from "./routes/LeaveComment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetchPosts();
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/posts/:id", // :id is a dynamic segment
        loader({ params }) {
          return fetchPost(params.id);
        },
        element: <Post />,
        children: [
          // the "index" route of the parent post route
          {
            path: "/posts/:id",
            element: <p>Make some new friends 💬</p>,
          },
          {
            path: "/posts/:id/comments",
            loader({ params }) {
              return fetchCommentsForPost(params.id);
            },
            element: <Comments />,
          },
          {
            path: "/posts/:id/comments/new",
            element: <LeaveComment />,
            action({ request, params }) {
              return request.formData().then((formData) => {
                return saveComment(formData.get("comment"), params.id).then(
                  () => {
                    return redirect(`/posts/${params.id}/comments`);
                  }
                );
              });
            },
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
