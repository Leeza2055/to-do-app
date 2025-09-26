import AppLayout from "@/layouts/app-layout";
import tasks from "@/routes/tasks";
import { BreadcrumbItem } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Show({task}) {
    const {t} = useLaravelReactI18n();
    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: tasks.show({task}).url,
    },
];
    return (
        <AppLayout breadcrumbs={
            breadcrumbs
        }>
            <div className="px-4 py-6">
            <h1 className="font-bold mr-2">Title: <span className="font-normal">{task.title}</span></h1>
            <p className="font-bold mr-2">Description: <span className="font-normal">{task.description}</span></p>
            <p className="font-bold mr-2">Status: <span className="font-normal">{t(`common.status.${task.status}`)}</span></p>
            <p className="font-bold mr-2">Due Date: <span className="font-normal">{new Date(
                task.due_date,
            ).toLocaleDateString()}</span></p>
            <p className="font-bold mr-2">User: <span className="font-normal">{task.user.name}</span></p>
            </div>
        </AppLayout>
    )
}
