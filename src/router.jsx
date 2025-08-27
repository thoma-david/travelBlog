import { createBrowserRouter } from 'react-router-dom';
import RealEstateBlog from './App';
import Home from './components/Home';
import Single from './components/Single';
import Articles from './components/Articles';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RealEstateBlog />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "artikel/:id",
        element: <Single />
      },
      {
        path: "articles",
        element: <Articles />
      },
      {
        path: "create",
        element: <CreatePost />
      },
      {
        path: "edit/:id",
        element: <EditPost />
      }
    ]
  }
]);

export default router;