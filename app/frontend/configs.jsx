import ImageClassifierView from "./classifierView/containers/ImageClassifierView.jsx";
import StatsView from "./statisticsView/containers/StatsView.jsx";
import ConfigView from "./configurationView/containers/ConfigView.jsx";

export const VIEWS_CONFIG = {
  CONFIG: [
    // Insert views and their path mappings
    {component: ImageClassifierView, path: '/'},
    {component: StatsView, path: '/stats'},
    {component: ConfigView, path: '/config'}
  ],
};

export const NAVBAR_CONFIG = {
  // The different tabs and the link to where they are routed to.
  categories: [
    {title: 'Image Classification', link: '/'},
    {title: 'Statistics', link: '/stats'},
    {title: 'Configuration', link: '/config'},
  ],
  titleSrc: {
    path: 'images/brand.svg',
    alt: 'Radanalytics-Image-Recognition-Logo'
  }
};

export const MODALS = {
  FEEDBACK_MODAL : "001",
  CONFIG_HELP_MODAL: "002"
};
