
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CreateUser from "../components/Users/CreateUser";
import ListUsers from "../components/Users/ListUsers";
import EditUser from "../components/Users/EditUser";
import CreatePage from "../components/Pages/CreatePage";
import ListPages from "../components/Pages/ListPage";
import EditPage from "../components/Pages/EditPage";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/user",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "User Management",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/user/create",
        element: <CreateUser />,
        state: "user.create",
        sidebarProps: {
          displayText: "Create User"
        },
      },
      {
        path: "/user/edit/:userId",
        element: <EditUser />,
        state: "user.edit",
      },
      {
        path: "/user/list",
        element: <ListUsers />,
        state: "user.list",
        sidebarProps: {
          displayText: "List Users"
        }
      }
    ]
  },

  {
    path: "/page",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Page Management",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/page/create",
        element: <CreatePage />,
        state: "page.create",
        sidebarProps: {
          displayText: "Create Page"
        },
      },
      {
        path: "/page/edit/:pageId",
        element: <EditPage />,
        state: "page.edit",
      },
      {
        path: "/page/list",
        element: <ListPages />,
        state: "user.list",
        sidebarProps: {
          displayText: "List Users"
        }
      }
    ]
  },
];

export default appRoutes;