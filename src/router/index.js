import { createWebHistory, createRouter } from "vue-router";
import Start from "../pages/Start";
import ProfessionTest from "../pages/ProfessionTest";
import ResultProfession from "../pages/ResultProfession";
import Loading from "../pages/Loading";
import PersonTypeTest from "../pages/PersonTypeTest";
import ResultPerson from "../pages/ResultPerson";
import PageNotFound from "@/pages/PageNotFound";
import Registration from "@/pages/Registration";

const routes = [
    {
        path: "/",
        name: "Start",
        component: Start,
    },
    {
        path: "/test",
        name: "Registration",
        component: Registration,
    },
    {
        path: "/profession/test",
        name: "ProfessionTest",
        component: ProfessionTest,
    },
    {
        path: "/profession/result",
        name: "ResultProfession",
        component: ResultProfession,
    },
    {
        path: "/loading",
        name: "Loading",
        component: Loading,
    },
    {
        path: "/type/test",
        name: "PersonType",
        component: PersonTypeTest
    },
    {
        path: "/type/result",
        name: "ResultPerson",
        component: ResultPerson
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;