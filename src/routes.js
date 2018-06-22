import Home from "./Home";
import GamesPage from "./GamesPage";
import VideosPage from "./VideosPage";
import ProjectsPage from "./ProjectsPage";

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/games",
        component: GamesPage,
        exact: true,
    },
    {
        path: "/videos",
        component: VideosPage,
        exact: true,
    },
    {
        path: "/projects",
        component: ProjectsPage,
        exact: true,
    },
];
