import React from "react";
import Logout from "./components/LogoutComponent";
import Dashboard_Admin from "./components/views/dashboard/Dashboard_Admin";
import TimeSlotComponent from "./components/views/timeSlot/TimeSlotComponent";
import LocationsComponent from "./components/views/locations/LocationsComponent";
import ServicesComponent from "./components/views/services/ServicesComponent";
const Dashboard = React.lazy(() =>
  import("./components/views/dashboard/Dashboard")
);
const Calendar = React.lazy(() =>
  import("./components/views/calendar/BookAppointment")
);
const Messages = React.lazy(() =>
  import("./components/views/messages/Messages")
);
const Appointments = React.lazy(() =>
  import("../src/components/views/appointments/Appointments")
);
const ViewSchedules = React.lazy(() =>
  import("../src/components/views/appointments/ViewSchedules")
);
const Profile = React.lazy(() => import("./components/views/profile/Profile"));
const Cards = React.lazy(() => import("./components/views/base/cards/Cards"));
const Carousels = React.lazy(() =>
  import("./components/views/base/carousels/Carousels")
);
const Collapses = React.lazy(() =>
  import("./components/views/base/collapses/Collapses")
);
const ListGroups = React.lazy(() =>
  import("./components/views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./components/views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./components/views/base/paginations/Paginations")
);
const Placeholders = React.lazy(() =>
  import("./components/views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() =>
  import("./components/views/base/popovers/Popovers")
);
const Progress = React.lazy(() =>
  import("./components/views/base/progress/Progress")
);
const Spinners = React.lazy(() =>
  import("./components/views/base/spinners/Spinners")
);
const Tables = React.lazy(() =>
  import("./components/views/base/tables/Tables")
);
const Tooltips = React.lazy(() =>
  import("./components/views/base/tooltips/Tooltips")
);

// Buttons
const Buttons = React.lazy(() =>
  import("./components/views/buttons/buttons/Buttons")
);
const ButtonGroups = React.lazy(() =>
  import("./components/views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./components/views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(() =>
  import("./components/views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./components/views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./components/views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./components/views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() =>
  import("./components/views/forms/layout/Layout")
);
const Range = React.lazy(() => import("./components/views/forms/range/Range"));
const Select = React.lazy(() =>
  import("./components/views/forms/select/Select")
);
const Validation = React.lazy(() =>
  import("./components/views/forms/validation/Validation")
);

const Charts = React.lazy(() => import("./components/views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./components/views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./components/views/icons/flags/Flags"));
const Brands = React.lazy(() =>
  import("./components/views/icons/brands/Brands")
);

// Notifications
const Alerts = React.lazy(() =>
  import("./components/views/notifications/alerts/Alerts")
);
const Badges = React.lazy(() =>
  import("./components/views/notifications/badges/Badges")
);
const Modals = React.lazy(() =>
  import("./components/views/notifications/modals/Modals")
);
const Toasts = React.lazy(() =>
  import("./components/views/notifications/toasts/Toasts")
);

const Widgets = React.lazy(() => import("./components/views/widgets/Widgets"));

const routes = [
  //{ path: "/layout", exact: true, name: "DefaultLayout", exact: true },
  {
    path: "/landing/dashboard",
    name: "Dashboard",
    exact: true,
    element: Dashboard,
  },
  {
    path: "/landing/locations",
    name: "Locations",
    exact: true,
    element: LocationsComponent,
  },
  {
    path: "/landing/services",
    name: "Services",
    exact: true,
    element: ServicesComponent,
  },
  {
    path: "/landing/dashboardA",
    name: "Dashboard_Admin",
    exact: true,
    element: Dashboard_Admin,
  },
  {
    path: "/landing/timeslots",
    name: "TimeSlot",
    exact: true,
    element: TimeSlotComponent,
  },
  {
    path: "/landing/bookingAppointment",
    name: "Schedule Appointment",
    element: Calendar,
    exact: true,
  },
  { path: "/landing/messages", name: "Messages", element: Messages },
  { path: "/profile", name: "Profile", element: Profile },
  {
    path: "/landing/appointments",
    name: "Appointments",
    exact: true,
    element: Appointments,
  },
  {
    path: "/landing/viewschedules",
    name: "ViewSchedules",
    exact: true,
    element: ViewSchedules,
  },
  { path: "/landing/profile", name: "Profile", exact: true, element: Profile },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    element: ButtonGroups,
  },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    element: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    element: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  {
    path: "/header-navs",
    name: "Notifications",
    element: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;
