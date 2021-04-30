import Index from "../pages/Index";
import Hits from "../pages/Hits";
import Logs from "../pages/Logs";
import QAUrls from "../pages/QAUrls";
import Developers from "../pages/Developers";

const routes = [
  { path: "/", component: Index, label: "Home" },
  { path: "/hits", component: Hits, label: "Hits" },
  { path: "/logs", component: Logs, label: "Logs" },
  { path: "/qa-urls", component: QAUrls, label: "QA Urls" },
  { path: "/developers", component: Developers, label: "Developers" },
];

export default routes;
